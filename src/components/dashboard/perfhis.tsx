import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import type { ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PerformanceHistory() {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Crypto Assets',
        data: [12000, 13200, 12800, 14500, 13800, 15000, 14200],
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        tension: 0.4,
      },
      {
        label: 'Mutual Funds',
        data: [10000, 10500, 11200, 11000, 11800, 11500, 12000],
        borderColor: '#A855F7',
        backgroundColor: '#A855F7',
        tension: 0.4,
      }
    ]
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        align: 'end' as const,
        labels: {
          color: '#D97706',
          font: {
            family: 'unical',
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
            return `${context.dataset.label}: $${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#D97706',
          lineWidth: 0.5
        },
        ticks: {
          color: '#D97706',
          font: {
            family: 'unical',
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: '#D97706',
          lineWidth: 0.5
        },
        ticks: {
          color: '#D97706',
          font: {
            family: 'unical',
            size: 12
          },
          callback: function(value) {
            return '$' + value;
          }
        }
      }
    }
  };

  return (
    <div className="h-[300px] w-full">
      <Line data={data} options={options} />
    </div>
  );
}
