import * as React from 'react';

import { useCart } from "react-use-cart";

import FlightDetail from "../../../components/FlightDetail";

import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function Review({ personalDetails }) {

    const { items, cartTotal } = useCart();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Booking summary
            </Typography>
            <List disablePadding>

                {items.map((item, idx) => (
                    <FlightDetail key={idx} item={item} isCart={true} />
                ))}

                <ListItem sx={{ py: 1, px: 0 }}>
                    <ListItemText primary="Total" />
                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        ${(cartTotal + cartTotal * 0.15)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Personal details
                    </Typography>
                    <Grid container>
                        <React.Fragment>
                            <Grid item xs={6}>
                                <Typography gutterBottom>First Name</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{personalDetails.firstName}</Typography>
                            </Grid> <Grid item xs={6}>
                                <Typography gutterBottom>Last Name</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{personalDetails.lastName}</Typography>
                            </Grid> <Grid item xs={6}>
                                <Typography gutterBottom>Email</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{personalDetails.email}</Typography>
                            </Grid> <Grid item xs={6}>
                                <Typography gutterBottom>Phone number</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography gutterBottom>{personalDetails.phone}</Typography>
                            </Grid>
                        </React.Fragment>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}
