
import React, { useState } from 'react';
import { Bell, Clock, Edit2, Moon, Settings, User } from 'lucide-react';
import { mockUser } from '../utils/mockData';

const ProfileSettings: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="glass-card rounded-xl shadow-sm overflow-hidden animate-scale-in">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img 
              src={mockUser.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium">{mockUser.name}</h3>
            <div className="flex items-center text-xs text-foreground/60">
              <span className="flex items-center">
                <Clock size={12} className="mr-1" />
                {mockUser.focusTimeToday} min today
              </span>
              <span className="mx-2">•</span>
              <span>{mockUser.streak} day streak</span>
            </div>
          </div>
        </div>
        <Edit2 size={16} className="text-foreground/60" />
      </div>
      
      {isExpanded && (
        <div className="animate-slide-up">
          <div className="px-4 py-3 border-t border-slate-200/50">
            <div className="mb-3">
              <label className="text-sm font-medium mb-1 block">Daily Focus Goal</label>
              <div className="flex items-center">
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-accent h-full rounded-full"
                    style={{ width: `${(mockUser.focusTimeToday / mockUser.dailyFocusGoal) * 100}%` }}
                  ></div>
                </div>
                <span className="ml-3 text-sm">
                  {mockUser.focusTimeToday}/{mockUser.dailyFocusGoal} min
                </span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-1">
              <button className="w-full p-2 text-left rounded-md hover:bg-secondary transition-colors flex items-center">
                <User size={16} className="mr-3" />
                <span>My Profile</span>
              </button>
              <button className="w-full p-2 text-left rounded-md hover:bg-secondary transition-colors flex items-center">
                <Bell size={16} className="mr-3" />
                <span>Notifications</span>
              </button>
              <button className="w-full p-2 text-left rounded-md hover:bg-secondary transition-colors flex items-center">
                <Moon size={16} className="mr-3" />
                <span>Appearance</span>
              </button>
              <button className="w-full p-2 text-left rounded-md hover:bg-secondary transition-colors flex items-center">
                <Settings size={16} className="mr-3" />
                <span>Settings</span>
              </button>
            </div>
          </div>
          
          <div className="px-4 py-3 border-t border-slate-200/50">
            <button className="w-full py-2 text-sm text-foreground/70 hover:text-foreground transition-colors">
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
