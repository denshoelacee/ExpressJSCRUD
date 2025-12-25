import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import {login} from "../api/auth";
import PrimaryButton from "../components/PrimaryButton";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(form.email, form.password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white ">
      
      <img src={logo} alt="Logo" className="w-20 h-20 m-4" />

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Log in to your Account</h1>
        <h5 className="text-gray-300">
          Please log in using the form below.
        </h5>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-md p-8  text-white rounded-lg shadow-lg"
      >
        {error && (
          <p className="text-red-600 text-center font-medium" role="alert">
            {error}
          </p>
        )}
        <div className="w-full flex flex-col">
          <label className="mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#561C24]"
          />
        </div>

        <div className="w-full flex flex-col">
          <label className="mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#561C24]"
          />
        </div>
        <PrimaryButton disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </PrimaryButton>
      </form>
      <p>Dont have an account?
        <a className="text-[#AB9B80] hover:underline"  href="/register"> Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
