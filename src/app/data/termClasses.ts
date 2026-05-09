export interface TermSession {
  date: string;
  time: string;
  duration: string;
  durationLabel: string;
  coach: string;
}

export interface TermClass {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  address: string;
  fullAddress: string;
  ageGroup: string;
  price: number;
  startedDate: string;
  dateRange: string;
  sessionDuration: string;
  totalSessions: number;
  description: string;
  sessions: TermSession[];
}

const description = (ageGroup: string, dates: string, duration: string) =>
  `Join our Term 2 Term Program for ages ${ageGroup} years. Players will master the pivotal elements of football covering touch, dribbling and passing. Players will learn positional skills in attacking and defending through individual activates and game realistic scenarios. Specific information for the program is listed below.

- Age Group: ${ageGroup.includes('4') ? 'Foundation' : 'Elite'} ${ageGroup} Years
- Duration: 8 Weeks (8 Sessions)
- Dates: ${dates}
- Session Duration: ${duration}
- Location: The Ponds (Cardinale St/Fyfe Rd) *Please note, sessions may be at Peel Reserve*

Information regarding the specific venue location, parking, what to bring, expectations/rules will be sent via email when registration is completed.

Any questions, please don't hesitate to contact us!`;

export const termClasses: TermClass[] = [
  {
    id: 'foundation-sun-10am',
    slug: 'foundation-sunday-10am',
    title: 'Foundation Class',
    subtitle: 'Term 2 - Sunday 10:00am',
    location: 'The Ponds / Foundation 4-8',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '4-8',
    price: 189,
    startedDate: '26 Apr',
    dateRange: '26 Apr 2026 - 14 June 2026',
    sessionDuration: '45 Minutes',
    totalSessions: 8,
    description: description('4-8', '26th of April / 14th of June', '45 Minutes'),
    sessions: [
      { date: 'Sunday 26 Apr', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 3 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 10 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 17 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 24 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 31 May', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 7 June', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
      { date: 'Sunday 14 June', time: '10:00 am', duration: '45 min', durationLabel: '45 minutes', coach: 'Coach Mackenzie' },
    ],
  },
  {
    id: 'elite-sun-11am',
    slug: 'elite-sunday-11am',
    title: 'Elite Class',
    subtitle: 'Term 2 - Sunday 11:00am',
    location: 'The Ponds / Elite 8-12',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '8-12',
    price: 209,
    startedDate: '26 Apr',
    dateRange: '26 Apr 2026 - 14 June 2026',
    sessionDuration: '1 Hour',
    totalSessions: 8,
    description: description('8-12', '26th of April / 14th of June', '1 Hour'),
    sessions: [
      { date: 'Sunday 26 Apr', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 3 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 10 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 17 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 24 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 31 May', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 7 June', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Sunday 14 June', time: '11:00 am', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
    ],
  },
  {
    id: 'elite-thu-430pm',
    slug: 'elite-thursday-430pm',
    title: 'Elite Class',
    subtitle: 'Term 2 - Thursday 4:30pm',
    location: 'The Ponds / Elite 8-12',
    address: 'Carindale Street',
    fullAddress: 'Technica Football, Carindale Street, The Ponds NSW, Australia',
    ageGroup: '8-12',
    price: 209,
    startedDate: '30 Apr',
    dateRange: '30 Apr 2026 - 18 June 2026',
    sessionDuration: '1 Hour',
    totalSessions: 8,
    description: description('8-12', '30 of April / 18th of June', '1 Hour'),
    sessions: [
      { date: 'Thursday 30 Apr', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 7 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 14 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 21 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 28 May', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 4 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 11 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
      { date: 'Thursday 18 June', time: '4:30 pm', duration: '1 hr', durationLabel: '1 hour', coach: 'Coach Mackenzie' },
    ],
  },
];

export function getClassBySlug(slug: string): TermClass | undefined {
  return termClasses.find(c => c.slug === slug);
}
