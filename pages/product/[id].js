import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout'
import ProductLayout from '../../components/Product/ProductLayout'
import DeleteProduct from '../../components/Product/DeleteProduct'
import UpdateProduct from '../../components/Product/UpdateProduct'
import { useRouter } from 'next/router'
import axios from 'axios'

function Product({ productDetail }) {
  const router = useRouter()
  const productId = router.query.id
  const [product, setProduct] = useState([])

  const getDetailProduct = () => {
    const token = window.localStorage.getItem('token')
    axios
      .get(`${process.env.API_URL}/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res >>>', res)
        setProduct(res.data.response)
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
    getDetailProduct()
  }, [])

  return (
    <Layout meta={{ name: product?.name || 'Product' }}>
      <div>
        <header className="my-3 flex flex-col items-center justify-between rounded-md md:flex-row">
          <h1 className="mb-3 truncate text-xl font-bold text-gray-700">
            <span className="mr-2 text-sm font-medium text-gray-500">
              Product:{' '}
            </span>
            {product?.name}
          </h1>
          <div className="flex items-center space-x-2">
            <UpdateProduct product={product} />
            <DeleteProduct productId={product?.id} />
          </div>
        </header>
        {product ? (
          <ProductLayout product={product} />
        ) : (
          <div className="w-full text-center text-2xl font-bold text-gray-300">
            No details
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Product
