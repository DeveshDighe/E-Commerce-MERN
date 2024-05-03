import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeSectionCard = ({Data}) => {
  const navigate = useNavigate();



  const handleClick = () => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    // Navigate to the product detail page
    navigate(`/Product/${Data._id}`);
  };
  //  is need to do later
  return (
    <div onClick={handleClick}   className=' cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 hover:scale-105 transition-all duration-300  border border-gray-400'>

      <div className=' h-[13rem] w-[10rem]'>
        <img className=' object-cover object-top w-full h-full' loading='lazy' src={Data.imageUrl} alt="" />
      </div>


      <div className=' p-4 '>
        <h3 className=' text-lg font-medium text-gray-900'>{Data.brand}</h3>
        <p className=' mt-2 text-sm to-gray-500'>{Data.title}</p>
      </div>

    </div>
  )
}

export default HomeSectionCard