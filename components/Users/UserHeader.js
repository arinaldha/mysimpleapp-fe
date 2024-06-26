import React from 'react'

const UserHeader = () => {
  return (
    <div className="cursor-loading mt-6 mb-3 flex rounded-md border px-5 py-3 shadow-sm lg:px-8">
      <div className="flex-1 font-semibold text-sky-600">Name</div>
      <div className="flex-1 text-right font-semibold text-sky-600 lg:text-left">
        Role
      </div>
      <div className="flex-1"></div>
    </div>
  )
}

export default UserHeader
