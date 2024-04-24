import { useEffect, useState } from 'react'
import Layout from '../components/layout'

function Index() {
  const [userName, setUserName] = useState('')
  useEffect(() => {
    const name = window.localStorage.getItem('name')
    if (name) {
      setUserName(name)
    } else {
      window.location.href = '/login'
    }
  }, [])
  return (
    <header className="flex h-full flex-col items-center justify-center sm:max-lg:min-h-[85vh]">
      <h1 className="mb-3 text-3xl font-bold">Welcome {userName}</h1>
    </header>
  )
}

export default Index

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
