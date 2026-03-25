import type { RaceEvent } from './events.types';

export const RACE_EVENTS: RaceEvent[] = [
  {
    id: '1',
    title: 'Abu Dhabi Grand Prix',
    description:
      'The season opener above the Corniche waterfront. Elite pilots compete in a full points Grand Prix over the Arabian Gulf, setting the tone for the entire season.',
    address: 'Corniche Waterfront, Abu Dhabi',
    country: 'UAE',
    coordinates: { lat: 24.4672, lng: 54.3569 },
    category: 'Grand Prix',
    date: '2025-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
  },
  {
    id: '2',
    title: 'San Diego Sprint',
    description:
      'A high-intensity sprint format above San Diego Bay. Pilots complete short, rapid circuits against the Pacific skyline — the fastest format on the calendar.',
    address: 'San Diego Bay, San Diego, CA',
    country: 'USA',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    category: 'Sprint',
    date: '2025-04-26',
    imageUrl: 'https://images.unsplash.com/photo-1538982099772-aaadc9d6f0e6?w=1200&q=80',
  },
  {
    id: '3',
    title: 'Budapest Grand Prix',
    description:
      'Racing above the Danube between the Chain Bridge and Buda Castle. One of the most technically demanding Grand Prix circuits, with river crosswinds and tight urban pylon gates.',
    address: 'Danube River, Budapest',
    country: 'Hungary',
    coordinates: { lat: 47.4979, lng: 19.0402 },
    category: 'Grand Prix',
    date: '2025-06-21',
    imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80',
  },
  {
    id: '4',
    title: 'Porto Sprint',
    description:
      'The Douro River sprint sees pilots navigate a compressed course past the Ribeira district at full throttle. Short gaps between gates demand split-second decisions.',
    address: 'Douro River, Porto',
    country: 'Portugal',
    coordinates: { lat: 41.1579, lng: -8.6291 },
    category: 'Sprint',
    date: '2025-07-12',
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80',
  },
  {
    id: '5',
    title: 'Indianapolis Exhibition',
    description:
      'A special exhibition showcase over the legendary Indianapolis Motor Speedway grounds. Non-championship but a fan spectacle — pilot teams demonstrate experimental manoeuvres.',
    address: 'Indianapolis Motor Speedway, Indianapolis, IN',
    country: 'USA',
    coordinates: { lat: 39.7954, lng: -86.2347 },
    category: 'Exhibition',
    date: '2025-08-09',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
  },
  {
    id: '6',
    title: 'Lausitz Grand Prix',
    description:
      'Germany hosts the penultimate Grand Prix of the season at the Lausitzring circuit. Overcast central European skies, no thermals — pure pilot skill determines the outcome.',
    address: 'Lausitzring Circuit, Klettwitz',
    country: 'Germany',
    coordinates: { lat: 51.5283, lng: 13.9371 },
    category: 'Grand Prix',
    date: '2025-09-20',
    imageUrl: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80',
  },
  {
    id: '7',
    title: 'Chiba Grand Prix',
    description:
      'The championship-deciding Grand Prix finale over Tokyo Bay. With Mount Fuji visible on clear days, this is the most prestigious round of the season.',
    address: 'Inage Seaside Park, Chiba',
    country: 'Japan',
    coordinates: { lat: 35.6174, lng: 140.1065 },
    category: 'Grand Prix',
    date: '2025-10-18',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
  },
  {
    id: '8',
    title: 'Melbourne Sprint',
    description:
      'A late-season sprint over Port Phillip Bay. The compact course rewards aerobatic precision over raw speed — often a surprise-result round that shakes up the standings.',
    address: 'Port Phillip Bay, Melbourne',
    country: 'Australia',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    category: 'Sprint',
    date: '2025-11-08',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
  {
    id: '9',
    title: 'Dubai Exhibition',
    description:
      'A spectacular exhibition event above the Dubai Marina skyline. Featuring night flying with illuminated pylons — non-championship but draws the largest global audience.',
    address: 'Dubai Marina, Dubai',
    country: 'UAE',
    coordinates: { lat: 25.0805, lng: 55.1403 },
    category: 'Exhibition',
    date: '2025-12-06',
    imageUrl: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=80',
  },
];
