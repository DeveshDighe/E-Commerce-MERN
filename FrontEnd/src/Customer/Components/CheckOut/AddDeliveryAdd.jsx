import { Box, Button, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from './AddressCard'
import { useDispatch } from 'react-redux'
import { createOrder } from '../../../State/Order/Action'
import { useNavigate } from 'react-router-dom'

const AddDeliveryAdd = () => {

const dipatch = useDispatch();
const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)



        const address = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            streetAddress: data.get('address'),
            city: data.get('city'),
            state: data.get('state'),
            zipCode: data.get('zip'),
            mobile: data.get('phoneNumber'),
        }


        const orderData = {address, navigate}
        dipatch(createOrder(orderData))
    }

    return (
        <div className=' flex justify-center'>
            <Grid container spacing={4} className=' flex justify-center' >
                {/* <Grid xs={12} lg={5} className=' border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>

                    <div className=' p-5 py-7 border-b cursor-pointer'>
                        <AddressCard  />
                        <Button sx={{ mt: 2, bgcolor: 'RGB(145 85 253)' }} size='large' variant='contained'>Delivery Here</Button>
                    </div>

                </Grid> */}

                <Grid item xs={12} lg={7}  >
                    <Box className=' border rounded-s-md shadow-md mt-[-32px] p-5'>

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField required id='firstName' name='firstName' label='firstName' fullWidth autoComplete='given-name' />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField required id='lastName' name='lastName' label='lastName' fullWidth autoComplete='given-name' />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField required id='address' name='address' label='address' fullWidth autoComplete='given-name' multiline rows={4} />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField required id='city' name='city' label='city' fullWidth autoComplete='given-name' />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField required id='state' name='state' label='state' fullWidth autoComplete='given-name' />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField required id='zip' name='zip' label='zip / Postal Code' fullWidth autoComplete='shipping postal-code'  type='number' />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField required id='phoneNumber' name='phoneNumber' label='Phone Number' fullWidth autoComplete='tel' />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button sx={{ mt: 2, bgcolor: 'RGB(145 85 253)' }} size='large' variant='contained' type='submit'>Delivery Here</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default AddDeliveryAdd