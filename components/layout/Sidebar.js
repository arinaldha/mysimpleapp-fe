import clsx from 'clsx'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { NavLink } from '../common/Links'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleToggle = () => setIsOpen((prev) => !prev)
  const [userRole, setUserRole] = useState(0)

  useEffect(() => {
    const roleId = parseInt(window.localStorage.getItem('role_id'))
    if (roleId) {
      setUserRole(roleId)
    } else {
      window.location.href = '/login'
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('email')
    window.localStorage.removeItem('role_id')
    window.localStorage.removeItem('user_id')
    window.location.href = '/login'
  }

  return (
    <>
      <div
        onClick={handleToggle}
        className={clsx('block cursor-pointer border px-3 py-2 lg:hidden')}
      >
        {isOpen ? 'Close' : 'Menu'}
      </div>
      <div
        className={clsx(
          'h-max-content border-r-1 absolute w-screen bg-white p-3 shadow transition-all duration-300 ease-in-out lg:relative lg:block lg:max-w-[15vw] lg:translate-x-0 lg:border-gray-200',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <nav
          onClick={handleToggle}
          className={clsx('flex h-full flex-col px-3 py-6')}
        >
          <NavLink href={'/'}>Home</NavLink>
          {userRole === 1 && <NavLink href={'/users'}>Users</NavLink>}
          <NavLink href={'/products'}>Products</NavLink>
          <button className="ease my-2 rounded border border-gray-200 p-2 text-center font-semibold text-gray-800 hover:text-sky-600 hover:shadow-sm" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
