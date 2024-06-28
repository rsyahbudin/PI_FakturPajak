import React, { useState } from "react";

const Register = () => {
  const [empid, setEmpid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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
        body: JSON.stringify({ empid, password, role, email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data); // Debugging line
        alert("User registered successfully");
        // Redirect to login page or any other page
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Username (EMPID)</label>
          <input
            type="text"
            placeholder="Username"
            value={empid}
            onChange={(e) => setEmpid(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            type="text"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } focus:outline-none`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;
