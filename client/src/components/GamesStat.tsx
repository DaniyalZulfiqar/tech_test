import React from 'react';

interface GameStat {
    id: string;
    winningCount: string;
}
  
interface GamesTableProps {
    gameStats: GameStat[];
    onRefresh: () => void;
}

const GameStats: React.FC<GamesTableProps> = ({ gameStats, onRefresh }) => {
  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
        <div className="font-bold text-xl mb-4 flex justify-center items-center gap-3">
            <span>Game Won</span>
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
        <div className="flex space-x-8">
            {gameStats.map((stat) => (
            <div
                key={stat.id}
                className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-sm"
            >
                <span className="text-2xl font-bold">{stat.winningCount}</span>
                <span className="text-lg font-medium text-gray-600">
                Player {stat.id}
                </span>
            </div>
            ))}
        </div>
    </div>
  );
};

export default GameStats;
