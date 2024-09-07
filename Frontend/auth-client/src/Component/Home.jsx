import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div className='flex justify-center '>
    <div className='bg-white w-2/3'>
    <div className='flex flex-col  items-center'>
        <h1 className=' bg-gray-800 text-white w-full flex justify-center '>Welcome! to the Form</h1>
        <div className='mt-4'  >
        <button className='bg-black text-white p-1 text-sm rounded-lg m-2 '><Link to="/signup">SignUp</Link></button>
        <button className='bg-black text-white p-1 text-sm rounded-lg m-2'><Link to="/login">Login</Link></button></div>
      
    </div>
    </div>
    </div>
  )
}

export default home
