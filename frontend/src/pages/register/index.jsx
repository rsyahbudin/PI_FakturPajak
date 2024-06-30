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
  const [errorEmpid, setErrorEmpid] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Clear previous errors
    setErrorEmpid("");
    setErrorPassword("");
    setErrorEmail("");
    setError("");

    // Check if any field is empty
    if (!empid) {
      setErrorEmpid("EMPID is required");
      return;
    }

    if (!password) {
      setErrorPassword("Password is required");
      return;
    }

    if (!email) {
      setErrorEmail("Email is required");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://pi-faktur-pajak-qylf.vercel.app//api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empid, password, email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully");
        // Redirect to login page or any other page
        navigate("/admin")
      } else {
        const data = await response.json();
        alert(data.message); // Handle error message from backend
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
              onChange={(e) => {
                setEmpid(e.target.value);
                setErrorEmpid(""); // Clear error on change
              }}
              required
            />
            {errorEmpid && (
              <p className="text-red-500 text-sm mb-2">{errorEmpid}</p>
            )}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorPassword(""); // Clear error on change
              }}
              required
            />
            {errorPassword && (
              <p className="text-red-500 text-sm mb-2">{errorPassword}</p>
            )}
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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorEmail(""); // Clear error on change
              }}
              required
            />
            {errorEmail && (
              <p className="text-red-500 text-sm mb-2">{errorEmail}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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
