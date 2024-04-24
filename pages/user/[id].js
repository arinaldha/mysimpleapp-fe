import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import UserLayout from '../../components/User/UserLayout'
import DeleteUser from '../../components/User/DeleteUser'
import UpdateUser from '../../components/User/UpdateUser'
import { useRouter } from 'next/router'
import axios from 'axios'

function User({ userDetail }) {
  const router = useRouter()
  const [user, setUser] = useState([])

  const getDetailUser = () => {
    const userId = router.query.id
    const token = window.localStorage.getItem('token')
    axios
      .get(`${process.env.API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res >>>', res)
        setUser(res.data.response)
      })
      .catch((err) => {
        console.log('err >>>', err)
        const statusCode = err.response.status
        if (statusCode === 401) {
          window.location.href = '/login'
        }
      })
  }

  useEffect(() => {
    getDetailUser()
  }, [])

  return (
    <Layout meta={{ name: user?.name || 'User' }}>
      <div>
        <header className="my-3 flex flex-col items-center justify-between rounded-md md:flex-row">
          <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
            <span className="mr-2 text-sm font-medium text-gray-500">
              User:{' '}
            </span>
            {user?.name}
          </h1>
          <div className="flex items-center space-x-2">
            <UpdateUser user={user} />
            <DeleteUser userId={user?.id} />
          </div>
        </header>
        {user ? (
          <UserLayout user={user} />
        ) : (
          <div className="w-full text-center text-2xl font-bold text-gray-300">
            No details
          </div>
        )}
      </div>
    </Layout>
  )
}

export default User
