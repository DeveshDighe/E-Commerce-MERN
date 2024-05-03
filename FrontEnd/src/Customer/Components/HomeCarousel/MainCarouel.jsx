import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { mainCorouselData } from './MainCorouselData';

const MainCarouel = () => {

  const items = mainCorouselData.map((item) => <img loading='lazy' src={item.imgage} alt='h' className=' cursor-pointer' role='presentation' />)

  return (
    <AliceCarousel
      disableButtonsControls
      autoPlay
      autoPlayInterval={3000}
      items={items}
      infinite
    />
  )
}

export default MainCarouel


