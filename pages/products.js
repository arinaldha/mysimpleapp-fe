import Layout from '../components/layout'
import ProductItems from '../components/Products/ProductItems'
import { useEffect, useState } from 'react'
import ProductItemsSkeleton from '../components/Products/ProductItemsSkeleton'
import ProductHeader from '../components/Products/ProductHeader'
import AddProduct from '../components/Product/AddProduct'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Button from '../components/common/Button'

function Products() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { handleSubmit } = useForm()
  const [searchInput, setSearchInput] = useState('')

  let token = ''
  if (typeof window !== 'undefined') {
    token = window.localStorage.getItem('token')
  }

  const fetchData = async (search) => {
    setLoading(true)
    let url
    if (search) {
      url = `${process.env.API_URL}/products?search=${search}`
    } else {
      url = `${process.env.API_URL}/products`
    }
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data.response)
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
        <h1 className="text-2xl font-bold text-gray-700">Products</h1>
        <div className="flex items-center space-x-2">
          <AddProduct />
        </div>
      </header>
      <input
        name="search"
        className="form-control mt-2 rounded-md border border-solid border-gray-300 bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 transition ease-in-out focus:border-sky-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        placeholder="search by product name"
        onChange={(event) => setSearchInput(event.target.value)}
      />
      <Button className="ml-2" onClick={onFilter}>
        search
      </Button>
      <ProductHeader />
      {loading ? (
        <ProductItemsSkeleton />
      ) : (
        <ProductItems products={products} />
      )}
    </div>
  )
}

export default Products

Products.getLayout = function getLayout(page) {
  return <Layout meta={{ name: 'Products' }}>{page}</Layout>
}
