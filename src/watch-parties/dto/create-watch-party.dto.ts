export class CreateWatchPartyDto {
  venueName: string;
  venueAddress: string;
  eventTitle: string;
  sport: 'football' | 'formula1' | 'wwe';
  dayNumber: number;
  monthShort: string;
  time: string;
  distanceKm?: string;
  maxCapacity?: number;
}
