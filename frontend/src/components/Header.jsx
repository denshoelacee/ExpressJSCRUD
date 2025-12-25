import React from 'react'
import logo from "../assets/images/logo.png";
function Header({headerTitle}) {
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const handleRouteToProfile = () => {
        window.location.href = "/profile";
    }

  return (
    <div>
        <div className="flex justify-between mb-8">
            <div className="flex items-center justify-between mb-2 gap-5">
                <a href="/dashboard">
                    <img src={logo} className="w-10 h-10"  alt="" />
                </a>
                <h1 className="text-2xl font-bold text-brown-500">
                    {headerTitle}
                </h1>
            </div>
            <div className='flex gap-3'>
                <button
                onClick={handleRouteToProfile}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium cursor-pointer"
                >
                Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium cursor-pointer"
                    >
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}

export default Header