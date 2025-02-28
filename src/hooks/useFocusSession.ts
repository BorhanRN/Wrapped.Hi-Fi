
import { useState, useEffect, useCallback } from 'react';

type FocusStatus = 'idle' | 'focusing' | 'break' | 'completed';

interface FocusSession {
  status: FocusStatus;
  timeRemaining: number;
  totalDuration: number;
  activity: string;
  startTime?: Date;
  pausedAt?: number;
}

interface UseFocusSessionProps {
  defaultDuration?: number;
  defaultActivity?: string;
}

export function useFocusSession({ 
  defaultDuration = 25 * 60, // 25 minutes in seconds
  defaultActivity = ''
}: UseFocusSessionProps = {}) {
  
  const [session, setSession] = useState<FocusSession>({
    status: 'idle',
    timeRemaining: defaultDuration,
    totalDuration: defaultDuration,
    activity: defaultActivity,
  });

  const [intervalId, setIntervalId] = useState<number | null>(null);

  const clearCurrentInterval = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const startSession = useCallback((duration?: number, activity?: string) => {
    clearCurrentInterval();
    
    const newDuration = duration || defaultDuration;
    const newActivity = activity || defaultActivity;
    
    setSession({
      status: 'focusing',
      timeRemaining: newDuration,
      totalDuration: newDuration,
      activity: newActivity,
      startTime: new Date(),
      pausedAt: undefined
    });
    
    const id = window.setInterval(() => {
      setSession(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(id);
          return {
            ...prev,
            status: 'completed',
            timeRemaining: 0
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, 1000);
    
    setIntervalId(id);
    
    return () => clearInterval(id);
  }, [defaultDuration, defaultActivity]);

  const pauseSession = useCallback(() => {
    clearCurrentInterval();
    
    setSession(prev => ({
      ...prev,
      status: 'break',
      pausedAt: prev.timeRemaining
    }));
  }, []);

  const resumeSession = useCallback(() => {
    if (session.status !== 'break') return;
    
    clearCurrentInterval();
    
    setSession(prev => ({
      ...prev,
      status: 'focusing',
      pausedAt: undefined
    }));
    
    const id = window.setInterval(() => {
      setSession(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(id);
          return {
            ...prev,
            status: 'completed',
            timeRemaining: 0
          };
        }
        return {
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        };
      });
    }, 1000);
    
    setIntervalId(id);
    
  }, [session.status]);

  const stopSession = useCallback(() => {
    clearCurrentInterval();
    
    setSession({
      status: 'idle',
      timeRemaining: defaultDuration,
      totalDuration: defaultDuration,
      activity: defaultActivity
    });
  }, [defaultDuration, defaultActivity]);

  const updateActivity = useCallback((activity: string) => {
    setSession(prev => ({
      ...prev,
      activity
    }));
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  // Format time remaining as mm:ss
  const formatTimeRemaining = () => {
    const minutes = Math.floor(session.timeRemaining / 60);
    const seconds = session.timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progress = session.totalDuration > 0 
    ? ((session.totalDuration - session.timeRemaining) / session.totalDuration) * 100
    : 0;

  return {
    session,
    progress,
    formattedTime: formatTimeRemaining(),
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    updateActivity,
    isActive: session.status === 'focusing' || session.status === 'break',
    isFocusing: session.status === 'focusing',
    isPaused: session.status === 'break',
    isCompleted: session.status === 'completed',
    isIdle: session.status === 'idle'
  };
}
