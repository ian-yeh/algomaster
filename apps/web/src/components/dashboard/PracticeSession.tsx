'use client';
import React, { useState, useEffect } from 'react';

interface PracticeStats {
  bestTime: string;
  bestAverage: string;
  solvesToday: number;
}

const QuickPractice: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [stats] = useState<PracticeStats>({
    bestTime: '12.45',
    bestAverage: '14.23',
    solvesToday: 47
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(15 * 60);
  };

  return (
    <div className="h-full bg-white border-2 border-black rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b-2 border-black">
        <h2 className="text-xl font-semibold text-black">Quick Practice</h2>
        <p className="text-sm text-black mt-1">15-minute focused practice session</p>
      </div>

      {/* Timer Section */}
      <div className="p-6">
        <div className="bg-white border-2 border-black rounded-lg p-6 text-center mb-6">
          <div className="text-4xl font-bold text-black mb-4">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center space-x-2">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Pause
              </button>
            )}
            <button
              onClick={handleReset}
              className="bg-white text-black border-2 border-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-4">
          {/* Best Time */}
          <div className="bg-white border-2 border-black rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-black mb-2">Best Time</h3>
              <p className="text-2xl font-bold text-black">{stats.bestTime}s</p>
            </div>
          </div>

          {/* Best Average */}
          <div className="bg-white border-2 border-black rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-black mb-2">Best Average</h3>
              <p className="text-2xl font-bold text-black">{stats.bestAverage}s</p>
            </div>
          </div>

          {/* Solves Today */}
          <div className="bg-white border-2 border-black rounded-lg p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-black mb-2">Solves Today</h3>
              <p className="text-2xl font-bold text-black">{stats.solvesToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPractice;
