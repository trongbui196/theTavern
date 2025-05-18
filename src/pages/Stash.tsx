import { useState } from 'react';
import StashTable from "../components/stash/stashtable";
import StashManagement from "../components/stash/stashManagement";
import AssetsOverview from "../components/stash/AssetsOverview";
import type { Asset } from '../types/asset';

export default function Stash() {
    const [assets, setAssets] = useState<Asset[]>([]);

    const handleSaveAsset = (data: Partial<Asset>) => {
        if (data.id) {
            // Edit or Add More to existing asset
            setAssets(prev => prev.map(asset => {
                if (asset.id === data.id) {
                    return {
                        ...asset,
                        amount: asset.amount + (data.amount || 0),
                        holdings: [
                            ...asset.holdings,
                            ...(data.holdings || [])
                        ]
                    };
                }
                return asset;
            }));
        } else {
            // Add new asset
            const newAsset: Asset = {
                id: Date.now().toString(), // Simple ID generation
                name: data.name || '',
                symbol: data.symbol || '',
                type: data.type || 'crypto',
                amount: data.amount || 0,
                avgPrice: data.avgPrice || 0,
                currentPrice: data.currentPrice || 0,
                holdings: data.holdings || [],
                lastUpdated: new Date()
            };
            setAssets(prev => [...prev, newAsset]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 space-y-8">
            <div className="grid grid-cols-5 gap-8 mb-8">
                <div className="col-span-3">
                    <StashManagement onSave={handleSaveAsset} />
                </div>
                <div className="col-span-2">
                    <AssetsOverview assets={assets} />
                </div>
            </div>
            <StashTable assets={assets} />
        </div>
    );
}

