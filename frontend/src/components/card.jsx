import React, { useState, useEffect } from "react";
import axios from "axios";

export function StatusCard({ title, status }) {
   const [data, setData] = useState({
      total_transaksi: 0,
      total_faktur_waiting: 0,
      total_faktur_open: 0,
      total_faktur_process: 0,
      total_faktur_closed: 0,
   });
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get(
               "https://backend.transmart.co.id/api/status",
               {
                  headers: {
                     "Cache-Control": "no-cache",
                     Pragma: "no-cache",
                     Expires: 0,
                  },
               }
            );
            setData(response.data);
            setIsLoading(false);
         } catch (error) {
            console.error(error);
            setIsLoading(false);
         }
      };

      fetchData();
   }, []);

   return (
      <>
         {isLoading ? (
            <>Loading</>
         ) : (
            <>
               <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                  <div className="bg-[#9ca3af] rounded-xl py-6 px-6 text-white">
                     <h1>Total Transaksi</h1>
                     <p className="font-medium text-xl mt-2">
                        {data.total_transaksi}
                     </p>
                  </div>
                  <div className="bg-[#9ca3af] rounded-xl py-6 px-6 text-white">
                     <h1>Total Faktur Waiting Validate</h1>
                     <p className="font-medium text-xl mt-2">
                        {data.total_faktur_waiting}
                     </p>
                  </div>
                  <div className="bg-[#9ca3af] rounded-xl py-6 px-6 text-white">
                     <h1>Total Faktur Open</h1>
                     <p className="font-medium text-xl mt-2">
                        {data.total_faktur_open}
                     </p>
                  </div>
                  <div className="bg-[#9ca3af] rounded-xl py-6 px-6 text-white">
                     <h1>Total Faktur Process</h1>
                     <p className="font-medium text-xl mt-2">
                        {data.total_faktur_process}
                     </p>
                  </div>
                  <div className="bg-[#9ca3af] rounded-xl py-6 px-6 text-white">
                     <h1>Total Faktur Closed</h1>
                     <p className="font-medium text-xl mt-2">
                        {data.total_faktur_closed}
                     </p>
                  </div>
               </div>
            </>
         )}
      </>
   );
}
