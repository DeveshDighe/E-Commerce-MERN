import { Grid } from '@mui/material'
import React from 'react'
import AdjustIcon from '@mui/icons-material/Adjust';
import style from '../Product/ProductCard.module.css'
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ item, everyArr }) => {
    const navigate = useNavigate()

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    // Log everyArr.orderDate to verify its format

    const parsedDate = new Date(everyArr.orderDate);
    const orderDataeString = parsedDate.toLocaleDateString(undefined, options)
    const orderDatemiliseconds = parsedDate.getTime();



    // Add 3 days to the parsed Date object
    const deliveryDate = new Date(parsedDate);
    deliveryDate.setDate(deliveryDate.getDate() + 1);

    // Format deliveryDate as a string with month, day, and year

    const deliveryDateString = deliveryDate.toLocaleDateString(undefined, options);


    // Get the delivery date in milliseconds
    const deliveryDateMilliseconds = deliveryDate.getTime();


    return (
        <div onClick={() => navigate(`/account/order/${everyArr._id}`)} className={`p-5 border `}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>

                <Grid item xs={12} md={6}>
                    <div className=' flex cursor-pointer'>
                        <img className=' w-[5rem] h-[5rem] object-cover object-top' src={item.product.imageUrl} alt="" />
                        <div className=' ml-5  space-y-2'>

                            <p className=''>{item.product.brand}</p>
                            <p className=''>{item.product.title}</p>
                            <p className=' opacity-50 text-xs font-semibold'>Qantity : {item.quantity}</p>
                            {/* <p className='  opacity-50 text-xs font-semibold'>Color: Black</p> */}

                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} md={2} >
                    <p>₹ {item.discountedPrice}</p>
                </Grid>


                <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'column' }, justifyContent: { xs: 'space-between', md: 'center' } }}>

                    <div className=' flex flex-col gap-6 orderCartFixing '>
                        <div className=' w-52 delmadeorder'>
                            <p>
                                <AdjustIcon sx={{ width: '15px', height: '15px' }} className=' text-green-600 mr-2 text-sm ' />
                                <span>Order made on</span>
                            </p>
                            <p className=' text-xs pl-6 '>{orderDataeString}</p>
                        </div>

                        <div className=' w-52 delmadeorder'>
                            {Date.now() > deliveryDateMilliseconds ?
                                <p>
                                    <AdjustIcon sx={{ width: '15px', height: '15px' }} className=' text-green-600 mr-2 text-sm' />
                                    <span>Delivery Made on</span>
                                </p>
                                :

                                <p>
                                    <AdjustIcon sx={{ width: '15px', height: '15px' }} className=' text-green-600 mr-2 text-sm' />
                                    <span>Expected Delivery on</span>
                                </p>
                            }
                            <p className=' text-xs pl-6 '>{deliveryDateString}</p>
                        </div>
                    </div>
                </Grid>

            </Grid>
        </div>
    )
}

export default OrderCard