import React, { useState } from 'react';
import type { Asset } from '../../types/asset';

interface StashTableProps {
    assets: Asset[];
}

export default function StashTable({ assets }: StashTableProps) {
    const [activeTab, setActiveTab] = useState<'crypto' | 'mutual'>('crypto');
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const toggleRow = (id: string) => {
        const newExpandedRows = new Set(expandedRows);
        if (expandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

    const calculateValue = (amount: number, price: number) => amount * price;
    const calculateProfit = (amount: number, currentPrice: number, avgPrice: number) => {
        const profit = amount * (currentPrice - avgPrice);
        const percentage = ((currentPrice - avgPrice) / avgPrice) * 100;
        return { profit, percentage };
    };

    const filteredAssets = assets.filter(asset => asset.type === activeTab);

    return (
        <div className="bg-[#4b2e2b] rounded-lg border border-[#D97706]/30 overflow-hidden">
            {/* Tab Switcher */}
            <div className="flex border-b border-[#D97706]/30">
                <button 
                    onClick={() => setActiveTab('crypto')}
                    className={`flex-1 px-6 py-3 font-medieval text-lg
                        ${activeTab === 'crypto' 
                            ? 'bg-[#D97706] text-white' 
                            : 'text-[#D97706] hover:bg-[#D97706]/10'} 
                        transition-colors`}
                >
                    Crypto Assets
                </button>
                <button 
                    onClick={() => setActiveTab('mutual')}
                    className={`flex-1 px-6 py-3 font-medieval text-lg
                        ${activeTab === 'mutual' 
                            ? 'bg-[#D97706] text-white' 
                            : 'text-[#D97706] hover:bg-[#D97706]/10'} 
                        transition-colors`}
                >
                    Mutual Funds
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#4b2e2b]/80 border-b border-[#D97706]/30">
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
                        {filteredAssets.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-[#D97706]/60 font-medieval">
                                    No {activeTab === 'crypto' ? 'crypto assets' : 'mutual funds'} found.
                                </td>
                            </tr>
                        ) : (
                            filteredAssets.map((asset) => (
                                <React.Fragment key={asset.id}>
                                    <tr 
                                        onClick={() => toggleRow(asset.id)}
                                        className="border-b border-[#D97706]/10 hover:bg-[#4b2e2b]/90 cursor-pointer"
                                    >
                                        <td className="p-4 flex items-center gap-2">
                                            <span className="text-[#D97706] transition-transform duration-200" 
                                                  style={{ transform: expandedRows.has(asset.id) ? 'rotate(90deg)' : 'none' }}>
                                                ▶
                                            </span>
                                            <span className="font-medieval">{asset.name} ({asset.symbol})</span>
                                        </td>
                                        <td className="p-4 font-medieval">{asset.amount} {asset.symbol}</td>
                                        <td className="p-4 font-medieval">${asset.avgPrice.toLocaleString()}</td>
                                        <td className="p-4 font-medieval">${asset.currentPrice.toLocaleString()}</td>
                                        <td className="p-4 font-medieval">
                                            ${calculateValue(asset.amount, asset.currentPrice).toLocaleString()}
                                        </td>
                                        <td className={`p-4 font-medieval ${
                                            calculateProfit(asset.amount, asset.currentPrice, asset.avgPrice).profit >= 0 
                                            ? 'text-green-500' 
                                            : 'text-red-500'
                                        }`}>
                                            {calculateProfit(asset.amount, asset.currentPrice, asset.avgPrice).profit >= 0 ? '↑' : '↓'}
                                            ${Math.abs(calculateProfit(asset.amount, asset.currentPrice, asset.avgPrice).profit).toLocaleString()} 
                                            ({calculateProfit(asset.amount, asset.currentPrice, asset.avgPrice).percentage.toFixed(1)}%)
                                        </td>
                                    </tr>
                                    {expandedRows.has(asset.id) && (
                                        <tr>
                                            <td colSpan={6} className="p-0">
                                                <div className="bg-[#4b2e2b]/80 p-4">
                                                    <h4 className="text-[#D97706] font-medieval mb-3">Holdings Distribution</h4>
                                                    <div className="space-y-2">
                                                        {asset.holdings.map((holding, idx) => (
                                                            <div key={`${asset.id}-${idx}`} 
                                                                className="flex justify-between items-center p-2 border-b border-[#D97706]/10">
                                                                <div className="font-medieval text-[#D97706]/80">{holding.location}</div>
                                                                <div className="flex items-center gap-4">
                                                                    <span className="font-medieval">{holding.amount} {asset.symbol}</span>
                                                                    {holding.note && (
                                                                        <span className="text-[#D97706]/60 text-sm italic">
                                                                            Note: {holding.note}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
