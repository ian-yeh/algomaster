import React, { useState } from 'react';

// WCA Events
const WCA_EVENTS = [
  { id: '333', name: '3x3x3 Cube' },
  { id: '222', name: '2x2x2 Cube' },
  { id: '444', name: '4x4x4 Cube' },
  { id: '555', name: '5x5x5 Cube' },
  { id: '666', name: '6x6x6 Cube' },
  { id: '777', name: '7x7x7 Cube' },
  { id: '333bf', name: '3x3x3 Blindfolded' },
  { id: '333oh', name: '3x3x3 One-Handed' },
  { id: 'clock', name: 'Clock' },
  { id: 'minx', name: 'Megaminx' },
  { id: 'pyram', name: 'Pyraminx' },
  { id: 'skewb', name: 'Skewb' },
  { id: 'sq1', name: 'Square-1' },
  { id: '444bf', name: '4x4x4 Blindfolded' },
  { id: '555bf', name: '5x5x5 Blindfolded' },
  { id: '333mbf', name: '3x3x3 Multi-Blind' },
  { id: '333ft', name: '3x3x3 Fewest Moves' },
];

interface PerformanceStatsProps {
  bestTime?: string;
  bestAverage?: string;
  algorithmsMastered?: number;
  onEventChange?: (eventId: string) => void;
}

const PerformanceStats: React.FC<PerformanceStatsProps> = ({
  bestTime = '--',
  bestAverage = '--',
  algorithmsMastered = 0,
  onEventChange,
}) => {
  const [selectedEvent, setSelectedEvent] = useState('333');

  const handleEventChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newEvent = event.target.value;
    setSelectedEvent(newEvent);
    onEventChange?.(newEvent);
  };

  return (
    <div className="flex flex-col space-y-4 w-full">
      {/* Event Selector */}
      <div className="bg-white border-2 border-black rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-medium text-black mb-3">Select Event</h3>
          <select
            value={selectedEvent}
            onChange={handleEventChange}
            className="w-full bg-white border-2 border-black rounded px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 appearance-none bg-no-repeat bg-right pr-8"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23000' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundSize: '1.5em 1.5em',
              backgroundPosition: 'right 0.5rem center'
            }}
          >
            {WCA_EVENTS.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Best Time Card */}
      <div className="bg-white border-2 border-black rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-medium text-black mb-2">Best Time</h3>
          <p className="text-2xl font-bold text-black">{bestTime}</p>
        </div>
      </div>

      {/* Best Average Card */}
      <div className="bg-white border-2 border-black rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-medium text-black mb-2">Best Average</h3>
          <p className="text-2xl font-bold text-black">{bestAverage}</p>
        </div>
      </div>

      {/* Algorithms Mastered Card */}
      <div className="bg-white border-2 border-black rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <h3 className="text-sm font-medium text-black mb-2">Algorithms Mastered</h3>
          <p className="text-2xl font-bold text-black">{algorithmsMastered}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceStats;
