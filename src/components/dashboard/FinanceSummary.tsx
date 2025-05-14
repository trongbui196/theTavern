export default function FinanceSummary() {
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
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
    </>
  );
}