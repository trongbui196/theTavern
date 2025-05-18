import React from 'react';
import type { Asset } from '../../types/asset';

interface AssetsOverviewProps {
    assets: Asset[];
}

export default function AssetsOverview({ assets }: AssetsOverviewProps) {
    const calculateTotalValue = (assetList: Asset[]) => {
        return assetList.reduce((total, asset) => 
            total + (asset.amount * asset.currentPrice), 0);
    };

    const cryptoAssets = assets.filter(asset => asset.type === 'crypto');
    const mutualAssets = assets.filter(asset => asset.type === 'mutual');
    
    const totalCryptoValue = calculateTotalValue(cryptoAssets);
    const totalMutualValue = calculateTotalValue(mutualAssets);
    const totalValue = totalCryptoValue + totalMutualValue;

    const getPercentage = (value: number) => ((value / totalValue) * 100) || 0;

    return (
        <div className="bg-[#4b2e2b] rounded-lg border border-[#D97706]/30 p-6 h-full">
            <h2 className="text-[#D97706] font-medieval text-2xl mb-6">Assets Overview</h2>
            
            {/* Total Value */}
            <div className="mb-8">
                <h3 className="text-[#D97706]/80 font-medieval mb-2">Total Portfolio Value</h3>
                <div className="text-4xl font-medieval text-white">
                    ${totalValue.toLocaleString()}
                </div>
            </div>

            {/* Distribution Chart */}
            <div className="mb-8">
                <h3 className="text-[#D97706]/80 font-medieval mb-4">Asset Distribution</h3>
                <div className="h-4 bg-[#2D1B1A] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#D97706] transition-all duration-500"
                        style={{ width: `${getPercentage(totalCryptoValue)}%` }}
                    />
                </div>
                <div className="flex justify-between mt-2 text-sm">
                    <span className="text-[#D97706]">Crypto: {getPercentage(totalCryptoValue).toFixed(1)}%</span>
                    <span className="text-[#D97706]">Mutual: {getPercentage(totalMutualValue).toFixed(1)}%</span>
                </div>
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#2D1B1A] rounded-lg">
                    <h4 className="text-[#D97706] font-medieval mb-2">Crypto Assets</h4>
                    <div className="text-xl text-white font-medieval">
                        ${totalCryptoValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#D97706]/60 mt-1">
                        {cryptoAssets.length} assets
                    </div>
                </div>
                <div className="p-4 bg-[#2D1B1A] rounded-lg">
                    <h4 className="text-[#D97706] font-medieval mb-2">Mutual Funds</h4>
                    <div className="text-xl text-white font-medieval">
                        ${totalMutualValue.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#D97706]/60 mt-1">
                        {mutualAssets.length} funds
                    </div>
                </div>
            </div>
        </div>
    );
}
