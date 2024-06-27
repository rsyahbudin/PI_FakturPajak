import { useState, createContext } from "react";
const SidebarContext = createContext();

import ListMenu from "./ListMenu";

import { Bars2Icon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className={`h-screen transition-all ${
        expanded ? "w-64" : "w-20"
      } bg-primary`}
    >
      <nav className="h-full flex flex-col bg-primary shadow-sm pb-6">
        <div
          className={`p-6 pb-2 flex items-center mb-6 ${
            expanded ? "justify-between" : "justify-center"
          }`}
        >
          <h1
            className={`overflow-hidden transition-all text-white text-xl font-semibold ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            DASHBOARD
          </h1>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="transition-all"
          >
            {expanded ? (
              <Bars2Icon className="h-6 w-6 text-white" />
            ) : (
              <Bars2Icon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <ListMenu sidebar={SidebarContext} />
          </ul>
        </SidebarContext.Provider>

        {/* <div className="flex px-3">
          <div className="min-w-[2.5rem] h-10 rounded-md bg-white"></div>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-56 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-white">Admin User</h4>
              <span className="text-xs text-gray-600">admin@gmail.com</span>
            </div>
          </div>
        </div> */}
      </nav>
    </aside>
  );
}
