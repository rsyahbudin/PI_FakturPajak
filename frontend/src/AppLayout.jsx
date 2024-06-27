import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router"; // Ubah sesuai dengan lokasi file Routes Anda

export default function AppLayout() {
  return (
    <Router>
      <div className="relative">
        <Routes />
      </div>
    </Router>
  );
}