import InfoTable from "../components/Treasury/infotable";
import TrxHistory from "../components/Treasury/trx";
 export default function Treasury() {
     return (
        <>
         <div className="container mx-auto px-4 py-8 space-y-8">
             <h1 className="text-2xl font-bold mb-4">Treasury Log</h1>
             <InfoTable /><TrxHistory/>
         </div>
         </>
     );
 }