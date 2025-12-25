import React from 'react'

function Card({icon, value, title,className,color,bgColor} ) {
  return (
    <div className={`"bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200" ${className} ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColor} ${color}`}>
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-500">Total</span>
      </div>
      <h3 className="text-3xl font-bold text-gray-800 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  )
}

export default Card