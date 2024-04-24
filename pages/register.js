import Input from '../components/common/Input'
import { useForm } from 'react-hook-form'
import Button from '../components/common/Button'
import { useRouter } from 'next/router'
import axios from 'axios'
import Dropdown from '../components/common/Dropdown'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

function Register() {
  const router = useRouter()
  const [isError, setIsError] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onFormSubmit = async (data) => {
    data.role_id = 2
    axios
      .post(`${process.env.API_URL}/auth/register`, data)
      .then((res) => {
        const result = res.data.response
        const decoded = jwtDecode(result.token)
        window.localStorage.setItem('token', result.token)
        window.localStorage.setItem('name', decoded.name)
        window.localStorage.setItem('email', decoded.email)
        window.localStorage.setItem('role_id', decoded.role_id)
        window.localStorage.setItem('user_id', decoded.user_id)
        reset()
        window.location.href = '/'
      })
      .catch((err) => {
        console.log('err >>>', err)
      })
  }

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
  })

  return (
    <div className="authentication-form">
      <p className="mb-2 text-center">REGISTER</p>
      {isError && <p>asdasdas</p>}
      <form>
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
              value: true,
              message: 'Password is required',
            },
          })}
        />
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
        <Button type="button" onClick={onSubmit} className="w-full">
          Register
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/login')}
          className="mt-2 w-full"
        >
          Back To Login
        </Button>
      </form>
    </div>
  )
}

export default Register

Register.getLayout = function getLayout(page) {
  return <>{page}</>
}
