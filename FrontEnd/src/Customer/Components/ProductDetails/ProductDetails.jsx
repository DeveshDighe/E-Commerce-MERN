/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import ProductReviewCard from './ProductReviewCard'
import { mens_kurta } from '../../../../Data/Men/men_kurta.js'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action.js'
import { addItemToCart } from '../../../State/Cart/Action.js'
import RatingComponent from '../ReviewAndRating/Rating.jsx'
import ProductReviewDummy from './ProductReviewDummy.jsx'
import FadeLoader from 'react-spinners/FadeLoader.js'
import toast from 'react-hot-toast'

// const product = {
//     name: 'Basic Tee 6-Pack',
//     price: '$192',
//     href: '#',
//     breadcrumbs: [
//         { id: 1, name: 'Men', href: '#' },
//         { id: 2, name: 'Clothing', href: '#' },
//     ],
//     images: [
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//             alt: 'Two each of gray, white, and black shirts laying flat.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//             alt: 'Model wearing plain black basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//             alt: 'Model wearing plain gray basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//             alt: 'Model wearing plain white basic tee.',
//         },
//     ],
//     colors: [
//         { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//         { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//     ],
//     sizes: [
//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: true },
//     ],
//     description:
//         'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//     highlights: [
//         'Hand cut and sewn locally',
//         'Dyed with our proprietary colors',
//         'Pre-washed & pre-shrunk',
//         'Ultra-soft 100% cotton',
//     ],
//     details:
//         'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState('')
    const [userReviewed, setUserReviewed] = useState(false)

    const singleProductData = useSelector(state => state.product.product)
    const ProductsData = useSelector(state => state.product)

    const user = useSelector(state => state.auth.user)
    console.log(user , 'user');
    console.log(singleProductData?.category);

    const dispatch = useDispatch()



    const navigate = useNavigate();
    const { productId } = useParams()


    const handleAddToCart = () => {
        if (user == null) {
            toast.error('Please login')
        }else{
            const data = { productId, size: selectedSize.name }
            console.log(data , 'This is data');
        dispatch(addItemToCart(data))
        window.scrollTo(0, 0);
        navigate(`/cart`)
        }
        
    }

    useEffect(() => {
        dispatch(findProductsById(productId))
    }, [productId])

    let TotalRating = null;
    let AverageRating = null;
    if (singleProductData?.ratings) {
        for (let i = 0; i < singleProductData?.ratings.length; i++) {
            TotalRating += singleProductData.ratings[i].rating

        }

    }

    AverageRating = TotalRating / singleProductData?.ratings?.length;


    useEffect(() => {
        if (singleProductData?.ratings && user?._id) {
            let hasReviewed = false; // Initialize a local variable to track review status
            for (const rating of singleProductData?.ratings) {
                if (rating?.user?._id === user?._id) {
                    hasReviewed = true; // Set to true if user has reviewed
                    break; // Exit the loop early if user review is found
                }
            }
            setUserReviewed(hasReviewed); // Update state after the loop
        }
    }, [singleProductData?.ratings, user?._id])

    useEffect(() => {
        dispatch(findProductsById(productId))
    }, [userReviewed])


    const product = {
        name: singleProductData?.category?.name.slice(0,1).toUpperCase() + singleProductData?.category?.name.slice(1,singleProductData?.category?.name.length) ?? 'Basic Tee 6-Pack',
        price: '$192',
        href: '#',
        breadcrumbs: [
            { id: 1, name: singleProductData?.category.parentCategory == '65eb1449ae200afbe94e1257' ? 'Women': 'Men', href: '#' },
            { id: 2, name: 'Clothing', href: '#' },
        ],
        images: [
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
                alt: 'Two each of gray, white, and black shirts laying flat.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
                alt: 'Model wearing plain black basic tee.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
                alt: 'Model wearing plain gray basic tee.',
            },
            {
                src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
                alt: 'Model wearing plain white basic tee.',
            },
        ],
        colors: [
            { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
            { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
            { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        ],
        sizes: [
            { name: 'S', inStock: true },
            { name: 'M', inStock: true },
            { name: 'L', inStock: true },
            { name: 'XL', inStock: true },
        ],
        description:
            'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
        highlights: [
            'Hand cut and sewn locally',
            'Dyed with our proprietary colors',
            'Pre-washed & pre-shrunk',
            'Ultra-soft 100% cotton',
        ],
        details:
            'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
    }



    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                        {product.breadcrumbs.map((breadcrumb) => (
                            <li key={breadcrumb.id}>
                                <div className="flex items-center">
                                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                        {breadcrumb.name}
                                    </a>
                                    <svg
                                        width={16}
                                        height={20}
                                        viewBox="0 0 16 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="h-5 w-4 text-gray-300"
                                    >
                                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                    </svg>
                                </div>
                            </li>
                        ))}
                        <li className="text-sm">
                            <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.name}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className=' grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>

                    {/* Image gallery */}
                    <div className=" flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            {singleProductData?.imageUrl ?
                                <img
                                    src={singleProductData?.imageUrl}
                                    alt={singleProductData?.description}
                                    className="h-full w-full object-cover object-center"
                                />
                                : <div className=' h-[400px] flex items-center justify-center'><FadeLoader
                                    color="RGB(150 146 238)"
                                    loading={true}
                                    speedMultiplier={2}
                                    // cssOverride={override}
                                    size={15}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                /></div>}
                        </div>
                        {/* <div className="flex flex-wrap space-x-5 justify-center">
                            {product.images.map((item) => <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4">
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>)}
                        </div> */}
                    </div>

                    {/* Product info */}
                    <div className=" lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-16">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{singleProductData?.brand}</h1>
                            <h1 className=' text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>
                                {singleProductData?.title}
                            </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">

                            <div className=' flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className=' font-semibold'>₹ {singleProductData?.discountedPrice}</p>
                                <p className=' opacity-50 line-through'>₹ {singleProductData?.price}</p>
                                <p className='  text-green-500 font-semibold'>{singleProductData?.discountPersent} % Off</p>
                            </div>
                            <p className=' font-semibold mt-4'>Color : <span className=' text-gray-500'>{singleProductData?.color}</span></p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                    <Rating name="read-only" value={singleProductData?.ratings?.length ? AverageRating : 4.5} precision={.5} readOnly />
                                    <p className=' opacity-50 text-sm'>{singleProductData?.ratings?.length ? singleProductData?.ratings?.length : 4} Ratings</p>
                                    <p className=' ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>{singleProductData?.reviews.length ? singleProductData?.reviews.length : 4} Reviews</p>
                                </div>

                            </div>

                            <form className="mt-10">

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>

                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {singleProductData?.sizes?.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    className={({ active }) =>
                                                        classNames(
                                                            'cursor-pointer bg-white text-gray-900 shadow-sm',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }

                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>

                                                            <span
                                                                className={classNames(
                                                                    active ? 'border' : 'border-2',
                                                                    checked ? 'border-indigo-500' : 'border-transparent',
                                                                    'pointer-events-none absolute -inset-px rounded-md'
                                                                )}
                                                                aria-hidden="true"
                                                            />

                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* <div className=' flex justify-center'> */}
                                <Button onClick={handleAddToCart} className=' hover:bg-purple-100' variant='contained' sx={{ px: '2rem', py: '1rem', bgcolor: '#5a46e5', mt: '10px', '&:hover': { bgcolor: '#7d5dff' } }}>
                                    Add To Cart
                                </Button>

                                {/* </div> */}
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{singleProductData?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {/* 
                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Rating And Reviews */}
                <section className=' w-full mb-14 h-auto'>
                    <h1 className=' fw-bold text-3xl pb-4 text-center font-semibold mb-16 mr-10'>Recent Reviews & Rating</h1>

                    <div className='px-3 max-sm:px-8 h-auto'>
                        <Grid container spacing={7} className=' m-0'>


                            {singleProductData?.ratings.length == 0 ? <Grid item xs={12} md={6} className='md:order-1' order={2}>
                                <div className=' space-y-5'>

                                    {[1, 1, 1, 1].map((rev, index) => {
                                        return (
                                            <ProductReviewDummy key={index} />
                                        )
                                    })}

                                </div>
                            </Grid>
                                :
                                <Grid item xs={12} md={6} className='md:order-1' order={2}>
                                    <div className=' space-y-5 rounded-lg'>

                                        {singleProductData?.ratings?.map((rev, index) => {
                                            const revData = singleProductData?.reviews[index];
                                            return (
                                                <ProductReviewCard revData={revData} ratings={rev} />
                                            )
                                        })}

                                    </div>
                                </Grid>
                            }

                            <Grid item xs={12} md={6} className=' md:order-2 pl-0'>
                                <h1 className=' text-xl font-semibold pb-2'>Product Rating</h1>

                                <div className=' flex items-center space-x-4 mb-8 mt-4'>
                                    <Rating name='read-only' value={singleProductData?.ratings?.length ? AverageRating : 4.5} precision={.5} readOnly />
                                    <p className=' opacity-60'>{singleProductData?.ratings?.length ? singleProductData?.ratings?.length : 4} Ratings</p>
                                </div>

                                <Box className=' my-5 space-y-3'>
                                    <Grid container alignItems={'center'} gap={2}>
                                        <Grid item xs={2} >
                                            <p>Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, ml: '40px' }} variant='determinate' value={40} color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems={'center'} gap={2}>
                                        <Grid item xs={2} >
                                            <p>Very Good</p>
                                        </Grid>
                                        <Grid item xs={7} >
                                            <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, ml: '40px' }} variant='determinate' value={30} color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems={'center'} gap={2}>
                                        <Grid item xs={2} >
                                            <p>Good</p>
                                        </Grid>
                                        <Grid item xs={7} >
                                            <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, ml: '40px' }} variant='determinate' value={25} color='info' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems={'center'} gap={2}>
                                        <Grid item xs={2} >
                                            <p>Average</p>
                                        </Grid>
                                        <Grid item xs={7} >
                                            <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, ml: '40px' }} variant='determinate' value={20} color='warning' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems={'center'} gap={2}>
                                        <Grid item xs={2} >
                                            <p>Poor</p>
                                        </Grid>
                                        <Grid item xs={7} >
                                            <LinearProgress sx={{ bgcolor: '#d0d0d0', borderRadius: 4, height: 7, ml: '40px' }} variant='determinate' value={10} color='error' />
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>

                {/* Rating Component */}
                <div className='  flex justify-center'>

                    {userReviewed == false && (
                        <RatingComponent setUserReviewed={setUserReviewed} productId={singleProductData?._id} />

                    )}
                    {/* {singleProductData?.ratings.length == 0 && (
                        <RatingComponent productId={singleProductData?._id} />

                    )} */}

                </div>
                {/* 

                    {singleProductData?.ratings && singleProductData?.ratings?.map((item) => (
                        <p>{item.user?.firstName} {item.user?.lastName}</p>
                    ))} */}

                {/* {Similar Products} */}
                {/* <section className=' pt-10'>

                    <h1 className=' py-5 max-md:ml-8 text-xl font-bold font-ubuntu'>Similar Products</h1>

                    <div className='flex-wrap gap-6 flex justify-center gap-y-14 border'>
                        {ProductsData?.products?.slice(0, 12).map((item) => <HomeSectionCard Data={item} />)}
                    </div>
                </section> */}
            </div>
        </div>
    )
}
