import React from "react";
import Sidebar from "../../components/sidebar";
import Table from "../../components/tableReq";

const Timeline = () => {
   return (
      <div className="flex">
         <Sidebar />
         <div className="flex-1 flex justify-center items-center">
            <Table />
         </div>
      </div>
   );
};

export default Timeline;
