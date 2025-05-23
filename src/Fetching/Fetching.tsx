import { supabase } from '../supabase/supabase';
import { useEffect, useState } from 'react';

interface BaseAssetData {
    id: string;
    name: string;
    symbol: string;
    cost: number;
    current_price: number;
    amount: number;
    current_value: number;
    change: number;
}

interface CryptoAssetData extends BaseAssetData {
    type: 'crypto';
    blockchain?: string;
    contract_address?: string;
}

interface MutualFundData extends BaseAssetData {
    type: 'mutual';
    fund_type?: string;
    expense_ratio?: number;
    inception_date?: string;
}

interface ChartData {
    labels: string[];
    weights: number[];
    totalValue: number;
    type: 'crypto' | 'mutual';
}

export async function fetchCryptoAssets(): Promise<CryptoAssetData[]> {
    try {
        const { data, error } = await supabase
            .from('crypto_assets')
            .select('*');
        
        if (error) throw error;
        return (data || []).map(asset => ({ ...asset, type: 'crypto' }));
    } catch (error) {
        console.error('Error fetching crypto assets:', error);
        return [];
    }
}

export async function fetchMutualFunds(): Promise<MutualFundData[]> {
    try {
        const { data, error } = await supabase
            .from('mutual_funds')
            .select('*');
        
        if (error) throw error;
        return (data || []).map(asset => ({ ...asset, type: 'mutual' }));
    } catch (error) {
        console.error('Error fetching mutual funds:', error);
        return [];
    }
}

export function calculateChartData(assets: (CryptoAssetData | MutualFundData)[]): ChartData {
    const totalCost = assets.reduce((sum, asset) => sum + asset.cost, 0);
    
    const labels = assets.map(asset => asset.symbol);
    const weights = assets.map(asset => asset.cost / totalCost);
    const totalValue = assets.reduce((sum, asset) => sum + asset.current_value, 0);
    const type = assets[0]?.type || 'crypto'; // Use the type of the first asset

    return {
        labels,
        weights,
        totalValue,
        type
    };
}

export async function getTotalPortfolioValue(): Promise<{
    cryptoTotal: number;
    mutualTotal: number;
    totalValue: number;
}> {
    try {
        const cryptoAssets = await fetchCryptoAssets();
        const mutualFunds = await fetchMutualFunds();

        const cryptoTotal = cryptoAssets.reduce((sum, asset) => 
            sum + asset.current_value, 0);
        
        const mutualTotal = mutualFunds.reduce((sum, asset) => 
            sum + asset.current_value, 0);

        return {
            cryptoTotal,
            mutualTotal,
            totalValue: cryptoTotal + mutualTotal
        };
    } catch (error) {
        console.error('Error calculating total portfolio value:', error);
        return {
            cryptoTotal: 0,
            mutualTotal: 0,
            totalValue: 0
        };
    }
}

// Example usage of the functions:
export async function getDataDashboard() {
    const cryptoAssets = await fetchCryptoAssets();
    const mutualFunds = await fetchMutualFunds();
    
    const cryptoChartData = calculateChartData(cryptoAssets);
    const mutualChartData = calculateChartData(mutualFunds);
    
    const portfolioValue = await getTotalPortfolioValue();

    return {
        cryptoAssets,
        mutualFunds,
        cryptoChartData,
        mutualChartData,
        portfolioValue
    };
}
