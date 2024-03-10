import React, { useEffect, useState } from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

const NothingToShow = () => {
  const [loading, setloading] = useState(true)
  useEffect(()=>{
    setloading(true)
    setTimeout(() => {
      setloading(false)
    }, 4000);
  },[])
  return (
    <div className=' w-full h-full flex items-center justify-center flex-col gap-8'>
      {!loading ?  
        <>
        <h1 className=' text-4xl ml-3'>Oppsss...</h1>
        <h1 className=' text-2xl'>No Items To Show</h1>
        </>
      : 
      <FadeLoader
        color="RGB(150 146 238)"
        loading={true}
        speedMultiplier={2}
        // cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      
      }
    </div>
  )
}

export default NothingToShow