import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  const navigate = useNavigate();
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ empid, password, email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data); // Debugging line
        alert("User registered successfully");
        navigate("/admin");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration.");
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
              Tax Register
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
              value={empid}
              onChange={(e) => setEmpid(e.target.value)}
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
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-white hover:bg-gray-400 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
              disabled={loading}
            >
              Register
            </button>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => navigate("/admin")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
