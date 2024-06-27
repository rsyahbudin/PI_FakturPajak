// timelineCard.js
import React, { useState } from "react";
import { ArrowForwardIos, BorderColorOutlined } from "@mui/icons-material";
import CustomModal from "../Modal"; // Import the CustomModal component

function timelineCard({ transaction }) {
   let statusColor;
   switch (transaction.status) {
      case "Sudah Dibuat":
         statusColor = "text-green-600"; // Green for "Sudah Dibuat"
         break;
      case "Belum Dibuka":
         statusColor = "text-orange-600"; // orange for "Belum Dibuka"
         break;
      default:
         statusColor = "text-red-600"; // Default color if status is not recognized
   }

   let buttonText;
   if (transaction.status === "Sudah Dibuat") {
      buttonText = "Close";
   } else {
      buttonText = "Open";
   }

   // State to manage the modal's visibility
   const [isOpen, setIsOpen] = useState(false);

   // Function to handle the icon click and open the modal
   const handleOpen = () => setIsOpen(true);

   // Function to handle the modal close
   const handleClose = () => setIsOpen(false);

   return (
      <div className="max-w-sm mx-auto bg-slate-900 border border-black rounded-xl shadow-lg overflow-hidden md:max-w-2xl m-4 relative">
         <div className="p-8">
            {/* Wrap the icon with a click handler */}
            <BorderColorOutlined fontSize="small" className="mr-2" />
            <span className={`text-sm ${statusColor}`}>
               {transaction.status}
            </span>
            <div className="flex justify-between items-center mt-1">
               <div className="uppercase tracking-wide text-md text-slate-500 font-semibold mr-4">
                  ID Transaksi: {transaction.id}
               </div>
               <ArrowForwardIos
                  fontSize="small"
                  className="cursor-pointer"
                  onClick={handleOpen}
               />
            </div>
            <p className="mt-2 text-gray-500 text-sm">
               Tanggal: {transaction.date}
            </p>
            <div className="mt-2 mx-auto">
               <button className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  {buttonText}
               </button>
            </div>
         </div>
         {/* Use the CustomModal component */}
         {/* {transactions.map((transaction) => (
            <CustomModal
               isOpen={isOpen}
               onClose={handleClose}
               key={transaction.id}
               transaction={transaction}
            />
         ))} */}
         <CustomModal isOpen={isOpen} onClose={handleClose} transactionId={transaction.id}/>
      </div>
   );
}

export default timelineCard;
