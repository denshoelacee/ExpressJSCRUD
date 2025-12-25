import React from 'react'

function button({children}) {
  return (
    <button
          type="submit"
          className="cursor-pointer bg-[#561C24] text-white px-4 py-2 rounded-md hover:bg-[#561C40] transition-colors w-full disabled:opacity-50"
        >
          {children}
    </button>
  )
}

export default button