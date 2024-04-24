import React from 'react'

const Section = ({ title, children, ...props }) => (
  <section className="mb-3 rounded-md border px-3 py-4" {...props}>
    <h3 className="mb-3 text-xl font-semibold text-gray-500">{title}</h3>
    {children}
  </section>
)

const UserLayout = ({ user }) => {
  console.log('user lay >>>', user)
  return (
    <div className="mt-6 flex flex-col gap-4 overflow-auto md:flex-row">
      <div>
        <Section title={'Name'}>
          <p className="text-2xl">{user.name}</p>
        </Section>
        <Section title={'Email'}>
          <p className="text-md max-w-md">{user.email}</p>
        </Section>
        <Section title={'Phone'}>
          <p className="text-md max-w-md">{user.phone}</p>
        </Section>
        <Section title={'Gender'}>
          <p className="text-md max-w-md">{user.gender}</p>
        </Section>
        <Section title={'Role'}>
          <p className="text-md max-w-md">{user?.role?.name}</p>
        </Section>
      </div>
    </div>
  )
}

export default UserLayout
