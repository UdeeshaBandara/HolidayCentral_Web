import Box from "@mui/material/Box";
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    ListItem,
    Select,
    Typography
} from "@mui/material";
import {Colors} from "../../Theme/Variables";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import Plane from "../../Assets/SVGIcons/Plane";
import MenuItem from "@mui/material/MenuItem";
import {CartProvider, useCart} from "react-use-cart";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {useNavigate} from "react-router-dom";

export default function FlightDetail({item, isCart = false, cabin_type=''}) {
    const {addItem, removeItem, totalUniqueItems} = useCart();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [seat, setSeat] = useState('');
    const [meal, setMeal] = useState('');
    const handleClickOpen = () => {


        setOpen(true);
    };

    const handleSubmit = () => {
        setOpen(false);
        item.id = item._id;
        item.meal = meal;
        item.seat = seat;
        item.cabin_type = cabin_type;
        addItem(item);
    };
    return (


        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            py: 2,
            px: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E9E8FC',
            borderRadius: 3
            , gap: 2
        }}>
            <Box
                component="img"
                sx={{
                    width: 50, height: 50,
                }}
                src={item.airlineImage}
            />

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    {item.flightNo}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >          {item.airline}

                </Typography>

            </Box>
            {!isCart ? <Grid> <Typography
                variant="body2"
                align="center"
                color="grey.700"
            >
                {item.flightNo}
            </Typography>
                <Box sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                    flexBasis: 0,

                }}>
                    <Typography
                        variant="body2"
                        align="center"
                        color="grey.700"
                    >
                        1 stop
                    </Typography>
                    <Typography
                        variant="body2"
                        align="center"
                        color={Colors.gray002}
                    >
                        {Math.floor(item.duration / 60)} Hours {item.duration % 60 !== 0 ? item.duration % 60 + ' minutes' : null}
                    </Typography>

                </Box></Grid> : <Typography
                variant="body2"
                align="center"
                color={Colors.gray002}
            >
                Quantity {item.quantity}
            </Typography>}
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    $ {item.price}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    round trip
                </Typography>

            </Box>

            <Grid item xs={11} sm={3} md={1.5}>
                {isCart ? <Button variant="outlined" size="large" endIcon={<RemoveCircleOutlineIcon sx={{
                    width: 15, height: 15
                }}/>} onClick={() => {
                    removeItem(item.id)
                    if (totalUniqueItems === 1)
                        navigate('/');

                }} sx={{
                    textTransform: "none",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    border: 1,
                    fontSize: 14,
                    fontWeight: 'light'
                }}>
                    remove
                </Button> : <Button variant="outlined" size="large" endIcon={<AddShoppingCartIcon sx={{
                    width: 30, height: 30
                }}/>} onClick={handleClickOpen} sx={{
                    textTransform: "none",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    border: 1,
                    fontSize: 14,
                    fontWeight: 'light'
                }}>
                    Add to cart
                </Button>}
            </Grid>
            <Dialog fullWidth={true}
                    maxWidth={"md"} open={open}>
                <Grid container direction="row" alignItems="center" justifyContent='center'
                      sx={{
                          gap: 2,

                      }}
                > <Grid item>

                    <Plane width={580} height={500}/>

                </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" justifyContent='center'
                              sx={{
                                  gap: 2,
                              }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="Seat Type">Seat Type</InputLabel>
                                <Select
                                    labelId="seat"
                                    id="seat-select"
                                    value={seat}
                                    label="Seat Type"
                                    onChange={(event) => {
                                        setSeat(event.target.value);
                                    }}
                                >
                                    <MenuItem value='Basic Widow'>Basic Widow</MenuItem>
                                    <MenuItem value='Isle'>Isle</MenuItem>
                                    <MenuItem value='Middle'>middle</MenuItem>
                                </Select>
                            </FormControl> <FormControl fullWidth>
                            <InputLabel id="Meal">Meal</InputLabel>
                            <Select
                                labelId="meal"
                                id="meal-select"
                                value={meal}
                                label="Meal"
                                onChange={(event) => {
                                    setMeal(event.target.value);
                                }}
                            >
                                <MenuItem value='AVML'>AVML</MenuItem>
                                <MenuItem value='BBML'>BBML</MenuItem>
                                <MenuItem value='DBML'>DBML</MenuItem>
                                <MenuItem value='HFML'>HFML</MenuItem>
                                <MenuItem value='JPML'>JPML</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        <DialogActions>
                            <Button onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={handleSubmit}>Add to cart</Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        </Box>);
}
