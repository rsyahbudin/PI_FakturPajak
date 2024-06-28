import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const TrackingPage = () => {
  const [trxno, setTrxno] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [customerDetail, setCustomerDetail] = useState(null);
  const [posDetail, setPosDetail] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const trackStatus = async () => {
   setIsLoading(true);
    try {
      const response = await fetch(
        // `http://localhost:3001/api/track-status/${trxno}`
        `http://localhost:3001/api/track-status/${trxno}`
        // `https://10.21.9.234/api/track-status/${trxno}`
      );
      if (!response.ok) {
        throw new Error("ID Transaksi tidak ditemukan");
      }
      const responseData = await response.json();
      if (responseData.length > 0) {
        const formattedData = responseData.map((entry) => ({
          ...entry,
          TTH_UPDATE_DATE: new Date(entry.TTH_UPDATE_DATE).toLocaleString(),
        }));
        setData(formattedData);
        setError("");
        setIsTracking(true);
        setTrxno("");
      } else {
        setData([]);
        setError("ID Transaksi tidak ada");
      }
    } catch (err) {
      setData([]);
      setError(err.message || "An error occurred");
    }

    try {
      const customerResponse = await fetch(
        `http://localhost:3001/api/customer-detail/${trxno}`
      );
      if (!customerResponse.ok) {
        throw new Error("Gagal mengambil detail pelanggan");
      }
      const customerData = await customerResponse.json();
      setCustomerDetail(customerData);
    } catch (err) {
      setCustomerDetail(null);
      console.error("Error fetching customer detail:", err.message);
    }

    try {
      const posResponse = await fetch(
        `http://localhost:3001/api/pos-detail/${trxno}`
      );
      if (!posResponse.ok) {
        throw new Error("Gagal mengambil detail POS");
      }
      const posData = await posResponse.json();
      setPosDetail(posData);
    } catch (err) {
      setPosDetail(null);
      console.error("Error fetching POS detail:", err.message);
    }finally {
      setIsLoading(false);
   }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleGoToHomePage = () => {
    navigate("/");
  };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center">
         <div className="flex flex-col items-center space-y-4 mt-10">
            <img
               src={logo}
               alt="Logo"
               style={{
                  width: "250px",
                  height: "auto",
                  objectFit: "contain",
               }}
               className="mt-4"
            />
         </div>
         <div className="p-4 md:p-8 max-w-md w-full rounded-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">
               Tracking Status Faktur Pajak
            </h1>
            <div className="flex flex-col space-y-4">
               <input
                  type="text"
                  value={trxno}
                  onChange={(e) => setTrxno(e.target.value)}
                  className="border border-primary rounded-md p-2 focus:outline-none"
                  placeholder="ID Transaksi"
               />
               <button
                  onClick={trackStatus}
                  className="bg-primary text-white px-4 py-2 rounded-md focus:outline-none hover:bg-red-600"
               >
                  Track
               </button>
               {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="flex justify-center mt-4">
               <button
                  onClick={handleGoToHomePage}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-gray-800"
               >
                  Request Faktur Pajak
               </button>
            </div>
         </div>
         {isTracking && (
            <div className="flex flex-col mt-4 md:flex-row max-w-6xl w-full">
               <div className="p-4 md:pr-8 md:w-1/2">
                  <div className="bg-white rounded-lg shadow-md mb-4">
                     <h2 className="font-bold text-center mb-2">
                        Detail Request
                     </h2>
                     <table className="w-full">
                        <tbody>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 ID Transaksi
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_TRXNO}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 Sales Date
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {posDetail?.sales_date}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">Store</td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {posDetail?.store_name}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 Total Amount Paid
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {formatCurrency(posDetail?.total_amount_paid)}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">Nama</td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_NAMA}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">Email</td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_EMAIL}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 No. HP
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_NOHP}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">NPWP</td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_NPWP}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 Nama PT
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_NAMA_PT}
                              </td>
                           </tr>
                           <tr>
                              <td className="px-4 py-2 font-semibold">
                                 Alamat PT
                              </td>
                              <td className="px-1">:</td>
                              <td className="px-4 py-2">
                                 {customerDetail?.TT_ALAMAT_PT}
                              </td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
               <div className="p-2 md:pl-8 md:w-1/2">
                  <div className="bg-white rounded-lg shadow-md">
                     <h2 className="font-bold text-center mb-2">
                        Tracking History
                     </h2>
                     <table className="w-full">
                        <thead>
                           <tr className="bg-primary text-white border border-red">
                              <th className="px-4 py-2">Time</th>
                              <th className="px-4 py-2">Status</th>
                              <th className="px-4 py-2">Remarks</th>
                           </tr>
                        </thead>
                        <tbody>
                           {data.map((entry, index) => (
                              <tr
                                 key={index}
                                 className={
                                    index % 2 === 0 ? "" : "bg-gray-100"
                                 }
                              >
                                 <td className="px-4 py-2 border">
                                    {entry.formatted_update_date}
                                 </td>
                                 <td className="px-4 py-2 border">
                                    <span
                                       className={`inline-block w-max ${
                                          entry.TTH_STATUS === "O"
                                             ? "bg-green-500"
                                             : entry.TTH_STATUS === "C"
                                             ? "bg-red-500"
                                             : entry.TTH_STATUS === "P"
                                             ? "bg-yellow-800"
                                             : "bg-orange-800"
                                       } text-white px-2 py-1 rounded-full text-sm`}
                                    >
                                       {entry.ms_name}
                                    </span>
                                 </td>
                                 <td className="px-4 py-2 border">
                                    {entry.TTH_REMARKS}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default TrackingPage;
