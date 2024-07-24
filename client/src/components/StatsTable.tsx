// StatsTable.tsx
import React from 'react';

interface Stat {
  id: string;
  Winner: string;
  Board: string;
  TimeStamp: string;
}

interface StatsTableProps {
  stats: Stat[];
  onRefresh: () => void;
}

const StatsTable: React.FC<StatsTableProps> = ({ stats, onRefresh }) => {
  return (
    <div className="max-w-4xl mx-auto rounded overflow-hidden shadow-lg p-6 bg-white">
      <div className="font-bold text-xl mb-4 flex justify-between items-center">
        <span>Game Stats</span>
        <button
          onClick={onRefresh}
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" 
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 
              3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" 
            />
          </svg>

        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b-2">ID</th>
            <th className="px-4 py-2 border-b-2">Winner</th>
            <th className="px-4 py-2 border-b-2">Board Size</th>
            <th className="px-4 py-2 border-b-2">TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={stat.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="px-4 py-2 border-b">{stat.id}</td>
              <td className="px-4 py-2 border-b">{stat.Winner}</td>
              <td className="px-4 py-2 border-b">{stat.Board}</td>
              <td className="px-4 py-2 border-b">{stat.TimeStamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatsTable;
