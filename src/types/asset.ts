export interface Holding {
    location: string;
    amount: number;
    note?: string;
}

export interface Asset {
    id: string;
    type: 'crypto' | 'mutual';
    name: string;
    symbol: string;
    amount: number;
    avgPrice: number;
    currentPrice: number;
    holdings: Holding[];
    lastUpdated: Date;
}