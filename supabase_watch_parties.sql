-- ============================================================
--  FanVolt — Supabase Schema
--  Run in: https://app.supabase.com → SQL Editor → New Query
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 0. ENUMS
-- ────────────────────────────────────────────────────────────

CREATE TYPE sport_type AS ENUM ('football', 'formula1', 'wwe');


-- ────────────────────────────────────────────────────────────
-- 1. WATCH_PARTIES TABLE
-- Every watch party event that can be browsed/joined.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS watch_parties (
  id             TEXT        PRIMARY KEY DEFAULT 'wp-' || substr(gen_random_uuid()::TEXT, 1, 8),
  venue_name     TEXT        NOT NULL,                    -- "The Sports Den"
  venue_address  TEXT        NOT NULL,                    -- "42 Galle Rd, Colombo 03"
  event_title    TEXT        NOT NULL,                    -- "Australian Grand Prix 2026"
  sport          sport_type  NOT NULL,                    -- football | formula1 | wwe
  day_number     INT         NOT NULL,                    -- 16
  month_short    TEXT        NOT NULL CHECK (length(month_short) = 3),  -- "MAR"
  time           TEXT        NOT NULL,                    -- "6:00 AM"
  distance_km    TEXT,                                    -- "0.8 km"  (optional)
  attendee_count INT         NOT NULL DEFAULT 0 CHECK (attendee_count >= 0),
  max_capacity   INT         CHECK (max_capacity > 0),   -- NULL means unlimited
  is_featured    BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update updated_at on every row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER watch_parties_updated_at
  BEFORE UPDATE ON watch_parties
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ────────────────────────────────────────────────────────────
-- 2. RSVPS TABLE
-- One row per user per party. Enforces no double-RSVP.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rsvps (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  party_id    TEXT        NOT NULL REFERENCES watch_parties(id) ON DELETE CASCADE,
  user_id     UUID        NOT NULL REFERENCES auth.users(id)    ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (party_id, user_id)                             -- one RSVP per user per party
);

-- Auto-increment attendee_count when someone RSVPs
CREATE OR REPLACE FUNCTION on_rsvp_insert()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE watch_parties
    SET attendee_count = attendee_count + 1
    WHERE id = NEW.party_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rsvp_added
  AFTER INSERT ON rsvps
  FOR EACH ROW EXECUTE FUNCTION on_rsvp_insert();

-- Auto-decrement attendee_count when someone un-RSVPs
CREATE OR REPLACE FUNCTION on_rsvp_delete()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE watch_parties
    SET attendee_count = GREATEST(attendee_count - 1, 0)
    WHERE id = OLD.party_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER rsvp_removed
  AFTER DELETE ON rsvps
  FOR EACH ROW EXECUTE FUNCTION on_rsvp_delete();


-- ────────────────────────────────────────────────────────────
-- 3. HOST_REQUESTS TABLE
-- When a user submits the "Host a Watch Party" form,
-- save it here so admins can review/approve.
-- ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS host_requests (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  event_title    TEXT        NOT NULL,
  sport          sport_type  NOT NULL,
  venue_name     TEXT        NOT NULL,
  venue_address  TEXT        NOT NULL,
  event_date     DATE        NOT NULL,
  event_time     TEXT        NOT NULL,                   -- stored as "7:30 PM"
  max_capacity   INT         NOT NULL CHECK (max_capacity >= 2),
  status         TEXT        NOT NULL DEFAULT 'pending'  -- pending | approved | rejected
                             CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes    TEXT,                                   -- optional rejection reason
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at    TIMESTAMPTZ                             -- set when admin approves/rejects
);


-- ────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────

ALTER TABLE watch_parties  ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvps          ENABLE ROW LEVEL SECURITY;
ALTER TABLE host_requests  ENABLE ROW LEVEL SECURITY;

-- watch_parties: anyone can read, only auth users can insert
CREATE POLICY "Public can view parties"
  ON watch_parties FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create parties"
  ON watch_parties FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- rsvps: anyone can read (for counts), only owner can insert/delete
CREATE POLICY "Public can read rsvps"
  ON rsvps FOR SELECT USING (true);

CREATE POLICY "Authenticated users can RSVP"
  ON rsvps FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can un-RSVP their own"
  ON rsvps FOR DELETE USING (auth.uid() = user_id);

-- host_requests: users can submit and see their own; admins see all
CREATE POLICY "Users can submit host requests"
  ON host_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own requests"
  ON host_requests FOR SELECT USING (auth.uid() = user_id);


-- ────────────────────────────────────────────────────────────
-- 5. HELPER VIEW — parties with RSVP status for current user
-- Use this in the frontend: supabase.from('parties_with_rsvp')
-- ────────────────────────────────────────────────────────────

CREATE OR REPLACE VIEW parties_with_rsvp AS
SELECT
  wp.*,
  CASE WHEN r.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_rsvped
FROM watch_parties wp
LEFT JOIN rsvps r
  ON r.party_id = wp.id AND r.user_id = auth.uid();


-- ────────────────────────────────────────────────────────────
-- 6. SEED DATA — all 7 watch parties from the app
-- ────────────────────────────────────────────────────────────

INSERT INTO watch_parties
  (id, venue_name, venue_address, event_title, sport, day_number, month_short, time, distance_km, attendee_count, max_capacity, is_featured)
VALUES
  ('wp-1', 'The Sports Den',     '42 Galle Rd, Colombo 03',       'Australian Grand Prix 2026',         'formula1', 16, 'MAR', '6:00 AM',  '0.8 km', 47, 60, TRUE),
  ('wp-2', 'Legends Bar & Grill','18 Union Pl, Colombo 02',       'Champions League QF – Leg 1',        'football', 17, 'MAR', '10:45 PM', '1.4 km', 32, 50, FALSE),
  ('wp-3', 'Fan Zone Café',      '7 Park St, Colombo 05',         'WrestleMania 42 – Live Stream',      'wwe',      20, 'MAR', '5:00 AM',  '2.1 km', 28, 40, FALSE),
  ('wp-4', 'Pitch Perfect Pub',  '91 Duplication Rd, Colombo 04', 'Premier League: Arsenal vs Man Utd', 'football', 22, 'MAR', '7:30 PM',  '3.0 km', 55, 70, FALSE),
  ('wp-5', 'Velocity Lounge',    '3 Chatham St, Colombo 01',      'Monaco Grand Prix',                  'formula1',  6, 'APR', '7:00 AM',  '4.5 km', 21, 35, FALSE),
  ('wp-6', 'The Corner Kick',    '55 Marine Dr, Colombo 06',      'UEFA Europa League SF',               'football', 24, 'APR', '11:00 PM', '5.2 km', 19, 45, FALSE),
  ('wp-7', 'Rumble Room',        '12 Bagatelle Rd, Colombo 03',   'WWE RAW – Season Premiere',          'wwe',      30, 'MAR', '9:00 AM',  '1.9 km', 14, 30, FALSE)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- DONE! Tables created:
--   ✅ watch_parties  — all event data
--   ✅ rsvps          — per-user RSVP tracking (auto-updates count)
--   ✅ host_requests  — host form submissions
--   ✅ parties_with_rsvp — view that includes is_rsvped per user
-- ============================================================
