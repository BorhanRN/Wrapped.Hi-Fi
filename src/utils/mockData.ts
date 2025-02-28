
export type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: 'focusing' | 'available' | 'busy' | 'offline';
  activity?: string;
  lastActive?: string;
  focusTime?: number; // in minutes per day
};

export const mockFriends: Friend[] = [
  {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&auto=format&fit=crop&q=80',
    status: 'focusing',
    activity: 'Writing thesis chapter',
    lastActive: '2 min ago',
    focusTime: 145
  },
  {
    id: '2',
    name: 'Sofia Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=80',
    status: 'available',
    lastActive: 'Just now',
    focusTime: 87
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=80',
    status: 'busy',
    activity: 'In a meeting',
    lastActive: '15 min ago',
    focusTime: 210
  },
  {
    id: '4',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&auto=format&fit=crop&q=80',
    status: 'focusing',
    activity: 'Studying for exams',
    lastActive: '5 min ago',
    focusTime: 178
  },
  {
    id: '5',
    name: 'James Liu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&auto=format&fit=crop&q=80',
    status: 'offline',
    lastActive: '2 hours ago',
    focusTime: 56
  }
];

export type User = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  dailyFocusGoal: number; // in minutes
  focusTimeToday: number; // in minutes
  streak: number; // consecutive days with focus sessions
};

export const mockUser: User = {
  id: 'user1',
  name: 'Jamie Smith',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&auto=format&fit=crop&q=80',
  email: 'jamie.smith@example.com',
  dailyFocusGoal: 120,
  focusTimeToday: 45,
  streak: 4
};

export const focusSuggestions = [
  'Deep work',
  'Reading',
  'Writing',
  'Studying',
  'Project work',
  'Coding',
  'Research',
  'Email management',
  'Planning',
  'Design work'
];

export const mockActivities = [
  { id: '1', name: 'Completed 45-minute focus session', time: '2 hours ago' },
  { id: '2', name: 'Added Emma as a friend', time: 'Yesterday' },
  { id: '3', name: 'Reached daily focus goal', time: 'Yesterday' },
  { id: '4', name: 'Completed 30-minute focus session', time: '2 days ago' },
];
