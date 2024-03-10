import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useLocation } from 'react-router-dom';
import AddDeliveryAdd from './AddDeliveryAdd';
import OrderSummary from './OrderSummary';

const steps = ['Login', 'Add Delivery Address', 'Order Summary', 'Payment'];

export default function CheckOut() {
    const [activeStep, setActiveStep] = React.useState(0);
    const location = useLocation();
    
    const querySearch = new URLSearchParams(location.search);
    let step = parseInt(querySearch.get("step") || '0');

    return (
        <Box sx={{ p: 2 }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} md={10} lg={8}>
                    <Stepper activeStep={step-1} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ mt: 2 }}>
                        {activeStep === steps.length ? (
                            <Typography sx={{ mt: 2, mb: 1 }} variant="subtitle1">
                                All steps completed - you're finished
                            </Typography>
                        ) : (
                            <div className='mt-20'>
                                {step === 2 ? <AddDeliveryAdd /> : <OrderSummary />}
                            </div>
                        )}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
