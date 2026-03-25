export type EventCategory = 'Grand Prix' | 'Sprint' | 'Exhibition';

export interface RaceEvent {
  id: string;
  title: string;
  description: string;
  address: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: EventCategory;
  date: string;
  imageUrl?: string;
}
