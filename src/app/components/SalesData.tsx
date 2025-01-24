"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import BarChart from './BarChart';

interface Sale {
  Salesperson: string;
  Applications: string;
  Signatures: string;
  Folders: string;
}

const SalesData: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily'); // State for Period
  const [team, setTeam] = useState<'all' | 'dreamVille' | 'dreamChasers'>('all'); // State for Team

  // Mapping for gid values based on team and period
  const gidMapping = {
    all: {
      daily: '0',
      weekly: '2040258721',
      monthly: '1972425694',
    },
    dreamVille: {
      daily: '0',
      weekly: '2040258721', // Replace with the correct gid for Dream Ville weekly
      monthly: '1972425694', // Replace with the correct gid for Dream Ville monthly
    },
    dreamChasers: {
      daily: '0',
      weekly: '2040258721', // Replace with the correct gid for Dream Chasers weekly
      monthly: '1972425694', // Replace with the correct gid for Dream Chasers monthly
    },
  };

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Determine the base URL based on the selected team
      let baseUrl = '';
      switch (team) {
        case 'all':
          baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR74nBW5M5UsaCzSj7ecVYXVaWfGENQEfyDl866XJgINqMct63qNQ68cRJOoRs70CQuk9StTpfRdgTl/pub';
          break;
        case 'dreamVille':
          baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3kVIT8fTjsg-Vh54CuKGS9_SpVlCPisie0kscyneeZj_2wxRpBSBleTYJvLfZRTWPPdFeyFyyKj4T/pub';
          break;
        case 'dreamChasers':
          baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSj0HxHTy51Lw_0mEB25q8i0WJI6dhmyUJqRb--SXlTEVMudfHejyksZUwmRtfa9sybB80OkjQ4QFuv/pub';
          break;
        default:
          baseUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR74nBW5M5UsaCzSj7ecVYXVaWfGENQEfyDl866XJgINqMct63qNQ68cRJOoRs70CQuk9StTpfRdgTl/pub';
      }

      // Determine the gid based on the selected team and period
      const gid = gidMapping[team][period];

      // Construct the URL
      const url = `${baseUrl}?gid=${gid}&single=true&output=csv`;

      const response = await axios.get(url);
      const parsedData = Papa.parse(response.data, { header: true });
      setSalesData(parsedData.data as Sale[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when period or team changes
  useEffect(() => {
    fetchData();
  }, [period, team]);

  // Function to find leaders for a given category
  const findLeaders = (category: keyof Sale) => {
    const maxValue = Math.max(...salesData.map((sale) => parseFloat(sale[category].replace('$', ''))));
    const leaders = salesData
      .filter((sale) => parseFloat(sale[category].replace('$', '')) === maxValue)
      .map((sale) => sale.Salesperson);
    return { maxValue, leaders };
  };

  // Get leaders for each category
  const applicationsLeaders = findLeaders('Applications');
  const signaturesLeaders = findLeaders('Signatures');
  const foldersLeaders = findLeaders('Folders');

  if (loading) {
    return <p className="text-center text-black">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Prepare data for the chart
  const chartData = {
    labels: salesData.map((sale) => sale.Salesperson),
    datasets: [
      {
        label: 'Applications',
        data: salesData.map((sale) => parseFloat(sale.Applications.replace('$', ''))),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Signatures',
        data: salesData.map((sale) => parseFloat(sale.Signatures)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Folders',
        data: salesData.map((sale) => parseFloat(sale.Folders.replace('$', ''))),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black text-center">Sales Leaderboard</h1>

      {/* Leaderboard Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-black text-center">Current Leaders</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Applications Leader */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">Applications</h3>
            <p className="text-black font-bold">
              {applicationsLeaders.maxValue} - {applicationsLeaders.leaders.join(', ')}
            </p>
          </div>

          {/* Signatures Leader */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">Signatures</h3>
            <p className="text-black font-bold">
              {signaturesLeaders.maxValue} - {signaturesLeaders.leaders.join(', ')}
            </p>
          </div>

          {/* Folders Leader */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-black">Folders</h3>
            <p className="text-black font-bold">
              {foldersLeaders.maxValue} - {foldersLeaders.leaders.join(', ')}
            </p>
          </div>
        </div>
      </div>

      {/* Team and Period Selectors */}
      <div className="flex items-center gap-4 mb-4">
        {/* Team Selector */}
        <div>
          <label htmlFor="team" className="mr-2 text-black">Team:</label>
          <select
            id="team"
            value={team}
            onChange={(e) => setTeam(e.target.value as 'all' | 'dreamVille' | 'dreamChasers')}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-black"
          >
            <option value="all">All Staff</option>
            <option value="dreamVille">Dream Ville</option>
            <option value="dreamChasers">Dream Chasers</option>
          </select>
        </div>

        {/* Period Selector */}
        <div>
          <label htmlFor="period" className="mr-2 text-black">Period:</label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
            className="px-4 py-2 bg-white border border-gray-300 rounded text-black"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Graph Section with Reduced Height */}
      <div className="flex justify-center h-[680px]">
        <BarChart data={chartData} />
      </div>
    </div>
  );
};

export default SalesData;