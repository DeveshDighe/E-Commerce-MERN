import React, { useEffect } from 'react'
import AddressCard from './AddressCard'
import CartItem from '../Cart/CartItem'
import { Divider, Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action'
import OrderedCartItem from '../Cart/OrderedCartItem'
import toast from 'react-hot-toast'

const OrderSummary = () => {

    const ordersData = useSelector(store => store.order)
    const dispatch = useDispatch();
    const location = useLocation();
    const searchParams =new URLSearchParams(location.search)
    const orderId = searchParams.get('order_id')
    const navigate = useNavigate();

    const handlePay = () => {
        toast.success('Order successfull')
        navigate('/')
    }

    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [orderId])

    return (
        <div>
            <div className=' p-5 shadow-lg rounded-s-md border my-8'>
                <AddressCard itemData = {ordersData.order} />
            </div>

            <div>

                <div className=' lg:grid grid-cols-3 relative'>
                    <div className=' col-span-2'>
                        {ordersData?.order?.orderItems.map((item) => <OrderedCartItem data={item} />)}
                    </div>

                    <div className=' px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>
                        <div className='border'>

                            <p className=' uppercase font-bold opacity-60 pb-4'>Price details</p>

                            <Divider />

                            <div className=' space-y-3 font-semibold mb-10'>
                                <div className=' flex justify-between pt-3 text-black'>
                                    <span>Price</span>
                                    <span>₹ {ordersData?.order?.totalPrice}</span>
                                </div>
                                <div className=' flex justify-between pt-3 text-black'>
                                    <span>Discount</span>
                                    <span className='text-green-600'>-₹ {ordersData?.order?.discount}</span>
                                </div>
                                <div className=' flex justify-between pt-3 text-black'>
                                    <span>Delivery Cha</span>
                                    <span className='text-green-600'>Free</span>
                                </div>
                                <div className=' flex justify-between pt-3 text-black'>
                                    <span>Total Amount</span>
                                    <span className=' text-green-600'>₹{ordersData?.order?.totalDiscountedPrice}</span>
                                </div>
                            </div>

                            <Button onClick={handlePay} className=' w-full mt-10' variant='contained' sx={{ px: '2rem', py: '1rem', bgcolor: '#5a46e5', mt: '10px', '&:hover': { bgcolor: '#7d5dff' } }}>
                                Pay
                            </Button>

                        </div>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default OrderSummary