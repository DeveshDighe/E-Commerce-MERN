import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const steps = [
    "placed",
    "Order Confirmed",
    "Shipped",
    "Out For Delivery",
    "Delivered"
];

const OrderTracker = ({ activeStep }) => {
    return (
        <div className='w-full max-sm:w-full overflow-x-auto'>
            <Stepper activeStep={activeStep} alternativeLabel style={{ width: '100%' }}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel style={{ marginBottom: '20px' }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};

export default OrderTracker;

