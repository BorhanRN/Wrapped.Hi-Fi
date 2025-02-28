
import React from 'react';
import Header from '../components/Header';
import FocusTimer from '../components/FocusTimer';
import FriendActivity from '../components/FriendActivity';
import ProfileSettings from '../components/ProfileSettings';
import AddFriend from '../components/AddFriend';
import { FriendsProvider } from '../context/FriendsContext';
import { useIsMobile } from '../hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <FriendsProvider>
      <div className="min-h-screen bg-gradient-to-br from-white to-slate-50">
        <Header />
        
        <main className="container mx-auto px-4 pt-20 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-medium">Your Focus Dashboard</h2>
                <span className="text-sm text-foreground/70">Wednesday, April 26</span>
              </div>
              
              <FocusTimer />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-5 shadow-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <h3 className="font-medium mb-4">Focus Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Today</span>
                        <span className="font-medium">45 minutes</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-accent h-full rounded-full" style={{ width: '37.5%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>This week</span>
                        <span className="font-medium">4.5 hours</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-accent h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex items-center justify-between text-sm">
                      <span>Current streak</span>
                      <span className="py-1 px-2 bg-secondary rounded-full font-medium">4 days</span>
                    </div>
                  </div>
                </div>
                
                <AddFriend />
              </div>
              
              {isMobile && (
                <div className="mt-6">
                  <ProfileSettings />
                </div>
              )}
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              {!isMobile && (
                <ProfileSettings />
              )}
              <FriendActivity />
            </div>
          </div>
        </main>
      </div>
    </FriendsProvider>
  );
};

export default Index;
