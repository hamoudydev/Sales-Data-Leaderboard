"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import BarChart from './BarChart';

interface Sale {
  Salesperson: string;
  Credit: string;
  Submissions: string;
  Fundings: string;
}

const SalesData: React.FC = () => {
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching starts
    setError(null); // Clear any previous errors
    try {
      const url = 'YOUR_GOOGLE_SHEETS_PUBLISHED_URL';
      const response = await axios.get(url);
      const parsedData = Papa.parse(response.data, { header: true });
      setSalesData(parsedData.data as Sale[]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when fetching is done
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-black">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  // Prepare data for the bar chart
  const chartData = {
    labels: salesData.map((sale) => sale.Salesperson),
    datasets: [
      {
        label: 'Credit',
        data: salesData.map((sale) => parseFloat(sale.Credit.replace('$', ''))),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Submissions',
        data: salesData.map((sale) => parseFloat(sale.Submissions)),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
      {
        label: 'Fundings',
        data: salesData.map((sale) => parseFloat(sale.Fundings.replace('$', ''))),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Refresh Button */}
      <button
        onClick={fetchData}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Refresh Data
      </button>
      <BarChart data={chartData} />
    </div>
  );
};

export default SalesData;