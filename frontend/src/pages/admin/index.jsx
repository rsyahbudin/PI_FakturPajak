import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const LoginCard = () => {
   const navigate = useNavigate();
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

  const validateLogin = async () => {
  setLoading(true);
  try {
    // Sending login request
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Response data:", data); // Debugging line
      localStorage.setItem("infoUser", data[0].employeeID);
      
      if (data.length > 0) {
        // Sending check group request
        const groupResponse = await fetch("http://localhost:3001/api/checkgroup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (groupResponse.ok) {
          const { groupName } = await groupResponse.json();
          localStorage.setItem("userGroup", groupName);
          
          if (groupName === 1) {
            alert(`Welcome ${username} as a Staff`);
          } else if (groupName === 2) {
            alert(`Welcome ${username} as a Manager`);
          } else if (groupName === 3) {
            alert(`Welcome ${username} as a Super Admin`);
          }
          navigate("/dashboard");
        } else {
          alert("EMPID belum ada role!");
        }
      } else {
        alert("Invalid credentials!");
      }
    } else {
      alert("Invalid credentials!");
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("Username atau Password salah.");
  } finally {
    setLoading(false);
  }
};


   return (
      <>
         {loading && (
            <CircularProgress
               color="success"
               className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            />
         )}
         <div
            className={`flex flex-col items-center justify-center min-h-screen ${
               loading ? "opacity-50 pointer-events-none" : ""
            }`}
         >
            <div className="mb-6">
               <img src={logo} alt="Logo" className="mx-auto h-12 w-auto" />
            </div>
            <div className="w-full max-w-md bg-red-900 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col">
               <div className="mb-6 text-center">
                  <h2 className="text-center text-3xl font-bold text-white">
                     Tax Login
                  </h2>
               </div>
               <div className="mb-4">
                  <label
                     className="block text-white text-sm font-bold mb-2"
                     htmlFor="EMPID"
                  >
                     EMPID
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-dark leading-tight focus:outline-none focus:shadow-outline"
                     id="EMPID"
                     type="text"
                     placeholder="EMPID"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
               </div>
               <div className="mb-6">
                  <label
                     className="block text-white text-sm font-bold mb-2"
                     htmlFor="PASS"
                  >
                     Password
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
                     id="PASS"
                     type="password"
                     placeholder="PASS"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />
               </div>
               <div className="flex items-center justify-center">
                  <button
                     className="bg-white hover:bg-gray-400 text-primary font-bold rounded-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="button"
                     onClick={validateLogin}
                     disabled={loading}
                  >
                     Sign In
                  </button>
               </div>
            </div>
         </div>
      </>
   );
};

export default LoginCard;
