import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserOrder } from '../../../State/Order/Action'
import NothingToShow from '../NothingToShow/NothingToShow'

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
    { label: "Cancel", value: "cancelled" },
    { label: "Return", value: "return" },
]

const Order = () => {

    const dispatch = useDispatch()
    const allOrderHistory = useSelector(store => store.order)



    useEffect(() => {
        dispatch(getAllUserOrder())
    }, [])

    // useEffect(()=>{
    //     console.log(allOrderHistory, 'allOrderHistory');
    // },[allOrderHistory])


    return (
        <div className=' lg:px-20 px-5 mt-5'>
            <Grid container sx={{ justifyContent: 'space-between' }}>

                <Grid item xs={2.5}>
                    <div className=' h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className=' font-bold text-lg'>Filter</h1>
                        <div className=' space-y-4 mt-10'>
                            <h1 className=' font-semibold'>ORDER STATUS</h1>

                            {orderStatus.map((option) => (

                                <div className=' flex items-center '>
                                    <input disabled defaultValue={option.value} type="checkbox" className=' cursor-not-allowed h-4 w-4 border-gray-300 text-indigo-600  focus:ring-indigo-500' />
                                    <label className=' ml-3 line text-sm cursor-not-allowed text-gray-600' htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sm={9}>
                    {allOrderHistory.orders.length > 0 ?
                        <div className='space-y-5'>
                            {allOrderHistory?.orders?.map((everyArr) =>
                                everyArr?.orderItems.map((item) => <OrderCard item={item} everyArr={everyArr} />)
                            )}
                        </div>
                        :
                        <div className=' h-96'>
                            <NothingToShow />
                        </div>
                    }
                </Grid>


            </Grid>
        </div>
    )
}

export default Order