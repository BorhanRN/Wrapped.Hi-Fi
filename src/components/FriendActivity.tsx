
import React, { useState } from 'react';
import { Clock, Heart, MessageSquare, Search, UserPlus } from 'lucide-react';
import { useFriends } from '../context/FriendsContext';
import { Friend } from '../utils/mockData';

const FriendActivity: React.FC = () => {
  const { friends, loading } = useFriends();
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (friend.activity && friend.activity.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="glass-card rounded-xl shadow-sm overflow-hidden animate-scale-in">
      <div className="p-4 border-b border-slate-200/50 flex items-center justify-between">
        <h2 className="font-medium">Friend Activity</h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-foreground/70">{friends.length} friends</span>
          <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
            <UserPlus size={16} className="text-foreground/70" />
          </button>
        </div>
      </div>
      
      <div className="border-b border-slate-200/50 px-4 py-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2 pl-9 pr-3 rounded-md bg-secondary/50 border border-transparent focus:focus-ring text-sm"
          />
        </div>
      </div>
      
      <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
        {loading ? (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            <p className="mt-3 text-sm text-foreground/70">Loading friends...</p>
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-foreground/70">No friends found</p>
          </div>
        ) : (
          <ul>
            {filteredFriends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </ul>
        )}
      </div>
      
      <div className="p-3 border-t border-slate-200/50 flex justify-center">
        <button className="text-sm text-accent font-medium hover:underline">
          Add new friends
        </button>
      </div>
    </div>
  );
};

const FriendCard: React.FC<{ friend: Friend }> = ({ friend }) => {
  return (
    <li className="border-b border-slate-200/50 last:border-0 p-3 hover:bg-secondary/30 transition-colors">
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src={friend.avatar} 
              alt={friend.name} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className={`status-indicator status-${friend.status} absolute bottom-0 right-0 border border-white`}></div>
        </div>
        
        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="font-medium truncate">{friend.name}</p>
            <span className="text-xs text-foreground/60">{friend.lastActive}</span>
          </div>
          
          <p className="text-sm text-foreground/70 truncate">
            {friend.status === 'focusing' ? 
              friend.activity : 
              friend.status === 'busy' ? 
                friend.activity : 
                friend.status === 'available' ? 
                  'Available' : 'Offline'}
          </p>
        </div>
      </div>
      
      {friend.status === 'focusing' && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-foreground/60">
            <Clock size={12} />
            <span>
              {friend.focusTime} min focused today
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
              <Heart size={14} className="text-foreground/70" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-secondary transition-colors">
              <MessageSquare size={14} className="text-foreground/70" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default FriendActivity;
