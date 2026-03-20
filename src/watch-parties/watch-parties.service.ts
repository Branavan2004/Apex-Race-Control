import { Injectable, NotFoundException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CreateWatchPartyDto } from './dto/create-watch-party.dto';

export interface WatchParty extends CreateWatchPartyDto {
  id: string;
  attendeeCount: number;
  isFeatured?: boolean;
  isRSVPed?: boolean;
}

@Injectable()
export class WatchPartiesService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  async findAll(): Promise<WatchParty[]> {
    const { data, error } = await this.supabase
      .from('watch_parties')
      .select('*, watch_party_rsvps(count)')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    return data.map((p: any) => ({
      id: p.id,
      venueName: p.venue_name,
      venueAddress: p.venue_address,
      eventTitle: p.event_title,
      sport: p.sport,
      dayNumber: p.day_number,
      monthShort: p.month_short,
      time: p.time,
      distanceKm: p.distance_km,
      attendeeCount: p.watch_party_rsvps[0]?.count ?? 0,
      isFeatured: p.is_featured,
      maxCapacity: p.max_capacity,
    }));
  }

  async findOne(id: string): Promise<WatchParty> {
    const { data, error } = await this.supabase
      .from('watch_parties')
      .select('*, watch_party_rsvps(count)')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Watch party with ID ${id} not found`);

    return {
      id: data.id,
      venueName: data.venue_name,
      venueAddress: data.venue_address,
      eventTitle: data.event_title,
      sport: data.sport,
      dayNumber: data.day_number,
      monthShort: data.month_short,
      time: data.time,
      distanceKm: data.distance_km,
      attendeeCount: data.watch_party_rsvps[0]?.count ?? 0,
      isFeatured: data.is_featured,
      maxCapacity: data.max_capacity,
    };
  }

  async create(payload: Partial<WatchParty>): Promise<WatchParty> {
    const { data, error } = await this.supabase
      .from('watch_parties')
      .insert({
        venue_name: payload.venueName,
        venue_address: payload.venueAddress,
        event_title: payload.eventTitle,
        sport: payload.sport,
        day_number: payload.dayNumber,
        month_short: payload.monthShort,
        time: payload.time,
        distance_km: payload.distanceKm,
        max_capacity: payload.maxCapacity,
        is_featured: false,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      ...payload,
      id: data.id,
      attendeeCount: 1,
      isRSVPed: true,
      isFeatured: false,
    } as WatchParty;
  }

  async toggleRsvp(id: string): Promise<WatchParty> {
    const party = await this.findOne(id);

    const { data: existing } = await this.supabase
      .from('watch_party_rsvps')
      .select()
      .eq('watch_party_id', id)
      .maybeSingle();

    if (existing) {
      await this.supabase
        .from('watch_party_rsvps')
        .delete()
        .eq('watch_party_id', id);

      return { ...party, isRSVPed: false, attendeeCount: party.attendeeCount - 1 };
    } else {
      await this.supabase
        .from('watch_party_rsvps')
        .insert({ watch_party_id: id });

      return { ...party, isRSVPed: true, attendeeCount: party.attendeeCount + 1 };
    }
  }
}
