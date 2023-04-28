import * as React from 'react';
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, Drawer,
    FormControl,
    InputLabel, List,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    Select,
    Typography
} from "@mui/material";
import {Colors} from "../../Theme/Variables";
import Button from "@mui/material/Button";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {CartProvider, useCart} from "react-use-cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


export default function CartNav({children}) {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };
    const {
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal
    } = useCart();
    return (
        <>
            <React.Fragment key={'right'}>

                <Box onClick={toggleDrawer('right', true)} sx={{mr: 3, position: 'relative',}}>
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
                    <ShoppingCartIcon/>
                </Box>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                ><Box
                    sx={{width: "100%"}}
                    role="presentation"
                    onClick={toggleDrawer('right', false)}
                    onKeyDown={toggleDrawer('right', false)}
                >
                    <List>
                        {items.map((text, index) => (
                            <ListItem key={text.id} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={text.name}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
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
                            > ${cartTotal*0.15}</Typography>

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
                            > ${(cartTotal+ cartTotal*0.15)}</Typography>

                            </Grid>
                        </Grid>

                    </Grid>


                </Box>
                </Drawer>
            </React.Fragment></>);
}
