import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartOptions } from 'chart.js';
import { getDataDashboard } from '../../Fetching/Fetching';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const [activeChart, setActiveChart] = useState<'crypto' | 'mutual'>('crypto');
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataDashboard();
        const cryptoChartConfig = {
          labels: data.cryptoChartData.labels,
          datasets: [{
            data: data.cryptoChartData.weights.map(weight => weight * 100), // Convert to percentage
            backgroundColor: [
              '#F7931A', // Bitcoin orange
              '#627EEA', // Ethereum blue
              '#00FFA3', // Solana green
              '#26A17B', // USDT green
              '#D97706', // Custom orange
              '#3B82F6', // Blue
              '#A855F7', // Purple
              '#22C55E', // Green
              '#94A3B8', // Gray
            ],
            borderWidth: 0,
          }],
        };

        const mutualChartConfig = {
          labels: data.mutualChartData.labels,
          datasets: [{
            data: data.mutualChartData.weights.map(weight => weight * 100), // Convert to percentage
            backgroundColor: [
              '#D97706', // Custom orange
              '#3B82F6', // Blue
              '#A855F7', // Purple
              '#22C55E', // Green
              '#94A3B8', // Gray
              '#F7931A', // Bitcoin orange
              '#627EEA', // Ethereum blue
              '#00FFA3', // Solana green
              '#26A17B', // USDT green
            ],
            borderWidth: 0,
          }],
        };

        setChartData({
          crypto: cryptoChartConfig,
          mutual: mutualChartConfig
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#D97706',
          font: {
            family: 'medieval',
            size: 15
          },
          padding: 10,
          boxWidth: 15
        }
      },
      tooltip: {
        backgroundColor: '#4B2E2B',
        titleColor: '#D97706',
        bodyColor: '#fff',
        borderColor: '#D97706',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed.toFixed(2)}%`;
          }
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full">
        <div className="text-[#D97706] font-medieval">Loading chart data...</div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-[300px] w-full">
        <div className="text-[#D97706] font-medieval">No data available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveChart('crypto')}
          className={`px-3 py-1 rounded font-medieval ${
            activeChart === 'crypto'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#4B2E2B] text-[#D97706] border border-[#D97706]/30'
          }`}
        >
          Cryptocurrency
        </button>
        <button
          onClick={() => setActiveChart('mutual')}
          className={`px-3 py-1 rounded font-medieval ${
            activeChart === 'mutual'
              ? 'bg-[#D97706] text-white'
              : 'bg-[#4B2E2B] text-[#D97706] border border-[#D97706]/30'
          }`}
        >
          Mutual Funds
        </button>
      </div>
      <div className="flex items-center h-[300px] w-full">
        <Pie data={chartData[activeChart]} options={options} />
      </div>
    </div>
  );
}