'use client';

import React, { createContext, useContext, useState } from 'react';

interface ScoreContextType {
  score: number;
  addScore: (points: number) => void;
  deductScore: (points: number) => boolean;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(750); // Initial mock score

  const addScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const deductScore = (points: number) => {
    if (score >= points) {
      setScore(prev => prev - points);
      return true;
    }
    return false;
  };

  return (
    <ScoreContext.Provider value={{ score, addScore, deductScore }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
}
