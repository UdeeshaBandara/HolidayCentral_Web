import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import {useCart} from "react-use-cart";
import FlightDetail from "../../../components/FlightDetail";

const products = [
    {
        name: 'Product 1',
        desc: 'A nice thing',
        price: '$9.99',
    },
    {
        name: 'Product 2',
        desc: 'Another thing',
        price: '$3.45',
    },
    {
        name: 'Product 3',
        desc: 'Something else',
        price: '$6.51',
    },
    {
        name: 'Product 4',
        desc: 'Best thing of all',
        price: '$14.11',
    },
    {name: 'Shipping', desc: '', price: 'Free'},
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
    {name: 'Card type', detail: 'Visa'},
    {name: 'Card holder', detail: 'Mr John Smith'},
    {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
    {name: 'Expiry date', detail: '04/2024'},
];

export default function Review({personalDetails}) {

    const {addItem, items, cartTotal} = useCart();

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Booking summary
            </Typography>
            <List disablePadding>

                {items.map((item, idx) => (
                    <FlightDetail key={idx} item={item} isCart={true}/>
                ))}

                <ListItem sx={{py: 1, px: 0}}>
                    <ListItemText primary="Total"/>
                    <Typography variant="subtitle1" sx={{fontWeight: 700}}>
                        ${(cartTotal + cartTotal * 0.15)}
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={2}>
                <Grid item container direction="column" xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{mt: 2}}>
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
