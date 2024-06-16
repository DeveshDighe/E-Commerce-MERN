import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { Button, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../../State/Cart/Action'
import NothingToShow from '../NothingToShow/NothingToShow'
import toast from 'react-hot-toast'

const Cart = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(store => store?.cart)
    const auth = useSelector(store => store.auth)
    const [plus, setplus] = useState(1)
    // const {cart2} = useSelector(store => store)

    console.log(cart, 'cart');



    const handleCheckOut = () => {
        if (cart?.cart == null) {
            toast.error('No items in cart')
        } else {

            navigate(`/checkout?step=2`)
        }
    }

    // useEffect(() => {
    //     dispatch(getCart())
    // }, [plus])

    useEffect(()=>{
        dispatch(getCart())
    }, [auth.user])



    // useEffect(() => {
    //     console.log(cart, 'cart');
    // }, [cart])

    return (
        <div>

            <div className=' lg:grid grid-cols-3 lg:px-16 relative'>
                {cart?.cartItems?.length ? (
                    <div className='col-span-2'>
                        {cart?.cartItems?.map((item) => (
                            <CartItem key={item?._id} setplus={setplus} data={item} />
                        ))}
                    </div>
                ) : (
                    <div className='col-span-2 md:h-80'>
                        <NothingToShow key="nothingToShow" />
                    </div>
                )}

                <div className=' px-5 sticky top-0 h-[100vh] mt-5 lg:mt-4 '>
                    <div className='border p-2'>

                        <p className=' uppercase font-bold opacity-60 pb-4'>Price details</p>

                        <Divider />

                        <div className=' space-y-3 font-semibold mb-10'>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹ {cart?.cart?.totalPrice ? cart?.cart?.totalPrice : 0}</span>
                            </div>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Discount</span>
                                <span className='text-green-600'>- ₹ {cart?.cart?.discount ? cart?.cart?.discount : 0}</span>
                            </div>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Delivery Cha</span>
                                <span className='text-green-600'>Free</span>
                            </div>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Total Amount</span>
                                <span className=' text-green-600'>₹ {cart?.cart?.totalDiscountedPrice ? cart?.cart?.totalDiscountedPrice : 0}</span>
                            </div>
                        </div>

                        <Button onClick={handleCheckOut} className=' w-full mt-10' variant='contained' sx={{ px: '2rem', py: '1rem', bgcolor: '#5a46e5', mt: '10px', '&:hover': { bgcolor: '#7d5dff' } }}>
                            Check Out
                        </Button>

                    </div>
                </div>

            </div>


        </div>
    )
}

export default Cart