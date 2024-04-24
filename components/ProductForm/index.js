import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from './Section'

const ProductForm = ({ type, defaultValues, onFormSubmit, ...props }) => {
  const [imageSrc, setImageSrc] = useState('')
  const [file, setFile] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  useEffect(() => {
    if (defaultValues) {
      setValue('name', defaultValues.name)
      setValue('qty', defaultValues.qty)
      setValue('price', defaultValues.price)
      setValue('product_file', defaultValues.product_file)
    }
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    data.file = file
    await onFormSubmit(data)
    reset()
  })

  const handleOnChange = (changeEvent) => {
    setFile(changeEvent.target.files[0])
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
    }
    reader.readAsDataURL(changeEvent.target.files[0])
  }

  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormSection defaultOpen={true} title={'Product Information'}>
          <Input
            name="name"
            label="Name of the Product"
            placeholder="My beautiful product..."
            type="text"
            error={errors.name ? errors.name.message : false}
            register={register('name', {
              required: {
                value: true,
                message: 'You must add the name of your product.',
              },
            })}
          />
          <div className="flex flex-col items-center md:flex-row md:space-x-2">
            <Input
              className=""
              name="price"
              label="Price"
              placeholder="36.5"
              type="number"
              multiline
              error={errors.price ? errors.price.message : false}
              register={register('price', {
                required: {
                  value: true,
                  message: 'You must add the price of your product.',
                },
                setValueAs: (v) => parseFloat(v),
              })}
            />
            <Input
              className=""
              name="qty"
              label="Quantity"
              placeholder="1000"
              type="number"
              multiline
              error={errors.qty ? errors.qty.message : false}
              register={register('qty', {
                required: {
                  value: true,
                  message: 'You must add the quantity of your product.',
                },
                setValueAs: (v) => parseInt(v),
              })}
            />
          </div>
          <input
            name="file"
            type="file"
            onChange={handleOnChange}
            className="mb-3 w-full rounded-md border p-3 focus:border-sky-300 focus:ring-sky-300"
          />
          <div>
            {imageSrc && (
              <img
                className="mb-2 aspect-video rounded"
                src={imageSrc}
                alt=""
              />
            )}
          </div>
        </FormSection>
      </form>

      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} Product` : 'Submit'}
      </Button>
    </div>
  )
}

export default ProductForm
