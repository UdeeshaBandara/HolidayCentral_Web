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
import {useState} from "react";
import Plane from "../Plane";
import MenuItem from "@mui/material/MenuItem";
import { CartProvider, useCart } from "react-use-cart";
export default function FlightDetail({item}) {
    const { addItem } = useCart();
    const [open, setOpen] = useState(false);
    const [age, setAge] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        addItem(item);
    };
    return (


        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            py: 2,
            px: 5,
            mx: 5,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: '#E9E8FC',
            borderRadius: 3
        }}>
            <AirLineIcon sx={{
                width: 100, height: 100,

            }}/>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1

            }}>
                <Typography
                    variant="body2"
                    align="left"
                    color="grey.700"
                >
                    FIG4312
                </Typography>
                <Typography
                    variant="body2"
                    align="left"
                    color={Colors.gray002}
                >
                    Hawaiian Airlines
                </Typography>

            </Box>
            <Typography
                variant="body2"
                align="left"
                color="grey.700"
            >
                16h 45m
            </Typography>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1

            }}>
                <Typography
                    variant="body2"
                    align="left"
                    color="grey.700"
                >
                    1 stop
                </Typography>
                <Typography
                    variant="body2"
                    align="left"
                    color={Colors.gray002}
                >
                    2h 45m in HNL
                </Typography>

            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1

            }}>
                <Typography
                    variant="body2"
                    align="left"
                    color="grey.700"
                >
                    $624
                </Typography>
                <Typography
                    variant="body2"
                    align="left"
                    color={Colors.gray002}
                >
                    round trip
                </Typography>

            </Box>

            <Grid item xs={11} sm={3} md={1.5}>
                <Button variant="outlined" size="large" endIcon={<AddShoppingCartIcon sx={{
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
                </Button>
            </Grid>
            <Dialog      fullWidth={true}
                         maxWidth={"md"} open={open} onClose={handleClose}>
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
                                    value={age}
                                    label="Seat Type"
                                    onChange={(event) => {
                                        setAge(event.target.value);
                                    }}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl> <FormControl fullWidth>
                            <InputLabel id="price">Meal</InputLabel>
                            <Select
                                labelId="meal"
                                id="meal-select"
                                value={age}
                                label="Meal"
                                onChange={(event) => {
                                    setAge(event.target.value);
                                }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleClose}>Add to cart</Button>
                        </DialogActions>
                    </Grid>
                </Grid>
            </Dialog>
        </Box>);
}
