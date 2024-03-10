import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = ({ revData, ratings }) => {


    const dateString = ratings.createdAt;
    const date = new Date(dateString);

    // Get the date, month, and day
    const day = date.getDate(); // Get the day (1-31)
    const month = date.toLocaleString('default', { month: 'long' }); // Get the month name (e.g., March)
    const year = date.getFullYear(); // Get the year (e.g., 2024)

    // Concatenate them into a single variable
    const formattedDate = `${day} ${month} ${year}`;


    const ratingValue = ratings.rating
    return (
        <div className='px-4 py-3 border border-gray-400 rounded-md'>
            <Grid container spacing={{ xs: 1, sm: 2 }} gap={{ xs: 1, sm: 5 }}>
                <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
                    <Box>
                        <Avatar className=' text-white ' sx={{ width: 56, height: 56, bgcolor: '#9155fd', mx: 'auto' }}>
                            {ratings.user.firstName.slice(0, 1).toUpperCase()}
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9} sx={{ mb: '20px', marginRight: '20px' }}>
                    <div className=' space-y-2'>
                        <div>
                            <p className=' font-semibold text-lg my-2'>{ratings.user.firstName.toUpperCase()} {ratings.user.lastName.toUpperCase()}</p>
                            <p className=' opacity-70 my-2'>{formattedDate}</p>
                        </div>
                    </div>

                    <Rating readOnly value={ratingValue} name='half-rating' precision={.5} />

                    <p>{revData?.review}</p>
                </Grid>
            </Grid>

        </div>
    )
}

export default ProductReviewCard