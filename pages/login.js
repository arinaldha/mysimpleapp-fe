import Input from '../components/common/Input'
import { useForm } from 'react-hook-form'
import Button from '../components/common/Button'
import { useRouter } from 'next/router'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

function Login() {
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
    axios
      .post(`${process.env.API_URL}/auth/login`, data)
      .then((res) => {
        setIsError(false)
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
        console.log('err >>', err)
        setIsError(true)
        setResponseMessage(err.response.data.message.message)
      })
  }

  const onSubmit = handleSubmit(async (data) => {
    await onFormSubmit(data)
    reset()
  })

  return (
    <div className="authentication-form">
      <p className="mb-2 text-center">LOGIN</p>
      {isError && (
        <div
          class="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span class="font-medium">{responseMessage}</span>
        </div>
      )}

      <form>
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
          label="Password"
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
        <Button type="button" onClick={onSubmit} className="w-full">
          Login
        </Button>
        <Button
          type="button"
          onClick={() => router.push('/register')}
          className="mt-2 w-full"
        >
          Register
        </Button>
      </form>
    </div>
  )
}

export default Login

Login.getLayout = function getLayout(page) {
  return <>{page}</>
}
