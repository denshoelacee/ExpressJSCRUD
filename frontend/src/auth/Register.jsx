import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import logo from "../assets/images/logo.png";
import PrimaryButton from '../components/PrimaryButton';
import { register } from '../api/auth';
function Register() {
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState(""); 
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        try {
            const data = await register(form);
            setMessage(data.message);
            setForm({ first_name: "", last_name: "", email: "", password: "" });

        } catch (error) {
            const errMsg =
                error.response?.data?.message ||
                error.message ||
                "An error occurred during registration.";
            setMessage(errMsg);
        } finally {
            setLoading(false);
        }
    };
  return (
    <AuthLayout >
      <div className="p-13">
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-20 h-20 m-4" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h1>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
            role="alert"
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} aria-label="signup-form" className="space-y-4 ">
          <div className='text-white'>
            <label htmlFor="first_name" className="block mb-1 font-medium">
              First Name
            </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              value={form.first_name}
              onChange={handleChange}
              required
              placeholder="First name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          <div className='text-white'>
            <label htmlFor="last_name" className="block mb-1 font-medium">
              Last Name
            </label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              value={form.last_name}
              onChange={handleChange}
              required
              placeholder="Last name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          <div className='text-white'>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>

          <div className='text-white'>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
            />
          </div>
          <PrimaryButton disabled={loading}>
          {loading ? "Registering..." : "Register"}
          </PrimaryButton>
          <div className="flex justify-center my-2">
            <p className='text-white'>Already have an account?
              <a className="text-[#AB9B80] hover:underline"  href="/"> Sign in</a>
            </p>
          </div>
        </form>
        
        {/*
        <section aria-live="polite" className="mt-6 bg-gray-50 p-4 rounded-md">
          <h2 className="font-semibold mb-2">Current form values</h2>
          <pre className="text-sm text-gray-700">{JSON.stringify(form, null, 2)}</pre>
        </section>
         */} 
      </div>
        
    </AuthLayout>
  )
}

export default Register