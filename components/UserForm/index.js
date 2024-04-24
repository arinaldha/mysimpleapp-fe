import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../common/Button'
import Input from '../common/Input'
import FormSection from './Section'
import Dropdown from '../common/Dropdown'
import axios from 'axios'

const UserForm = ({ type, defaultValues, onFormSubmit, ...props }) => {
  const [roles, setRoles] = useState([])

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
      setValue('phone', defaultValues.phone)
      setValue('email', defaultValues.email)
      setValue('gender', defaultValues.gender)
      setValue('role_id', defaultValues.role_id)
    }
    const token = window.localStorage.getItem('token')
    axios
      .get(`${process.env.API_URL}/users/get-roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('res >>>', res)
        setRoles(res.data.response)
      })
      .catch((err) => {
        console.log('err >>>', err)
        const statusCode = err.response.status
        if (statusCode === 401) {
          window.location.href = '/login'
        }
      })
  }, [defaultValues, setValue])

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })

  return (
    <div {...props} className="flex flex-col space-y-6">
      <form>
        <FormSection defaultOpen={true} title={'User Information'}>
          <Input
            name="name"
            label="Name"
            type="text"
            error={errors.name ? errors.name.message : false}
            register={register('name', {
              minLength: {
                value: 5,
                message: 'Length must be 5 or more',
              },
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
          />
          <Input
            name="email"
            label="Email"
            placeholder="abcdef@host.com"
            type="email"
            error={errors.email ? errors.email.message : false}
            register={register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <Input
            name="password"
            label="password"
            type="password"
            error={errors.password ? errors.password.message : false}
            register={register('password', {
              minLength: {
                value: 6,
                message: 'Length must be 6 or more',
              },
              required: {
                value: type === 'Update' ? false : true,
                message: 'Password is required',
              },
            })}
          />
          {type === 'Update' && (
            <i className="text-black-500 mt-2 text-xs">
              Leave it blank if not changed
            </i>
          )}
          <Input
            name="phone"
            label="Phone"
            type="text"
            error={errors.phone ? errors.phone.message : false}
            register={register('phone', {
              minLength: {
                value: 5,
                message: 'Length must be 5 or more',
              },
              required: {
                value: true,
                message: 'Phone is required',
              },
            })}
          />
          <Dropdown
            name="gender"
            label="Gender"
            error={errors.gender ? errors.gender.message : false}
            register={register('gender', {
              required: {
                value: true,
                message: 'Gender is required',
              },
            })}
            itemList={[
              { id: 'Male', name: 'Male' },
              { id: 'Female', name: 'Female' },
            ]}
          />
          <Dropdown
            name="role_id"
            label="Role"
            error={errors.role_id ? errors.role_id.message : false}
            register={register('role_id', {
              required: {
                value: true,
                message: 'Role is required',
              },
            })}
            itemList={roles}
          />
        </FormSection>
      </form>

      <Button type="button" onClick={onSubmit} className="w-full">
        {type ? `${type} User` : 'Submit'}
      </Button>
    </div>
  )
}

export default UserForm
