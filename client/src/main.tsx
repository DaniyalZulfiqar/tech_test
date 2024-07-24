import React, { useState} from 'react'
import Board from './components/Board';
import StatsTable from './components/StatsTable';
import GameStats from './components/GamesStat';
import axios, {AxiosResponse} from 'axios';

/**
 * Client -> npm run start
 * JSON Server for Persisting Data -> npm run server
 * 
 * Of the top of my head, given more time
 * 1. I would have deployed the App on a server 
 * 2. More organized way to handle App states and Data 
 * 3. Styling certainly can be way better
 * 4. Instead of manually refreshing tables to grab updated Stats I would use React State system auto update data on UI
 * 
 */

interface Stat {
  id: string;
  Winner: string;
  Board: string;
  TimeStamp: string;
}

interface GameStat {
  id: string;
  winningCount: string;
}



const sortStatsByTimestamp = (stats: any[]) => {
  return stats.slice().sort((a, b) => {
    // Convert timestamps to Date objects for comparison
    const dateA = new Date(a.TimeStamp);
    const dateB = new Date(b.TimeStamp);
    return dateB.getTime() - dateA.getTime(); // Sort in descending order
  });
};

export const Main = () => {

  const [gameDetailStats, setGameDetailStats] = useState<Stat[]>([]);
  const [gameStats, setGameStats] = useState<GameStat[]>([]);

  const handleGameRefresh = () => {
      // Function to fetch data 
      const fetchData = async () => {
        try {
          const response: AxiosResponse<GameStat[]> = await axios.get<GameStat[]>('http://localhost:3002/winnerStats');
          const data: GameStat[] = response.data;
          console.log(data);
          setGameStats(data);
          
        } catch (error) {
          // Handle error
          console.error('Error fetching data:', error);
          
        }
      }
  
      fetchData();


  };
  const handleRefresh =  () => {

        // Function to fetch data 
        const fetchGameData = async () => {
          try {
            const response: AxiosResponse<Stat[]> = await axios.get<Stat[]>('http://localhost:3002/stats');
            const data: Stat[] = response.data.slice(-10);
            const sortedStats = sortStatsByTimestamp(data);
            console.log(sortedStats);
            setGameDetailStats(sortedStats);
            
          } catch (error) {
            // Handle error
            console.error('Error fetching data:', error);
            
          }
        }
    
        fetchGameData();
    
    };

  return (
        <div className='flex flex-col mt-10 items-center justify-center gap-10 bg-white p-8 rounded shadow-lg'>
          <div className='font-bold text-2xl'>Tic Tac Toe</div>
          <div className='flex gap-10 bg-gray-100 p-8'>
            <GameStats gameStats={gameStats} onRefresh={handleGameRefresh}/>
            <Board />
            <StatsTable stats={gameDetailStats} onRefresh={handleRefresh} />
          </div>
        </div>
      )
}