export interface DateType {
  monthDay: string;
  day: string;
}

export interface EventType {
  id: string;
  date: DateType;
  title: string;
  description: string;
  category: string;
  user: string;
  userRole: string;
  userImg: string;
}

export const eventsData: EventType[] = [
  {
    id: '1',
    date: { monthDay: 'Jul-24', day: '01' },
    title: '3rd Annual Meeting',
    description: 'In this coming meeting we shall discuss the way forward on our new building and other pending issues of the previous meetings.',
    category: 'meeting',
    user: 'Emeka Obianom Sunday',
    userRole: 'PRO',
    userImg: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    id: '2',
    date: { monthDay: 'Aug-24', day: '12' },
    title: 'Quarterly Financial Report',
    description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
    category: 'Finance',
    user: 'Sophia Lee',
    userRole: 'PRO',
    userImg: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
  {
    id: '3',
    date: { monthDay: 'Mar-24', day: '12' },
    title: 'Annually Financial Report',
    description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
    category: 'meeting',
    user: 'Sophia Lee',
    userRole: 'PRO',
    userImg: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '4',
    date: { monthDay: 'Oct-24', day: '12' },
    title: '4th Financial Report',
    description: 'We will be reviewing the quarterly financial report and addressing any discrepancies found.',
    category: 'meeting',
    user: 'Sophia Lee',
    userRole: 'PRO',
    userImg: 'https://randomuser.me/api/portraits/women/19.jpg',
  },
];