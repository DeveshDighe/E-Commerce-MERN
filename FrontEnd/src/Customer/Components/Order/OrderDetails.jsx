import React, { useEffect } from 'react'
import AddressCard from '../CheckOut/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Grid } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StartBorderIcon from '@mui/icons-material/StarBorder'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action'
import { useDispatch, useSelector } from 'react-redux'
import FadeLoader from 'react-spinners/FadeLoader'

const OrderDetails = () => {
    const { orderId } = useParams()
    const dispatch = useDispatch()
    const orderIdData = useSelector(store => store.order)
    const authData = useSelector(store => store.auth)
    const navigate = useNavigate();

    const orderDate = new Date(orderIdData?.order?.orderDate);
    const plusOneDay = new Date(orderDate); // Create a new Date object
    plusOneDay.setHours(orderDate.getHours() + 24); // Modify the new Date object
    const CurrentDate = new Date(Date.now())



    useEffect(() => {
        if (orderId) {
            dispatch(getOrderById(orderId))
        }
    }, [orderId])

    return (
        <div className=' lg:px-20 px-5'>
            <div>
                <h1 className=' font-bold text-xl py-6'>Delivery Address</h1>
                <AddressCard itemData={orderIdData?.order} />
            </div>

            <div className=' py-20'>
                <OrderTracker activeStep={plusOneDay < CurrentDate ? 6 : 3} />
            </div>

            <Grid container className='space-y-5'>
  {orderIdData?.order?.orderItems.length > 0 ? (
    orderIdData?.order?.orderItems.map((items) => (
      <Grid
        key={items.product._id}
        onClick={() => navigate(`/Product/${items.product._id}`)}
        item
        container
        className='shadow-xl rounded-md p-5 border cursor-pointer'
        sx={{ alignItems: "center", justifyContent: 'space-between' }}
      >
        <Grid item xs={12} md={6}>
          <div className='flex items-center'>
            <img className='w-[6rem] h-[7rem] object-cover object-top' src={items.product.imageUrl} alt="" />
            <div className='space-y-2 ml-5'>
              <p className='font-semibold'>{items.product.title}</p>
              <p className='space-x-5 opacity-50 text-xs font-semibold'><span>Quantity: {items.quantity}</span> <span>Size: {items.size}</span></p>
              <p>Brand : {items.product.brand}</p>
              <p>₹{items.discountedPrice}</p>
            </div>
          </div>
        </Grid>

        <Grid item>
          <Box sx={{ color: deepPurple[500] }} className='mt-0 max-md:mt-6'>
            <StartBorderIcon sx={{ fontSize: '2rem' }} className='px-2 text-5xl' />
            <span className=''>Rate & Review Product</span>
          </Box>
        </Grid>
      </Grid>
    ))
  ) : (
    <div className=' flex items-center justify-center w-full'>
    <FadeLoader
      color="RGB(150 146 238)"
      loading={true}
      speedMultiplier={2}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
    </div>
  )}
</Grid>

        </div>
    )
}

export default OrderDetails