import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm({personalDetails, setPersonalDetails}) {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Booking address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        variant="standard"
                        onChange={(event) => setPersonalDetails({...personalDetails, firstName: event.target.value})}


                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        variant="standard"
                        onChange={(event) => setPersonalDetails({...personalDetails, lastName: event.target.value})}

                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        onChange={(event) => setPersonalDetails({...personalDetails, email: event.target.value})}

                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="phone"
                        name="phone"
                        label="Phone number *"
                        fullWidth
                        type='number'
                        variant="standard"

                        onChange={(event) => setPersonalDetails({...personalDetails, phone: event.target.value})}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
