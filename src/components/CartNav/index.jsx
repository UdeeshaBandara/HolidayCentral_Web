import * as React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

import FlightDetail from "../FlightDetail";

import {
    Divider, Drawer, List,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Colors } from "../../Theme/Variables";

export default function CartNav() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpen(open);
    };
    const {
        totalUniqueItems,
        items,
        cartTotal
    } = useCart();
    return (
        <>
            <React.Fragment key={'right'}>
                <Box onClick={toggleDrawer('right', true)} sx={{ mr: 3, position: 'relative', }}>
                    <Typography
                        noWrap
                        sx={{
                            position: 'absolute',
                            backgroundColor: 'red',
                            borderRadius: 50,
                            height: '90%',
                            width: '100%',
                            top: '-30%',
                            left: '70%',
                            textAlign: "center",
                            fontFamily: 'regular',
                            fontWeight: 700,
                            color: 'inherit',
                        }}
                    >
                        {totalUniqueItems}
                    </Typography>
                    <ShoppingCartIcon />
                </Box>
                <Drawer
                    anchor={'right'}
                    open={isOpen}
                    onClose={toggleDrawer(false)}
                ><Box
                    sx={{ width: "100%" }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                        <List>
                            {items.map((text, index) => (
                                <Grid sx={{ mx: 2 }}> <FlightDetail key={index} item={text} isCart={true} /></Grid>

                            ))}
                        </List>
                        <Divider />
                        <Grid container direction="column" alignItems="flex-end" justifyContent='center'
                            sx={{
                                pt: 5,
                                gap: 2,
                            }}
                        >
                            <Grid item>
                                <Grid container direction="row" justifyContent='flex-end' alignItems="center">
                                    <Typography
                                        variant="body2"
                                        align="left"
                                        color={Colors.gray002}
                                    >
                                        Subtotal </Typography><Typography
                                            sx={{
                                                px: 2
                                            }}
                                            variant="body2"
                                            align="left"
                                            color={Colors.primaryBlack}
                                        > ${cartTotal}</Typography>

                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" justifyContent='flex-end' alignItems="center">
                                    <Typography
                                        variant="body2"
                                        align="left"
                                        color={Colors.gray002}
                                    >
                                        Taxes and Fees </Typography><Typography
                                            sx={{
                                                px: 2
                                            }}
                                            variant="body2"
                                            align="left"
                                            color={Colors.primaryBlack}
                                        > ${cartTotal * 0.15}</Typography>

                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" justifyContent='flex-end' alignItems="center">
                                    <Typography
                                        variant="body2"
                                        align="left"
                                        color={Colors.gray002}
                                    >
                                        Total </Typography><Typography
                                            sx={{
                                                px: 2
                                            }}
                                            variant="body2"
                                            align="left"
                                            color={Colors.primaryBlack}
                                        > ${(cartTotal + cartTotal * 0.15)}</Typography>

                                </Grid>
                            </Grid>
                            <Button variant="outlined" size="large" endIcon={<ShoppingCartCheckoutIcon sx={{
                                width: 30, height: 30,
                            }} />} onClick={() => navigate('/flight-checkout')} sx={{
                                textTransform: "none",
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 50,
                                border: 1,
                                fontSize: 14,
                                fontWeight: 'light',
                                mr: 1
                            }}>
                                Checkout
                            </Button>
                        </Grid>
                    </Box>
                </Drawer>
            </React.Fragment></>);
}
