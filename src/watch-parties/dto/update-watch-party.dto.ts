import { CreateWatchPartyDto } from './create-watch-party.dto';

export class UpdateWatchPartyDto implements Partial<CreateWatchPartyDto> {
  venueName?: string;
  venueAddress?: string;
  eventTitle?: string;
  sport?: 'football' | 'formula1' | 'wwe';
  dayNumber?: number;
  monthShort?: string;
  time?: string;
  distanceKm?: string;
  maxCapacity?: number;
}
