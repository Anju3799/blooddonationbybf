import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/donor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ SAVE TOKEN
        localStorage.setItem("token", data.token);

        // ✅ SAVE DONOR DETAILS (THIS WAS MISSING)
        localStorage.setItem("donor", JSON.stringify(data.donor));

        alert(`Welcome back, ${data.donor.name}!`);

        navigate("/donor-dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🩸</div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">
                Donor Login
              </h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="example@gmail.com"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                  onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 disabled:bg-gray-400"
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="text-red-600 font-semibold hover:underline"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
