import React from "react";
import { Link } from "react-router-dom";
import ICONS from "../../assets/404.svg";

export default function Page404() {
   return (
      <div className="flex flex-col w-full h-full justify-center items-center mt-16">
         <img src={ICONS} alt="error-icon" className="w-1/2 md:w-1/4 mb-16" />
         <div className="flex flex-col gap-2 items-center mb-12 text-center">
            <h2 className="font-semibold text-2xl md:text-4xl">
               Oops, This Page Not Found!
            </h2>
            <h4 className="font-light text-2xl md:text-3xl text-tersier">
               The link might be corrupted.
            </h4>
            <p className="font-medium text-sm md:text-md">
               or the page may have been removed.
            </p>
         </div>

         <Link to="/">
            <button className="border-solid border-2 border-primary p-2 px-3 rounded-md hover:bg-primary hover:text-white transition-all font-semibold">
               Go Back Home
            </button>
         </Link>
      </div>
   );
}
