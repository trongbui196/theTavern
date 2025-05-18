import { useState } from 'react';

const TrxHistory = () => {
    const [transactions, setTransactions] = useState([
        { date: '2025-05-15', description: 'Income from Sales', amount: 5000000, type: 'income' },
        { date: '2025-05-14', description: 'Office Supplies', amount: -150000, type: 'expense' },
        { date: '2025-05-13', description: 'Client Payment', amount: 3000000, type: 'income' },
        { date: '2025-05-12', description: 'Utility Bill', amount: -200000, type: 'expense' },
        { date: '2025-05-11', description: 'Miscellaneous', amount: -50000, type: 'expense' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({ date: '', description: '', amount: 0, type: 'income' });
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const openModal = (index: number | null) => {
        if (index !== null) {
            setModalData(transactions[index]);
            setEditIndex(index);
        } else {
            setModalData({ date: new Date().toISOString().split('T')[0], description: '', amount: 0, type: 'income' });
            setEditIndex(null);
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = () => {
        if (editIndex !== null) {
            const updatedTransactions = [...transactions];
            updatedTransactions[editIndex] = modalData;
            setTransactions(updatedTransactions);
        } else {
            setTransactions([modalData, ...transactions]);
        }
        closeModal();
    };

    return (
        <div className="bg-[#4b2e2b] text-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medieval text-[#D97706]">Transaction History</h3>
                <button
                    className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#b56504]"
                    onClick={() => openModal(null)}
                >
                    Add Income
                </button>
            </div>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border-b border-[#D97706] p-2">Date</th>
                        <th className="border-b border-[#D97706] p-2">Description</th>
                        <th className="border-b border-[#D97706] p-2">Amount</th>
                        <th className="border-b border-[#D97706] p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((trx, index) => (
                        <tr key={index} className="hover:bg-[#D97706]/20">
                            <td className="p-2 border-b border-[#D97706]/50">{trx.date}</td>
                            <td className="p-2 border-b border-[#D97706]/50">{trx.description}</td>
                            <td className={`p-2 border-b border-[#D97706]/50 ${trx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                {trx.amount.toLocaleString()}
                            </td>
                            <td className="p-2 border-b border-[#D97706]/50">
                                <button
                                    className="bg-[#D97706] text-white px-2 py-1 rounded hover:bg-[#b56504]"
                                    onClick={() => openModal(index)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-[#4b2e2b] text-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-lg font-medieval text-[#D97706] mb-4">{editIndex !== null ? 'Edit Transaction' : 'Add Transaction'}</h3>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Date</label>
                            <input
                                type="date"
                                className="w-full p-2 rounded bg-[#D97706]/20 text-white"
                                value={modalData.date}
                                onChange={(e) => setModalData({ ...modalData, date: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Description</label>
                            <input
                                type="text"
                                className="w-full p-2 rounded bg-[#D97706]/20 text-white"
                                value={modalData.description}
                                onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Amount</label>
                            <input
                                type="number"
                                className="w-full p-2 rounded bg-[#D97706]/20 text-white"
                                value={modalData.amount}
                                onChange={(e) => setModalData({ ...modalData, amount: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm mb-1">Type</label>
                            <select
                                className="w-full p-2 rounded bg-[#D97706]/20 text-white"
                                value={modalData.type}
                                onChange={(e) => setModalData({ ...modalData, type: e.target.value })}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-[#D97706] text-white px-4 py-2 rounded hover:bg-[#b56504]"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrxHistory;