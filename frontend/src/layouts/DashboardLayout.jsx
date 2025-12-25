import React from 'react'

function DashboardLayout({children}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto p-6 md:p-8">
            {children}
        </div>
    </div>
  )
}
//DASHBOARD LAYOUT 

export default DashboardLayout