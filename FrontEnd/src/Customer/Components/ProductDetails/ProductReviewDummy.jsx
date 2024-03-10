import { Avatar, Box, Grid, Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = ({ revData, ratings }) => {
    // Dummy data
    const dummyRatings = {
        user: {
            firstName: 'Arjun',
            lastName: 'Dev'
        },
        createdAt: '2024-03-06T19:55:03.433Z',
        rating: 4.5
    };

    const dummyRevData = {
        review: 'Great product, highly recommended!'
    };

    // Extracting dummy data
    const { user, createdAt, rating } = dummyRatings;
    const { review } = dummyRevData;

    // Formatting date
    const date = new Date(createdAt);
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;

    return (
        <div className='px-4 py-3 border border-gray-400 rounded-md'>
            <Grid container spacing={{ xs: 1, sm: 2 }} gap={{ xs: 1, sm: 5 }}>
                <Grid item xs={12} sm={1} sx={{ textAlign: 'center' }}>
                    <Box>
                        <Avatar className=' text-white ' sx={{ width: 56, height: 56, bgcolor: '#9155fd', mx: 'auto' }}>
                            {user.firstName.slice(0, 1).toUpperCase()}
                        </Avatar>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={9} sx={{ mb: '20px', marginRight: '20px' }}>
                    <div className=' space-y-2'>
                        <div>
                            <p className=' font-semibold text-lg my-2'>{user.firstName} {user.lastName}</p>
                            <p className=' opacity-70 my-2'>{formattedDate}</p>
                        </div>
                    </div>

                    <Rating readOnly value={rating} name='half-rating' precision={.5} />

                    <p>{review}</p>
                </Grid>
            </Grid>

        </div>
    )
}

export default ProductReviewCard;
