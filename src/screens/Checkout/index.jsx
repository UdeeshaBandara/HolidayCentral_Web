import * as React from 'react';
import { useState } from "react";
import env from "react-dotenv";

import { Alert, Snackbar } from "@mui/material";
import { useCart } from "react-use-cart";
import CssBaseline from '@mui/material/CssBaseline';

import AddressForm from './AddressForm';
import Review from './Review';
import MainAppBar from "../../components/AppBar";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import useToken from "../../hooks/useToken";


const steps = ['Personal Details', 'Review your booking'];


const theme = createTheme();

export default function Checkout() {
    const {token} = useToken();

    const [activeStep, setActiveStep] = useState(0);
    const [personalDetails, setPersonalDetails] = useState({ firstName: '', lastName: '', email: "", phone: '' });
    const [alertState, setAlertState] = useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const { vertical, horizontal, isOpen, message } = alertState;
    const {
        items, emptyCart
    } = useCart();
    const handleNext = () => {

        if (activeStep === 0) {
            validateUserInputs();
        } else if (activeStep === steps.length - 1) {
            items.forEach(async (item) => {
                if (item.type === "flight"){
                    await saveReservation(item);
                } else if (item.type === "package") {
                    await savePackageReservation(item);
                }
            });
            setActiveStep(activeStep + 1);
            emptyCart();
        }

    };
    const saveReservation = async (item) => {
        let response = await fetch(`${env.BASE_URL}flight/book`, {
            method: 'POST', body: JSON.stringify({
                flight_id: item.id,
                meal_type: item.meal,
                cabin_type: item.cabin_type,
                seat_type: item.seat,
                first_name: personalDetails.firstName,
                last_name: personalDetails.lastName,
                email: personalDetails.email,
                phone: personalDetails.phone,
                pax: item.quantity,
                price: item.price
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        });
        let data = await response.json();
        return data.status;

    };
    const savePackageReservation = async (item) => {
        let response = await fetch(`${env.BASE_URL}packages/reserve`, {
            method: 'POST', body: JSON.stringify({
                package_id: item.package_id,
                package_destination: item.package_destination,
                package_duration: item.package_duration,
                package_travelers_count: item.package_travelers_count,
                package_speciality: item.package_speciality,
                package_price: item.package_price,
                package_rating: item.package_rating
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        });
        let data = await response.json();
        return data.status;

    };
    const validateUserInputs = () => {
        if (personalDetails.firstName === '' || personalDetails.firstName === null) {
            setAlertState({
                ...alertState,
                message: 'Please enter first name',
                isOpen: true
            });
        } else if (personalDetails.lastName === '' || personalDetails.lastName === null) {
            setAlertState({
                ...alertState,
                message: 'Please enter last name',
                isOpen: true
            });
        } else if (personalDetails.email === '' || personalDetails.email === null) {
            setAlertState({
                ...alertState,
                message: 'Please enter email',
                isOpen: true
            });
        } else if (personalDetails.phone === '' || personalDetails.phone === null) {
            setAlertState({
                ...alertState,
                message: 'Please enter phone number',
                isOpen: true
            });
        } else setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <AddressForm personalDetails={personalDetails}
                    setPersonalDetails={setPersonalDetails}></AddressForm>;
            case 1:
                return <Review personalDetails={personalDetails}></Review>;
            default:
                throw new Error('Unknown step');
        }
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainAppBar />
            <Container component="main" maxWidth="sm" sx={{ mb: 4, pt: 10 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <React.Fragment>
                            <Typography variant="h5" gutterBottom>
                                Thank you for your booking.
                            </Typography>
                            <Typography variant="subtitle1">
                                Please check your email for more information. Thank you for using the platform.
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {getStepContent(activeStep)}
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    {activeStep === steps.length - 1 ? 'Confirm & Pay' : 'Next'}
                                </Button>
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                <Snackbar
                    autoHideDuration={6000}
                    anchorOrigin={{ vertical, horizontal }}
                    open={isOpen}
                    onClose={() => setAlertState({ ...alertState, isOpen: false })}
                    key={vertical + horizontal}
                >
                    <Alert severity="error">{message}</Alert>
                </Snackbar>

            </Container>
        </ThemeProvider>
    );
}
