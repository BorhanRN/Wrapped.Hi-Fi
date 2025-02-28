
import React, { useState } from 'react';
import { Bell, ChevronDown, Menu, Settings, User } from 'lucide-react';
import { mockUser } from '../utils/mockData';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-200/80">
      <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 md:hidden p-1 rounded-full hover:bg-secondary transition-colors"
            onClick={() => console.log('Toggle sidebar')}
          >
            <Menu size={22} className="text-foreground/80" />
          </button>
          <h1 className="text-xl font-medium">FocusFriends</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-secondary transition-colors relative">
            <Bell size={20} className="text-foreground/80" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center space-x-2 py-1 px-1 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={mockUser.avatar} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <ChevronDown size={18} className="text-foreground/70" />
            </button>
            
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-md py-1 z-20 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-200/50">
                  <p className="font-medium">{mockUser.name}</p>
                  <p className="text-sm text-foreground/70">{mockUser.email}</p>
                </div>
                <button className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-secondary/70 transition-colors">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="w-full px-4 py-2 text-left flex items-center space-x-2 hover:bg-secondary/70 transition-colors">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <div className="border-t border-slate-200/50 mt-1 pt-1">
                  <button className="w-full px-4 py-2 text-left hover:bg-secondary/70 transition-colors">
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
