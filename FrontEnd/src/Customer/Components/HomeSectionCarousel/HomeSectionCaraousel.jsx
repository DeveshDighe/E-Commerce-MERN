import React, { useState } from 'react'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import { mens_kurta } from '../../../../Data/Men/men_kurta';


const HomeSectionCaraousel = ({ ProdsData, sectionName }) => {
    const responsive = {
        0: { items: 1.1 },
        720: { items: 2 },
        1100: { items: 3.5 },
        1300: { items: 4 }
    };

    let skip = 12;

    const screenWidth = window.innerWidth;

    // Check if the screen width matches any of the breakpoints in the responsive object
    // Adjust skip accordingly
    if (screenWidth >= 280 && screenWidth < 400) {
        skip = 90;
    }
    else if (screenWidth >= 400 && screenWidth < 429) {
        skip = 4
    }
    else if (screenWidth >= 429 && screenWidth < 483) {
        skip = 3;
    }
    else if (screenWidth >= 483 && screenWidth < 503) {
        skip = 10;
    }
    else if (screenWidth >= 503 && screenWidth < 531) {
        skip = 11;
    }
    else if (screenWidth >= 531 && screenWidth < 553) {
        skip = 12;
    }
    else if (screenWidth >= 553 && screenWidth < 582) {
        skip = 13;
    }
    else if (screenWidth >= 582 && screenWidth < 611) {
        skip = 14;
    }
    else if (screenWidth >= 611 && screenWidth < 647) {
        skip = 15;
    }
    // else if (screenWidth >= 620 && screenWidth < 647) {
    //     skip = 15;
    // }
    else if (screenWidth >= 647 && screenWidth < 690) {
        skip = 16;
    }
    else if (screenWidth >= 690 && screenWidth < 720) {
        skip = 17;
    }
    else if (screenWidth >= 720 && screenWidth < 756) {
        skip = 7;
    }
    else if (screenWidth >= 756 && screenWidth < 818) {
        skip = 9;
    }
    else if (screenWidth >= 818 && screenWidth < 944) {
        skip = 11;
    }
    else if (screenWidth >= 944 && screenWidth < 1000) {
        skip = 12;
    }
    else if (screenWidth >= 1000 && screenWidth < 1059) {
        skip = 13;
    }
    else if (screenWidth >= 1059 && screenWidth < 1100) {
        skip = 14;
    }

    else if (screenWidth >= 1100 && screenWidth < 1200) {
        skip = 3;
    }
    else if (screenWidth >= 1200 && screenWidth < 1373) {
        skip = 5;
    }
    else if (screenWidth >= 1373 && screenWidth < 1473) {
        skip = 7;
    }
    else if (screenWidth >= 1473 && screenWidth < 1670) {
        skip = 9;
    }



    const [ActiveIndex, setActiveIndex] = useState(0);

    const slidePrev = () => { setActiveIndex(ActiveIndex - 1) }
    const slideNext = () => setActiveIndex(ActiveIndex + 1)

    const syncActiveIndex = ({ t }) => setActiveIndex(t)

    const items = ProdsData.slice(0, 30).map((item) => <HomeSectionCard Data={item} />)   //The array contains 5 elements, each corresponding to a HomeSectionCard.
    return (
        <div className=' border rounded-md '>
            <h2 className=' text-2xl ml-2 font-extrabold font-noto text-gray-800 pt-5'>{sectionName}</h2>
            <div className={`relative px-5 a`} style={{ display: 'flex', justifyContent: 'center' }}>
                <AliceCarousel
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    disableButtonsControls
                    // infinite
                    onSlideChanged={syncActiveIndex}
                    activeIndex={ActiveIndex}

                    style={{ justifyContent: 'center', display: 'flex' }}
                // mouseTracking
                // controlsStrategy="alternate"
                />

                {ActiveIndex !== items.length - skip && (
                    <Button
                        variant='contained'
                        className='z-50 block'
                        onClick={slideNext}
                        sx={{
                            position: "absolute",
                            top: '8rem',
                            right: '0rem',
                            transform: 'translateX(50%) rotate(90deg)',
                            bgcolor: "white",
                            '@media (max-width: 350px)': {
                                display: 'none'
                            }
                        }}
                        aria-label='next'
                    >
                        <KeyboardArrowLeftIcon style={{ transform: 'rotate(90deg)', color: 'black' }} />
                    </Button>
                )}


                {ActiveIndex !== 0 && <Button onClick={slidePrev} variant='contained' className=' z-50 changeBTN' sx={{
                    position: "absolute", top: '8rem', left: '0rem', transform: 'translateX(-50%) rotate(90deg)', bgcolor: "white",
                    '@media (max-width: 350px)': {
                        display: 'none'
                    }
                }} aria-label='next' >
                    <KeyboardArrowLeftIcon style={{ transform: 'rotate(-90deg)', color: 'black' }} />
                </Button>}
            </div>

        </div>
    )
}

export default HomeSectionCaraousel