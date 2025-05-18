import React, { useState } from 'react';
import type { Asset } from '../../types/asset';

type ModalType = 'add' | 'addMore' | 'edit' | null;

interface StashManagementProps {
    onSave: (asset: Partial<Asset>) => void;
}

export default function StashManagement({ onSave }: StashManagementProps) {
    const [activeTab, setActiveTab] = useState<'crypto' | 'mutual'>('crypto');
    const [modalType, setModalType] = useState<ModalType>(null);
    const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        symbol: '',
        amount: '',
        avgPrice: '',
        currentPrice: '',
        location: '',
        note: ''
    });

    // Example data - replace with actual data from your backend
    const demoAssets: Asset[] = [
        {
            id: '1',
            type: 'crypto',
            name: 'Bitcoin',
            symbol: 'BTC',
            amount: 1.5,
            avgPrice: 30000,
            currentPrice: 35000,
            holdings: [
                { location: 'Binance', amount: 1, note: 'Hot wallet' },
                { location: 'Ledger', amount: 0.5, note: 'Cold storage' }
            ],
            lastUpdated: new Date()
        },
        {
            id: '2',
            type: 'mutual',
            name: 'Vanguard 500',
            symbol: 'VFIAX',
            amount: 10,
            avgPrice: 300,
            currentPrice: 320,
            holdings: [
                { location: 'Vanguard Account', amount: 10 }
            ],
            lastUpdated: new Date()
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenModal = (type: ModalType) => {
        setModalType(type);
        setSelectedAsset(null);
        setFormData({
            name: '',
            symbol: '',
            amount: '',
            avgPrice: '',
            currentPrice: '',
            location: '',
            note: ''
        });
    };

    const handleCloseModal = () => {
        setModalType(null);
        setSelectedAsset(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const submitData: Partial<Asset> = {
            type: activeTab,
            ...(modalType === 'add' ? {
                name: formData.name,
                symbol: formData.symbol,
                avgPrice: parseFloat(formData.avgPrice),
                currentPrice: parseFloat(formData.currentPrice),
            } : {}),
            ...(selectedAsset?.id ? { id: selectedAsset.id } : {}),
            amount: parseFloat(formData.amount),
            holdings: [{
                location: formData.location,
                amount: parseFloat(formData.amount),
                ...(formData.note ? { note: formData.note } : {})
            }]
        };

        onSave(submitData);
        handleCloseModal();
    };

    const filteredAssets = demoAssets.filter(asset => asset.type === activeTab);

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Tab Switcher */}
            <div className="flex mb-6">
                <button 
                    onClick={() => setActiveTab('crypto')}                    className={`flex-1 px-6 py-3 font-medieval text-lg border-[#D97706]/30
                        ${activeTab === 'crypto' 
                            ? 'bg-[#D97706] text-white border-r' 
                            : 'bg-[#4b2e2b] text-[#D97706] hover:bg-[#D97706]/10'} 
                        rounded-l-lg transition-colors`}
                >
                    Crypto Assets
                </button>
                <button 
                    onClick={() => setActiveTab('mutual')}                    className={`flex-1 px-6 py-3 font-medieval text-lg border-[#D97706]/30
                        ${activeTab === 'mutual' 
                            ? 'bg-[#D97706] text-white border-l' 
                            : 'bg-[#4b2e2b] text-[#D97706] hover:bg-[#D97706]/10'} 
                        rounded-r-lg transition-colors`}
                >
                    Mutual Funds
                </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                    onClick={() => handleOpenModal('add')}
                    className="p-4 bg-[#4b2e2b] text-[#D97706] border border-[#D97706]/30 rounded-lg font-medieval
                        hover:bg-[#D97706]/10 transition-colors min-h-[120px] flex flex-col items-center justify-center"
                >
                    <span className="text-3xl mb-2">+</span>
                    <span>Add New {activeTab === 'crypto' ? 'Crypto' : 'Fund'}</span>
                </button>
                <button
                    onClick={() => handleOpenModal('addMore')}
                    className="p-4 bg-[#4b2e2b] text-[#D97706] border border-[#D97706]/30 rounded-lg font-medieval
                        hover:bg-[#D97706]/10 transition-colors min-h-[120px] flex flex-col items-center justify-center"
                >
                    <span className="text-3xl mb-2">↗</span>
                    <span>Add More to Existing</span>
                </button>
                <button
                    onClick={() => handleOpenModal('edit')}
                    className="p-4 bg-[#4b2e2b] text-[#D97706] border border-[#D97706]/30 rounded-lg font-medieval
                        hover:bg-[#D97706]/10 transition-colors min-h-[120px] flex flex-col items-center justify-center"
                >
                    <span className="text-3xl mb-2">✎</span>
                    <span>Edit Existing</span>
                </button>
            </div>

            {/* Modal */}
            {modalType && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#4b2e2b] p-6 rounded-lg border border-[#D97706]/30 w-full max-w-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-[#D97706] font-medieval text-2xl">
                                {modalType === 'add' && `Add New ${activeTab === 'crypto' ? 'Crypto' : 'Fund'}`}
                                {modalType === 'addMore' && 'Add More to Existing'}
                                {modalType === 'edit' && 'Edit Existing'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="text-[#D97706] hover:text-[#D97706]/80"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Asset Selection for Edit and Add More */}
                            {(modalType === 'addMore' || modalType === 'edit') && (
                                <div className="mb-4">
                                    <label className="block text-[#D97706] font-medieval mb-2">
                                        Select {activeTab === 'crypto' ? 'Crypto' : 'Fund'}
                                    </label>
                                    <select
                                        className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                        value={selectedAsset?.id || ''}
                                        onChange={(e) => {
                                            const asset = filteredAssets.find(a => a.id === e.target.value);
                                            if (asset) {
                                                setSelectedAsset(asset);
                                                setFormData({
                                                    name: asset.name,
                                                    symbol: asset.symbol,
                                                    amount: '',
                                                    avgPrice: asset.avgPrice.toString(),
                                                    currentPrice: asset.currentPrice.toString(),
                                                    location: '',
                                                    note: ''
                                                });
                                            }
                                        }}
                                    >
                                        <option value="">Select an asset...</option>
                                        {filteredAssets.map(asset => (
                                            <option key={asset.id} value={asset.id}>
                                                {asset.name} ({asset.symbol})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Form Fields */}
                            {(modalType === 'add' || selectedAsset) && (
                                <>
                                    {modalType === 'add' && (
                                        <>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[#D97706] font-medieval mb-2">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                                        placeholder="Asset name"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[#D97706] font-medieval mb-2">Symbol</label>
                                                    <input
                                                        type="text"
                                                        name="symbol"
                                                        value={formData.symbol}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                                        placeholder="e.g., BTC"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[#D97706] font-medieval mb-2">Buy Price</label>
                                                    <input
                                                        type="number"
                                                        name="avgPrice"
                                                        value={formData.avgPrice}
                                                        onChange={handleInputChange}
                                                        step="any"
                                                        className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                                        placeholder="Price per unit"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-[#D97706] font-medieval mb-2">Current Price</label>
                                                    <input
                                                        type="number"
                                                        name="currentPrice"
                                                        value={formData.currentPrice}
                                                        onChange={handleInputChange}
                                                        step="any"
                                                        className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                                        placeholder="Current price"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-[#D97706] font-medieval mb-2">Amount</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                            step="any"
                                            className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                            placeholder="Amount"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#D97706] font-medieval mb-2">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                            placeholder="e.g., Binance, Cold Wallet"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#D97706] font-medieval mb-2">Notes (Optional)</label>
                                        <textarea
                                            name="note"
                                            value={formData.note}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#4B2E2B] text-white border border-[#D97706]/30 rounded p-2"
                                            rows={3}
                                            placeholder="Additional information..."
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={handleCloseModal}
                                            className="px-4 py-2 bg-[#4b2e2b] text-[#D97706] border border-[#D97706]/30 
                                                rounded font-medieval hover:bg-[#D97706]/10 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-[#D97706] text-white rounded font-medieval
                                                hover:bg-[#D97706]/90 transition-colors"
                                        >
                                            {modalType === 'edit' ? 'Save Changes' : 'Add Asset'}
                                        </button>
                                    </div>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}