import { useContext, useState, useEffect } from "react";

import {
  HomeIcon,
  PowerIcon,
  DocumentTextIcon,
  UsersIcon,
  DocumentArrowDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

export default function ListMenu({ sidebar }) {
  const { pathname } = useLocation();
  const [active, setActive] = useState(false);
  const [groupName, setGroupName] = useState("");

  const { expanded } = useContext(sidebar);

  useEffect(() => {
    // Ambil groupName dari localStorage
    const storedGroupName = localStorage.getItem("userGroup");
    setGroupName(storedGroupName);
  }, []);

  const handleLogout = (link) => {
    if (link === "/admin") {
      // Reset localStorage when logging out only if Sign Out is clicked
      localStorage.removeItem("infoUser");
      localStorage.removeItem("userGroup");
      req.session.destroy();
      // Additional logic for actual logout process like redirecting user to login page, etc.
    }
  };

  return (
    <div>
      {list.map(
        (item, index) =>
          // Periksa apakah item "Report" atau "Users" harus ditampilkan atau disembunyikan berdasarkan nilai groupName
          (item.title !== "Report" || groupName !== "1") &&
          (item.title !== "Users" || groupName === "3") && (
            <Link to={item.link} key={index}>
              <li
                className={`relative flex items-center justify-center py-2 px-3 my-4
                  font-medium rounded-md cursor-pointer transition-colors group
                  ${
                    active || pathname === item.link
                      ? "bg-secondary text-white"
                      : "hover:bg-secondary text-white"
                  }`}
                onClick={() => handleLogout(item.link)}
              >
                {iconList(item.icon)}
                <span
                  className={`overflow-hidden transition-all truncate text-white font-medium ${
                    expanded ? "w-56 ml-3" : "w-0"
                  }`}
                >
                  {item.title}
                </span>

                {!expanded && (
                  <div
                    className={`absolute left-full rounded-md px-2 py-1 ml-6 w-max
                        bg-secondary text-white text-sm
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 group-hover:z-10`}
                  >
                    {item.title}
                  </div>
                )}
              </li>
            </Link>
          )
      )}
    </div>
  );
}

const list = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
  },
  {
    title: "Timeline",
    icon: "timeline",
    link: "/timeline",
  },
  // {
  //   title: "Report",
  //   icon: "report",
  //   link: "/report",
  // },
  // {
  //   title: "Users",
  //   icon: "users",
  //   link: "/users",
  // },
  {
    title: "Sign Out",
    icon: "logout",
    link: "/admin",
  },
];

const iconList = (e) => {
  return (
    <>
      {e == "dashboard" && <HomeIcon className="h-6 w-6 text-white" />}
      {e == "users" && <UsersIcon className="h-6 w-6 text-white" />}
      {e == "timeline" && <ClockIcon className="h-6 w-6 text-white" />}
      {e == "report" && (
        <DocumentArrowDownIcon className="h-6 w-6 text-white" />
      )}
      {e == "logout" && <PowerIcon className="h-6 w-6 text-white" />}
    </>
  );
};
