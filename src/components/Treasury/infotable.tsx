import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const InfoTable = () => {
    const income = 25386000;
    const expenses = 24626500;
    const balance = income - expenses;

    const pieDataCrypto = {
        labels: ['Bitcoin', 'Ethereum', 'Ripple', 'Litecoin'],
        datasets: [
            {
                data: [40, 30, 20, 10],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const pieDataMutualFund = {
        labels: ['Fund A', 'Fund B', 'Fund C', 'Fund D'],
        datasets: [
            {
                data: [25, 25, 25, 25],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
        ],
    };

    const barData = {
        labels: ['January 2025', 'February 2025', 'March 2025', 'April 2025', 'May 2025'],
        datasets: [
            {
                label: 'Income',
                data: [20000000, 22000000, 24000000, 26000000, income],
                backgroundColor: '#4CAF50',
            },
            {
                label: 'Expenses',
                data: [18000000, 20000000, 22000000, 24000000, expenses],
                backgroundColor: '#F44336',
            },
        ],
    };

    const [activeCategory, setActiveCategory] = useState('crypto');

    return (
        <div className="grid grid-cols-12 gap-6">
            {/* First Column */}
            <div className="col-span-8">
                {/* Row 1: Summary Cards */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-medieval text-[#D97706]">Income</h3>
                        <p className="text-3xl font-bold text-green-500">{income.toLocaleString()}</p>
                        <p className="text-sm text-[#D97706]/80">May income</p>
                    </div>
                    <div className="bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-medieval text-[#D97706]">Expenses</h3>
                        <p className="text-3xl font-bold text-red-500">{expenses.toLocaleString()}</p>
                        <p className="text-sm text-[#D97706]/80">May expenses</p>
                    </div>
                    <div className="bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-medieval text-[#D97706]">Balance</h3>
                        <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {balance.toLocaleString()}
                        </p>
                        <p className="text-sm text-[#D97706]/80">May net balance</p>
                    </div>
                </div>

                {/* Row 2: Bar Chart */}
                <div className="mt-6 bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
                    <h3 className="text-lg font-medieval text-[#D97706] mb-4">Monthly Overview</h3>
                    <Bar data={barData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>
            </div>

            {/* Second Column */}
            <div className="col-span-4 bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medieval text-[#D97706]">Category Breakdown</h3>
                    <div>
                        <button
                            className={`px-3 py-1 rounded ${activeCategory === 'crypto' ? 'bg-[#D97706]' : 'bg-gray-600'}`}
                            onClick={() => setActiveCategory('crypto')}
                        >
                            Crypto
                        </button>
                        <button
                            className={`ml-2 px-3 py-1 rounded ${activeCategory === 'mutualFund' ? 'bg-[#D97706]' : 'bg-gray-600'}`}
                            onClick={() => setActiveCategory('mutualFund')}
                        >
                            Mutual Fund
                        </button>
                    </div>
                </div>
                {activeCategory === 'crypto' ? (
                    <Pie data={pieDataCrypto} />
                ) : (
                    <Pie data={pieDataMutualFund} />
                )}
            </div>
        </div>
    );
};

export default InfoTable;