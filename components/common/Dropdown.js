import clsx from 'clsx'
import React from 'react'

const Dropdown = ({
  name,
  label,
  register,
  children,
  error,
  className,
  itemList,
  ...props
}) => {
  return (
    <div className="mb-2">
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <select
        className={clsx([
          'form-control block w-full border border-solid bg-white bg-clip-padding px-4 py-2 font-normal text-gray-700 focus:ring-2',
          error ? 'border-red-300 ring ring-red-300' : 'border-gray-300',
          'm-0 rounded-md transition ease-in-out focus:border-sky-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-sky-300',
          className,
        ])}
        name={name}
        {...props}
        {...register}
      >
        {itemList.map((item, i) => {
          return (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          )
        })}
      </select>
      {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
    </div>
  )
}

export default Dropdown
