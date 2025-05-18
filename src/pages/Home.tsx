import { useState } from "react";
import Navbar from "../components/common/Navbar";
import Chart from "../components/dashboard/chart";
import PerformanceHistory from "../components/dashboard//perfhis";
import FinanceSummary from "../components/dashboard/FinanceSummary";
import FinanceChart from "../components/dashboard/FinanceChart";
import FinanceFlow from "../components/dashboard/FinanceFlow";
export default function Home() {
  const [activeTable, setActiveTable] = useState('assets');

  return (
    <div className="min-h-screen bg-[#4B2E2B]/35">
     
      <div className="container mx-auto px-4 py-8">
        {/* USDT/VND Price Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[#D97706] font-medieval">Currency convert:</span>
            <input
              className="bg-[#4B2E2B] text-white px-3 py-1 rounded border border-[#D97706]/30 w-32 focus:outline-none focus:border-[#D97706]"
              placeholder="24,500"
            />
          </div>
          <button 
            className="bg-[#4B2E2B] text-[#D97706] px-4 py-1 rounded border border-[#D97706]/30 
                     hover:bg-[#D97706]/10 transition-colors duration-200 flex items-center gap-2 font-medieval"
          >
            <span>Update price</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Portfolio Card */}
          <div className="bg-[#4B2E2B] p-6 rounded-lg border border-[#D97706]/30 shadow-lg">
            <h3 className="text-[#D97706] font-medieval text-lg mb-2">Total Portfolio Value</h3>
            <div className="text-2xl font-bold font-medieval text-white mb-2">$12,450.38</div>
            <div className="text-green-500 font-medieval">↑ +$342.65 (2.8%)</div>
          </div>

          {/* Crypto Assets Card */}
          <div className="bg-[#4B2E2B] p-6 rounded-lg border border-[#D97706]/30 shadow-lg">
            <h3 className="text-[#D97706] font-medieval text-lg mb-2">Crypto Assets</h3>
            <div className="text-2xl font-bold font-medieval text-white mb-2">$8,723.15</div>
            <div className="text-green-500 font-medieval">↑ +$298.32 (3.5%)</div>
          </div>

          {/* Mutual Funds Card */}
          <div className="bg-[#4B2E2B] p-6 rounded-lg border border-[#D97706]/30 shadow-lg">
            <h3 className="text-[#D97706] font-medieval text-lg mb-2">Mutual Funds</h3>
            <div className="text-2xl font-bold font-medieval text-white mb-2">$3,727.23</div>
            <div className="text-red-500 font-medieval">↓ -$44.33 (1.2%)</div>
          </div>        
        </div>        

        {/* Asset Table Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex">
            <button 
              className={`font-medieval px-4 py-2 rounded-l-lg border border-[#D97706]/30 ${activeTable === 'assets' ? 'bg-[#D97706] text-white' : 'bg-[#4B2E2B] text-[#D97706]'}`}
              onClick={() => setActiveTable('assets')}
            >
              Crypto Assets
            </button>
            <button 
              className={`px-4 py-2 font-medieval rounded-r-lg border border-[#D97706]/30 ${activeTable === 'mutualFunds' ? 'bg-[#D97706] text-white' : 'bg-[#4B2E2B] text-[#D97706]'}`}
              onClick={() => setActiveTable('mutualFunds')}
            >
              Mutual Funds
            </button>
          </div>
          
          <button 
            className="bg-[#4B2E2B] text-[#D97706] px-4 py-2 rounded border border-[#D97706]/30 
                       hover:bg-[#D97706]/10 transition-colors duration-200 flex items-center gap-2 font-medieval"
          >
            <span>Refresh</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#4B2E2B] rounded-lg border border-[#D97706]/30 shadow-lg">
          {activeTable === 'assets' ? (
            <table className="w-full text-left">
              <thead className="bg-[#4B2E2B] border-b border-[#D97706]/30">
                <tr>
                  <th className="p-4 text-[#D97706] font-medieval">Asset</th>
                  <th className="p-4 text-[#D97706] font-medieval">Amount</th>
                  <th className="p-4 text-[#D97706] font-medieval">Avg. Buy Price</th>
                  <th className="p-4 text-[#D97706] font-medieval">Current Price</th>
                  <th className="p-4 text-[#D97706] font-medieval">Value (USD)</th>
                  <th className="p-4 text-[#D97706] font-medieval">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {/* Crypto Assets Rows */}
                <tr className="border-b border-[#D97706]/10 hover:bg-[#D97706]/5">
                  <td className="p-4 flex items-center gap-2">
                    <span className="text-yellow-500 font-medieval">₿</span><text className="font-medieval">Bitcoin BTC</text> 
                  </td>
                  <td className="p-4 font-medieval">0.12 BTC</td>
                  <td className="p-4 font-medieval">$32,450</td>
                  <td className="p-4 font-medieval">$35,120</td>
                  <td className="p-4 font-medieval">$4,214.40</td>
                  <td className="p-4 font-medieval text-green-500">+$320.40 (8.2%)</td>
                </tr>
                <tr className="border-b border-[#D97706]/10 hover:bg-[#D97706]/5">
                  <td className="p-4 flex items-center gap-2">
                    <span className="text-purple-500">◎</span> Solana SOL
                  </td>
                  <td className="p-4">25 SOL</td>
                  <td className="p-4">$62</td>
                  <td className="p-4">$58</td>
                  <td className="p-4">$1,450.00</td>
                  <td className="p-4 text-red-500">-$100.00 (6.5%)</td>
                </tr>
                <tr className="border-b border-[#D97706]/10 hover:bg-[#D97706]/5">
                  <td className="p-4 flex items-center gap-2">
                    <span className="text-green-500">$</span> USD Tether USDT
                  </td>
                  <td className="p-4">178.75 USDT</td>
                  <td className="p-4">$1.00</td>
                  <td className="p-4">$1.00</td>
                  <td className="p-4">$178.75</td>
                  <td className="p-4 text-gray-400">$0.00 (0%)</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-[#4B2E2B] border-b border-[#D97706]/30">
                <tr>
                  <th className="p-4 text-[#D97706] font-medieval">Fund</th>
                  <th className="p-4 text-[#D97706] font-medieval">Units</th>
                  <th className="p-4 text-[#D97706] font-medieval">NAV</th>
                  <th className="p-4 text-[#D97706] font-medieval">Value (USD)</th>
                  <th className="p-4 text-[#D97706] font-medieval">Profit/Loss</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {/* Mutual Funds Rows */}
                <tr className="border-b border-[#D97706]/10 hover:bg-[#D97706]/5">
                  <td className="p-4">Fund A</td>
                  <td className="p-4">100</td>
                  <td className="p-4">$37.27</td>
                  <td className="p-4">$3,727.00</td>
                  <td className="p-4 text-red-500">-$44.33 (1.2%)</td>
                </tr>
                <tr className="border-b border-[#D97706]/10 hover:bg-[#D97706]/5">
                  <td className="p-4">Fund B</td>
                  <td className="p-4">50</td>
                  <td className="p-4">$50.00</td>
                  <td className="p-4">$2,500.00</td>
                  <td className="p-4 text-green-500">+$100.00 (4.2%)</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    {/* Asset Distribution Chart */}
    <div className="bg-[#4B2E2B] rounded-2xl border border-[#D97706]/30 shadow-lg shadow p-4">
      <h2 className="text-xl text-[#D97706] font-medieval mb-2">Asset Distribution</h2>
     <Chart />
    </div>

    {/* Performance History */}
    <div className="bg-[#4B2E2B] rounded-2xl border border-[#D97706]/30 shadow-lg shadow p-4">
      <h2 className="text-xl mb-8 text-[#D97706] font-medieval">Performance History</h2>
      {/* Replace this with your history component */}
      <PerformanceHistory />
    </div>
  </div>
  <FinanceSummary />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
    {/* Asset Distribution Chart */}
    <div className="bg-[#4B2E2B] rounded-2xl border border-[#D97706]/30 shadow-lg shadow p-4">
      <h2 className="text-xl text-[#D97706] font-medieval mb-2">Asset Distribution</h2>
     <FinanceChart/>
    </div>

    {/* Performance History */}
    <div className="bg-[#4B2E2B] rounded-2xl border border-[#D97706]/30 shadow-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-8">Performance History</h2>
      {/* Replace this with your history component */}
      <FinanceFlow />
    </div>
  </div>
      </div>
      
    </div>
  )
}
