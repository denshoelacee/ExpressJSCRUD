import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardLayout from "../layouts/DashboardLayout";
import { fetchProfileApi, updateProfileApi } from "../api/todoapi";

function Profile() {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetchProfileApi(token);
        setProfile({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          email: res.data.email,
        });
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, [token]);

  return (
    <DashboardLayout>
      <Header headerTitle="Profile" />

      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-lg rounded-2xl">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-indigo-600 text-white flex items-center justify-center text-3xl font-bold shadow-md">
            {profile.first_name?.charAt(0)}
            {profile.last_name?.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {profile.first_name} {profile.last_name}
            </h1>
            <p className="text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              readOnly
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={profile.last_name}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
