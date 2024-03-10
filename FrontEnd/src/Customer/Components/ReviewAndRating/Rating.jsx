import * as React from 'react';
import Box from '@mui/material/Box';
import MuiRating from '@mui/material/Rating'; // Renamed to MuiRating to avoid naming conflict
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { addRatingForProduct, addReviewForProduct } from '../../../State/Product/Action';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import toast from 'react-hot-toast';

export default function RatingComponent({ productId, setUserReviewed }) { // Renamed the component to RatingComponent
    const [value, setValue] = React.useState(null);

    const reviewValue1 = useRef(null)
    const dispatch = useDispatch();


    const addRatingReview = async (e) => { // Renamed to updateValue
        e.preventDefault();
        if (value == null) {
            return toast.error('Rating is required')
        }

        const reviewDataForm = new FormData(e.currentTarget)

        const review = {
            reviewData: reviewDataForm.get('review')
        }



        const data = { productId, rating: value }
        const revData = { productId, review: review.reviewData }
        dispatch(addRatingForProduct(data))
        dispatch(addReviewForProduct(revData))
        setUserReviewed(true)

        toast.success('Review and Rating Posted')

    }

    return (
        <>
            <form className=' w-[30rem] border border-gray-400 p-4 rounded-lg' onSubmit={addRatingReview} >
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <div className=' flex justify-between my-4'>

                        <MuiRating // Changed to MuiRating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />

                        <Typography style={{ fontSize: '18px', color: 'RGB(81 81 81)' }} component="legend"> Give Rating</Typography>

                    </div>
                </Box>

                <div className=' w-full'>
                    <TextField className='w-full' type='textarea' required id='review' name='review' label='Review' multiline rows={4} inputRef={reviewValue1} />
                </div>
                <div className=' w-full flex justify-center'>
                    <button type='submit' className=' px-6 border hover:bg-slate-500 bg-slate-800 text-white py-1 rounded-md  mt-3' >Add Rating</button> {/* Renamed to updateValue */}
                </div>
            </form >
        </>
    );
}
