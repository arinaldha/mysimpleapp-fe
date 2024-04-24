import Layout from '../components/layout'
import UserItems from '../components/Users/UserItems'
import { useEffect, useState } from 'react'
import UserItemsSkeleton from '../components/Users/UserItemsSkeleton'
import UserHeader from '../components/Users/UserHeader'
import AddUser from '../components/User/AddUser'
import axios from 'axios'
import Button from '../components/common/Button'
import { useForm } from 'react-hook-form'

function Users() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const { handleSubmit } = useForm()

  let token = ''
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token')
  }

  const fetchData = async (search) => {
    setLoading(true)
    let url
    if (search) {
      url = `${process.env.API_URL}/users?search=${search}`
    } else {
      url = `${process.env.API_URL}/users`
    }
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res >>>', res)
        setUsers(res.data.response)
      })
      .catch((err) => {
        console.log('err >>>', err)
        const statusCode = err.response.status
        if (statusCode === 401) {
          window.location.href = '/login'
        }
      })
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [token])

  const onFilter = handleSubmit(async () => {
    await fetchData(searchInput)
  })

  return (
    <div>
      <header className="mt-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-700">Users</h1>
        <div className="flex items-center space-x-2">
          <AddUser />
        </div>
      </header>
      <input
        name="search"
        className="form-control mt-2 rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 transition ease-in-out focus:border-sky-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        placeholder="search by name"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <Button className="ml-2" onClick={onFilter}>
        search
      </Button>
      <UserHeader />
      {loading ? <UserItemsSkeleton /> : <UserItems users={users} />}
    </div>
  )
}

export default Users

Users.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Users' }}>{page}</Layout>
}
