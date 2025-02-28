
import React, { useState } from 'react';
import { Play, Pause, Square, Clock, Check, Edit2 } from 'lucide-react';
import { useFocusSession } from '../hooks/useFocusSession';
import { focusSuggestions } from '../utils/mockData';

const FocusTimer: React.FC = () => {
  const { 
    session, 
    progress, 
    formattedTime,
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    updateActivity,
    isActive,
    isFocusing,
    isPaused,
    isCompleted,
    isIdle
  } = useFocusSession({ defaultDuration: 25 * 60 });

  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [duration, setDuration] = useState(25);
  const [activity, setActivity] = useState('');
  const [isEditingActivity, setIsEditingActivity] = useState(false);

  const handleStartSession = () => {
    startSession(duration * 60, activity);
    setShowDurationPicker(false);
  };

  const handlePauseResumeSession = () => {
    if (isFocusing) {
      pauseSession();
    } else if (isPaused) {
      resumeSession();
    }
  };

  const handleUpdateActivity = () => {
    updateActivity(activity);
    setIsEditingActivity(false);
  };

  const availableDurations = [5, 15, 25, 30, 45, 60, 90];

  return (
    <div className="glass-card rounded-xl p-5 shadow-sm w-full animate-scale-in">
      <div className="flex flex-col items-center">
        {/* Timer Circle */}
        <div className="relative w-48 h-48 my-4">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#f0f1f3"
              strokeWidth="5"
            />
            
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={Math.PI * 2 * 45}
              strokeDashoffset={Math.PI * 2 * 45 * (1 - progress / 100)}
              transform="rotate(-90 50 50)"
              className="transition-all duration-700"
            />
            
            {/* Inner content */}
            <text
              x="50"
              y="45"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="currentColor"
              fontSize="16"
              fontWeight="500"
              className="font-mono"
            >
              {isIdle ? 'Ready?' : formattedTime}
            </text>
            
            {isActive && (
              <text
                x="50"
                y="65"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="10"
                className="opacity-70"
              >
                {isFocusing ? 'FOCUSING' : 'PAUSED'}
              </text>
            )}
            
            {isCompleted && (
              <text
                x="50"
                y="65"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="currentColor"
                fontSize="10"
                className="opacity-70"
              >
                COMPLETED
              </text>
            )}
          </svg>
        </div>
        
        {/* Activity */}
        {isIdle ? (
          <div className="w-full max-w-xs mb-4">
            <label className="text-sm font-medium mb-1 block text-left">What are you focusing on?</label>
            <div className="relative">
              <input
                type="text"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="E.g., Deep work, Reading..."
                className="w-full p-2 rounded-md border border-slate-200 focus:focus-ring"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {focusSuggestions.slice(0, 5).map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setActivity(suggestion)}
                  className="text-xs py-1 px-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-4 w-full max-w-xs">
            {isEditingActivity ? (
              <div className="flex items-center">
                <input
                  type="text"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full p-2 rounded-md border border-slate-200 focus:focus-ring text-sm"
                  autoFocus
                />
                <button 
                  onClick={handleUpdateActivity}
                  className="ml-2 p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <Check size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-base font-medium truncate max-w-[200px]">
                  {session.activity || 'Focusing'}
                </p>
                <button 
                  onClick={() => setIsEditingActivity(true)}
                  className="ml-2 p-1 rounded-full text-foreground/50 hover:text-foreground/70 hover:bg-secondary/80 transition-colors"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* Duration picker when idle */}
        {isIdle && !showDurationPicker && (
          <button
            onClick={() => setShowDurationPicker(true)}
            className="flex items-center space-x-2 py-2 px-3 rounded-md bg-secondary hover:bg-secondary/80 transition-colors mb-4"
          >
            <Clock size={18} />
            <span>{duration} minutes</span>
          </button>
        )}
        
        {showDurationPicker && (
          <div className="w-full mb-4 animate-fade-in">
            <label className="text-sm font-medium mb-1 block text-left">Choose duration (minutes)</label>
            <div className="grid grid-cols-4 gap-2">
              {availableDurations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d)}
                  className={`py-2 rounded-md transition-colors ${
                    duration === d
                      ? 'bg-accent text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Controls */}
        <div className="flex items-center justify-center space-x-3 mt-2">
          {isIdle ? (
            <button
              onClick={handleStartSession}
              className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-white shadow-md hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
            >
              <Play size={24} fill="currentColor" />
            </button>
          ) : (
            <>
              <button
                onClick={stopSession}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-all active:scale-95"
              >
                <Square size={18} />
              </button>
              
              <button
                onClick={handlePauseResumeSession}
                disabled={isCompleted}
                className={`flex items-center justify-center w-14 h-14 rounded-full shadow-md transition-all hover:scale-105 active:scale-95 ${
                  isCompleted
                    ? 'bg-secondary/80 cursor-not-allowed'
                    : 'bg-accent text-white hover:bg-accent/90'
                }`}
              >
                {isFocusing ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;
