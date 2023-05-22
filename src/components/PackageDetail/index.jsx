import {useNavigate} from "react-router-dom";
import {useCart} from "react-use-cart";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Typography,} from "@mui/material";
import Grid from "@mui/material/Grid";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import {Colors} from "../../Theme/Variables";

export default function PackageDetail({item, isCart = false}) {
    const {addItem, removeItem, totalUniqueItems} = useCart();
    const navigate = useNavigate();

    const handleSubmit = () => {
        item.type = "package"
        item.id = item.package_id;
        item.price = item.package_price;
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
                src={"https://i.ibb.co/CwpZYrm/travel-icon.webp"}
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
                    {item.package_travelers_count}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Travelers Count
                </Typography>

            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    {item.package_destination}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Destination
                </Typography>

            </Box>

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    {item.package_duration} Days
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Duration
                </Typography>

            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    {item.package_speciality.join(', ')}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Package Speciality
                </Typography>

            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    ⭐️ {item.package_rating}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Ratings
                </Typography>

            </Box>
            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1,
                flexBasis: 0,

            }}>
                <Typography
                    variant="body2"
                    align="center"
                    color="grey.700"
                >
                    $ {item.package_price}
                </Typography>
                <Typography
                    variant="body2"
                    align="center"
                    color={Colors.gray002}
                >
                    Price
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
                }}/>} onClick={handleSubmit} sx={{
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
        </Box>);
}
