import React from 'react'
import {Link} from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'

const BackButton = ({destination}) => {
  return (
    <div className='flex'>
        <Link to={destination} className=' text-white px-2 py-4 rounded-full w-fit ml-3'>
            <BsArrowLeft className='text-3xl' />
        </Link>
      
    </div>
  )
}

export default BackButton
