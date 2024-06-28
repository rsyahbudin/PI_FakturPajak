import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/sidebar";

const ViewDetails = () => {
   const { trxId } = useParams();
   const [transaction, setTransaction] = useState(null);
   const [showPhoto, setShowPhoto] = useState(false);
   const [photoUrl, setPhotoUrl] = useState(null);
   const [showInvoice, setShowInvoice] = useState(false);
   const [invoiceUrl, setInvoiceUrl] = useState(null);
   const photoRef = useRef(null);

   useEffect(() => {
      const fetchTransaction = async () => {
         try {
            const transactionResponse = await axios.get(
               `http://localhost:3001/api/trx_tiket/${trxId}`
            );
            setTransaction(transactionResponse.data);
         } catch (error) {
            console.error("Failed to fetch data:", error);
         }
      };

      fetchTransaction();
   }, [trxId]);

   const togglePhoto = async (type) => {
      let photoField = "";
      if (type === "NPWP") {
         photoField = "foto_npwp";
      } else if (type === "Struk") {
         photoField = "foto_struk";
      }

      if (showPhoto) {
         setShowPhoto(false);
      } else {
         try {
            const photoResponse = await axios.get(
               `http://localhost:3001/api/trx_tiket/${trxId}/${photoField}`,
               {
                  responseType: "blob",
               }
            );

            const photoBlob = new Blob([photoResponse.data], {
               type: "image/jpeg",
            });
            const photoUrl = URL.createObjectURL(photoBlob);
            setPhotoUrl(photoUrl);
            setShowPhoto(true);
         } catch (error) {
            console.error("Failed to fetch photo:", error);
         }
      }
   };

   const toggleInvoice = async () => {
      if (showInvoice) {
         setShowInvoice(false);
      } else {
         try {
            const invoiceResponse = await axios.get(
               `http://localhost:3001/api/trx_tiket/${trxId}/file_faktur`,
               {
                  responseType: "blob",
               }
            );

            const invoiceBlob = new Blob([invoiceResponse.data], {
               type: "application/pdf",
            });
            const invoiceUrl = URL.createObjectURL(invoiceBlob);
            setInvoiceUrl(invoiceUrl);
            setShowInvoice(true);
         } catch (error) {
            console.error("Failed to fetch invoice:", error);
         }
      }
   };

   const handleClickOutside = (event) => {
      if (
         (photoRef.current && !photoRef.current.contains(event.target)) ||
         (showInvoice && !event.target.classList.contains("invoice-button"))
      ) {
         setShowPhoto(false);
         setShowInvoice(false);
      }
   };

   useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const formatCurrency = (amount) => {
      const formatter = new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
      });
      return formatter.format(amount);
   };

   const renderRemarks = () => {
      return transaction?.TT_REMARKS || "-";
   };

   return (
      <>
         <div className="flex">
            <Sidebar />

            <div className="flex flex-1 justify-center items-center ">
               <div className=" mx-auto rounded-lg ">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                     Transaction Details
                  </h2>
                  <div className="flex justify-between mb-4">
                     <div className="flex space-x-4">
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Transaction ID
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_TRXNO}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Store
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_STORE}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Sales Date
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_SALES_DATE}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Total Amount Paid
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                           {transaction ? formatCurrency(transaction.TT_TOTAL_AMOUNT_PAID) : '-'}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-between mb-4">
                     <div className="flex space-x-4">
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Name
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_NAMA}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              Email
                           </div>
                           <div className="text-gray-900 text-md font-semibold px-4 py-2 rounded">
                              {transaction?.TT_EMAIL}
                           </div>
                        </div>
                     </div>
                     <div className="w-64">
                        <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                           Phone Number
                        </div>
                        <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                           {transaction?.TT_NOHP}
                        </div>
                     </div>
                     <div className="w-64">
                        <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                           Status
                        </div>
                        <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                          
                        <span
    className={`inline-block text-xs font-semibold py-1 px-2 rounded-full ${
        transaction?.TT_STATUS === "O"
            ? "bg-green-500 text-white"
            : transaction?.TT_STATUS === "C"
            ? "bg-red-500 text-white"
            : transaction?.TT_STATUS === "P"
            ? "bg-yellow-800 text-white"
            : "bg-orange-800 text-white"
    }`}
>
    {transaction?.ms_name}
</span>

                        </div>
                     </div>
                  </div>
                  <div className="flex justify-between mb-4">
                     <div className="flex space-x-4">
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              NPWP
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_NPWP}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              PT Name
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_NAMA_PT}
                           </div>
                        </div>
                        <div className="w-64">
                           <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                              PT Address
                           </div>
                           <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                              {transaction?.TT_ALAMAT_PT}
                           </div>
                        </div>
                     </div>
                     <div className="w-64 ml-3">
                        <div className="bg-primary text-white text-sm font-medium px-4 py-2 rounded">
                           Remarks
                        </div>
                        <div className="text-gray-900 text-lg font-semibold px-4 py-2 rounded">
                           {renderRemarks()}
                        </div>
                     </div>
                  </div>

                  <div className="flex justify-between mb-4">
                     {/* Button group for NPWP and Struk */}
                     <div>
                        {/* Button to show NPWP photo */}
                        <button
                           onClick={() => togglePhoto("NPWP")}
                           className="inline-flex justify-start rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                        >
                           Show NPWP Photo
                        </button>

                        {/* Button to show Struk photo */}
                        <button
                           onClick={() => togglePhoto("Struk")}
                           className="inline-flex justify-start rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                        >
                           Show Struk Photo
                        </button>
                        {transaction?.TT_STATUS === "Closed" && (
                           <button
                              onClick={toggleInvoice}
                              className="invoice-button inline-flex justify-start rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-700 focus:outline-none sm:mt-0 sm:w-auto sm:text-sm"
                           >
                              Show Faktur
                           </button>
                        )}
                     </div>

                     {/* Back button */}
                     <div>
                        <button
                           type="button"
                           className="inline-flex justify-end rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-gray-500 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                           onClick={() => window.history.back()}
                        >
                           Back
                        </button>
                     </div>
                  </div>

                   {/* Menampilkan foto jika showPhoto adalah true */}
                   {showPhoto && photoUrl && (
                     <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
                        <div ref={photoRef} className="relative">
                        <img
                              src={photoUrl}
                              alt="Photo"
                              className="max-w-full max-h-full"
                              style={{
                                 maxWidth: "80%",
                                 maxHeight: "80%",
                                 position: "fixed",
                                 top: "50%",
                                 left: "50%",
                                 transform: "translate(-50%, -50%)",
                              }}
                           />
                        </div>
                     </div>
                  )}
                  {/* Menampilkan file faktur jika showInvoice adalah true */}
                  {showInvoice && invoiceUrl && (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div ref={photoRef} className="relative">
            <embed
                src={invoiceUrl}
                type="application/pdf"
                className="w-11/12 h-11/12" // Ubah ukuran sesuai kebutuhan
            />
        </div>
    </div>
)}

               </div>
            </div>
         </div>
      </>
   );
};

export default ViewDetails;
