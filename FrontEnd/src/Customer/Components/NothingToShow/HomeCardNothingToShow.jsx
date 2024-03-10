import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";
const HomeCardNothingToShow = () => {
  return (
    <div className=' h-[300px] w-auto border'>
      <div className=' w-full h-full flex items-center justify-center flex-col gap-8'>
      <h1 className=' text-2xl'><FadeLoader
        color="RGB(150 146 238)"
        loading={true}
        speedMultiplier={2}
        // cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></h1>
    </div>
    </div>
  )
}

export default HomeCardNothingToShow