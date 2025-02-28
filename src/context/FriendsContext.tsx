
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Friend, mockFriends } from '../utils/mockData';

type FriendsContextType = {
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  removeFriend: (id: string) => void;
  updateFriendStatus: (id: string, status: Friend['status'], activity?: string) => void;
  loading: boolean;
};

const FriendsContext = createContext<FriendsContextType | undefined>(undefined);

export const FriendsProvider = ({ children }: { children: ReactNode }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call with a slight delay
    const timer = setTimeout(() => {
      setFriends(mockFriends);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const addFriend = (friend: Friend) => {
    setFriends(prev => [...prev, friend]);
  };

  const removeFriend = (id: string) => {
    setFriends(prev => prev.filter(friend => friend.id !== id));
  };

  const updateFriendStatus = (id: string, status: Friend['status'], activity?: string) => {
    setFriends(prev => 
      prev.map(friend => 
        friend.id === id 
          ? { ...friend, status, activity: activity || friend.activity } 
          : friend
      )
    );
  };

  return (
    <FriendsContext.Provider value={{ 
      friends, 
      addFriend, 
      removeFriend,
      updateFriendStatus,
      loading 
    }}>
      {children}
    </FriendsContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendsContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendsProvider');
  }
  return context;
};
