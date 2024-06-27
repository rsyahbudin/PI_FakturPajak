import { useRoutes, Navigate } from "react-router-dom";
import Homepage from "../pages/Homepage";
import Admin from "../pages/admin";
import Page404 from "../pages/404";
import Dashboard from "../pages/dashboard";
import Timeline from "../pages/timeline";
import Konfirmasi from "../pages/Konfirmasi";
import TrackingPage from "../pages/tracking";
import ViewDetail from "../pages/viewDetail";
import Report from "../pages/report";
import Users from "../pages/users";


// Fungsi untuk memeriksa apakah pengguna sudah admin
const isAuthenticated = () => {
   // Implementasi logika autentikasi Anda di sini, contoh:
   return localStorage.getItem('infoUser') !== null;
 };
export default function Routes() {
   const element = useRoutes([
      { path: "/", element: <Homepage /> },
      { path: "/admin", element: <Admin /> },
      { path: "/dashboard", element: isAuthenticated() ? <Dashboard /> : <Navigate to="/admin" /> },
      { path: "/timeline", element: isAuthenticated() ? <Timeline /> : <Navigate to="/admin" /> },
      { path: "/konfirmasi", element: <Konfirmasi /> },
      { path: "/track", element: <TrackingPage /> },
      { path: "/report", element: isAuthenticated() ? <Report /> : <Navigate to="/admin" /> },
      { path: "/users", element: isAuthenticated() ? <Users /> : <Navigate to="/admin" /> },
      { path: "/view-details/:trxId", element: isAuthenticated() ? <ViewDetail /> : <Navigate to="/admin" /> },

      { path: "*", element: <Page404 /> },
   ]);
   return element;
}
