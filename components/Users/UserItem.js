import React from 'react'
import { Link } from '../common/Links'

const UserItem = ({ id, name, role }) => {
  return (
    <div className="my-2 flex cursor-pointer rounded-md border px-3 py-4 shadow-sm hover:shadow lg:px-6">
      <p className="flex-1 truncate font-medium">{name}</p>
      <p className="flex-1 text-right lg:text-left">{role.name}</p>
      <div className="flex-1 text-right text-sm lg:text-left">
        <Link href={`/user/${id}`}>
          <span className="hidden text-sm lg:inline-block">View Details</span>
          <span className="inline-block text-sm lg:hidden">Details</span>
        </Link>
      </div>
    </div>
  )
}

export default UserItem
