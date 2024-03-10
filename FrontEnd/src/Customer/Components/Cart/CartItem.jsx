import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { removeCartItem, updateCartItem } from '../../../State/Cart/Action';
import { useDispatch } from 'react-redux';

const CartItem = ({ data ,setplus }) => {
    const dispatch = useDispatch();

    const handleUpdateCartItem = (num) => {
        const productData = {data:{quantity:data.quantity + num}, cartItemId: data?._id}
        dispatch(updateCartItem(productData))
    }
    
    const handleRemoveCartProduct = () => {
        dispatch(removeCartItem(data?._id))
        setplus(prevPlus => prevPlus + 1);
    }
    
    return (
        <div className=' p-5 shadow-lg border rounded-md my-4'>

            <div className=' flex items-center'>

                <div className=' w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>
                    <img className=' w-full h-full object-cover object-top' src={data?.product?.imageUrl} alt="" />
                </div>

                <div className=' ml-5 space-y-1'>
                    <p className=' font-semibold'>{data?.product?.title}</p>
                    <p className=' opacity-70'>Size {data?.size}, White</p>
                    <p className=' opacity-70 mt-2'>Seller : {data?.product.brand}</p>
                    <div className=' flex space-x-5 items-center  text-gray-900 pt-6'>
                        <p className=' font-semibold'>₹ {data?.discountedPrice}</p>
                        <p className=' opacity-50 line-through'>₹ {data?.price}</p>
                        <p className=' text-green-500 font-semibold'>{data?.product?.discountPersent}% Off</p>
                    </div>
                </div>
            </div>
            <div className=' lg:flex items-center lg:space-x-10 pt-4'>
                <div className=' flex items-center space-x-2'>
                    <IconButton onClick={()=>handleUpdateCartItem(-1)} disabled={data?.quantity <= 1} >
                        <RemoveCircleOutlineIcon />
                    </IconButton>

                    <span className=' py-1 px-7 border rounded-sm'>{data?.quantity}</span>
                    <IconButton onClick={()=>handleUpdateCartItem(1)} sx={{ color: 'RGB(145 85 253)' }}>
                        <AddCircleOutlineIcon />
                    </IconButton>

                </div>

                <div>
                    <Button onClick={handleRemoveCartProduct} sx={{ color: 'red' }}>remove</Button>
                </div>
            </div>
        </div>
    )
}

export default CartItem