import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUserOrder } from '../../../State/Order/Action'
import NothingToShow from '../NothingToShow/NothingToShow'
import style from '../Product/ProductCard.module.css'
import { useNavigate } from 'react-router-dom'

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delivered" },
]
const orderStatusAll = [
    { label: "All orders", value: "All_orders" },
]

const Order = () => {

    const dispatch = useDispatch()
    const allOrderHistory = useSelector(store => store.order)

    const navigate = useNavigate()

    const [orderCurrentStatus, setorderCurrentStatus] = useState([])

    useEffect(() => {
      setorderCurrentStatus([...orderCurrentStatus, 'All_orders'])
    }, [])
    


    const handleOrderStatus = (value) => {
        if (orderCurrentStatus.includes(value)) {
            let removedStatus = orderCurrentStatus.filter((orderStatus) => orderStatus != value)
            setorderCurrentStatus(removedStatus)
        } else {
            setorderCurrentStatus([...orderCurrentStatus, value])
        }

    }

    useEffect(() => {
        dispatch(getAllUserOrder())
    }, [])

    // useEffect(()=>{
    //     console.log(allOrderHistory, 'allOrderHistory');
    // },[allOrderHistory])


    return (
        <div className=' lg:px-20 px-5 mt-10'>
            <Grid container className=' gap-6' sx={{ justifyContent: { xs: 'space-between', sm: 'center' } }} >

                <Grid item xs={12} sm={12} md={2.5} >
                    <div className=' h-auto shadow-lg bg-white p-5 sticky top-5'>
                        <h1 className=' font-bold text-lg'>Filter</h1>
                        <div className=' space-y-4 mt-10'>
                            <h1 className=' font-semibold'>ORDER STATUS</h1>

                            {orderStatus.map((option) => (

                                <div key={option.value} className=' flex items-center '>
                                    <input defaultValue={option.value} onClick={() => handleOrderStatus(option.value)} id={option.value} type="checkbox" className=' h-4 w-4 border-gray-300 text-indigo-600  focus:ring-indigo-500 cursor-pointer' />
                                    <label className=' ml-3 line text-sm cursor-pointer  text-gray-600' htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                            {orderStatusAll.map((option) => (

                                <div key={option.value} className=' flex items-center '>
                                    <input defaultValue={option.value} defaultChecked onClick={() => handleOrderStatus(option.value)} id={option.value} type="checkbox" className=' h-4 w-4 border-gray-300 text-indigo-600  focus:ring-indigo-500 cursor-pointer' />
                                    <label className=' ml-3 line text-sm cursor-pointer  text-gray-600' htmlFor={option.value}>
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} sm={12} md={9}>
                    {allOrderHistory.orders.length > 0 ?
                        <div className='space-y-5'>
                            {allOrderHistory?.orders?.map((everyArr) => {
                                const orderDate = new Date(everyArr.orderDate);
                                const plusOneDay = new Date(orderDate);
                                plusOneDay.setHours(orderDate.getHours() + 24);

                                const isDelivered = orderCurrentStatus.includes('delivered');
                                const isPending = orderCurrentStatus.includes('on_the_way');
                                const isAllProducts = orderCurrentStatus.includes('All_orders');

                                if ((isDelivered && plusOneDay < Date.now()) || (isPending && plusOneDay > Date.now()) || isAllProducts) {
                                    return (
                                        <div key={everyArr._id} onClick={() => navigate(`/account/order/${everyArr._id}`)} className={`border flex gap-y-4 flex-col p-4 rounded-lg border-gray-300 ${style.OrderShadow} cursor-pointer`}>
                                            {everyArr.orderItems.map((item) => <OrderCard item={item} everyArr={everyArr} />)}
                                        </div>
                                    );
                                } else {
                                    return null; // Don't render if conditions are not met
                                }
                            })}

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