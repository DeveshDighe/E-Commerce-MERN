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

    let skip = 13;

    const screenWidth = window.innerWidth;

    // Check if the screen width matches any of the breakpoints in the responsive object
    // Adjust skip accordingly
    if (screenWidth >= 280 && screenWidth < 300) {
        skip = 90;
    }
    else if (screenWidth >= 300 && screenWidth < 310) {
        skip = 1; // or whatever value you want for this range
    }
    else if (screenWidth >= 310 && screenWidth < 320) {
        skip = 2; // or whatever value you want for this range
    }
    else if (screenWidth >= 320 && screenWidth < 330) {
        skip = 1100; // or whatever value you want for this range
    }
    else if (screenWidth >= 330 && screenWidth < 340) {
        skip = 1200; // or whatever value you want for this range
    }
    else if (screenWidth >= 340 && screenWidth < 350) {
        skip = 1300; // or whatever value you want for this range
    }
    else if (screenWidth >= 350 && screenWidth < 371) {
        skip = 1200;
    }
    else if (screenWidth >= 371 && screenWidth < 380) {
        skip = 100;
    }
    else if (screenWidth >= 380 && screenWidth < 390) {
        skip = 3;
    }
    else if (screenWidth >= 390 && screenWidth < 400) {
        skip = 3;
    }
    else if (screenWidth >= 400 && screenWidth < 409) {
        skip = 4;
    }
    // Other conditions...

    // if (screenWidth >= 400 && screenWidth < 408) {
    //     skip = 200;
    // }
    else if (screenWidth >= 409 && screenWidth < 425) {
        skip = 5
    }
    else if (screenWidth >= 425 && screenWidth < 435) {
        skip = 6
    }
    else if (screenWidth >= 435 && screenWidth < 450) {
        skip = 7;
    }
    else if (screenWidth >= 450 && screenWidth < 467) {
        skip = 8;
    }
    else if (screenWidth >= 467 && screenWidth < 483) {
        skip = 9;
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
    else if (screenWidth >= 818 && screenWidth < 900) {
        skip = 11;
    }
    else if (screenWidth >= 900 && screenWidth < 944) {
        skip = 12;
    }
    else if (screenWidth >= 944 && screenWidth < 1000) {
        skip = 13;
    }
    else if (screenWidth >= 1000 && screenWidth < 1059) {
        skip = 14;
    }
    else if (screenWidth >= 1059 && screenWidth < 1100) {
        skip = 15;
    }

    else if (screenWidth >= 1100 && screenWidth < 1200) {
        skip = 5;
    }
    else if (screenWidth >= 1200 && screenWidth < 1373) {
        skip = 7;
    }
    else if (screenWidth >= 1373 && screenWidth < 1473) {
        skip = 8
    }
    else if (screenWidth >= 1473 && screenWidth < 1670) {
        skip = 10;
    }



    const [ActiveIndex, setActiveIndex] = useState(0);

    const slidePrev = () => { setActiveIndex(ActiveIndex - 1) }
    const slideNext = () => setActiveIndex(ActiveIndex + 1)

    const syncActiveIndex = ({ t }) => setActiveIndex(t)

    const items = ProdsData?.slice(0, 30).map((item) => <HomeSectionCard Data={item} />)   //The array contains 5 elements, each corresponding to a HomeSectionCard.
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
                {/* need to do it dfgdfgdgfdfgdf gfdg dfgdf gdfg dfgdfg dfgdfg dfgdfgdfgdfgdgfdgfgdf*/}
                {ActiveIndex !== items.length - skip && (
                    <Button
                        variant='contained'
                        className=' z-10 block'
                        onClick={slideNext}
                        sx={{
                            position: "absolute",
                            top: '8rem',
                            right: '0rem',
                            transform: 'translateX(50%) rotate(90deg)',
                            bgcolor: "white",
                            '@media (max-width: 410px)': {
                                display: 'none'
                            }
                        }}
                        aria-label='next'
                    >
                        <KeyboardArrowLeftIcon style={{ transform: 'rotate(90deg)', color: 'black' }} />
                    </Button>
                )}


                {ActiveIndex !== 0 && <Button onClick={slidePrev} variant='contained' className=' z-10 changeBTN' sx={{
                    position: "absolute", top: '8rem', left: '0rem', transform: 'translateX(-50%) rotate(90deg)', bgcolor: "white",
                    '@media (max-width: 410px)': {
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