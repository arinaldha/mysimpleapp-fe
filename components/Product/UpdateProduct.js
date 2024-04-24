import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'

import Button from '../common/Button'
import { Close } from '../common/icons/Close'
import ProductForm from '../ProductForm'
import { useRouter } from 'next/router'
import axios from 'axios'

const UpdateProduct = ({ product, ...props }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)

  const onFormSubmit = async (data) => {
    console.log('data ???', data)
    const productId = router.query.id
    const token = window.localStorage.getItem('token')
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('qty', data.qty)
    formData.append('price', data.price)
    if (data.file) {
      formData.append('product_file', data.file, data.file.name)
    } else {
      formData.append('product_file', '')
    }
    axios
      .put(`${process.env.API_URL}/products/${productId}`, formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res >>>', res)
        const result = res.data.response
        router.push(`/product/${result.id}`)
        handleClose()
      })
      .catch((err) => {
        console.log('err >>>', err)
      })
  }

  return (
    <>
      <Button onClick={handleOpen} type="button" {...props}>
        Update
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-y-auto rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="div"
                    className="mb-5 flex items-center justify-between text-lg font-semibold leading-6 text-gray-800"
                  >
                    <h3>Update Product</h3>
                    <Close onClick={handleClose} />
                  </Dialog.Title>

                  <ProductForm
                    defaultValues={product}
                    onFormSubmit={onFormSubmit}
                    type={'Update'}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default UpdateProduct
