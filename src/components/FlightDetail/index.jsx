import Box from "@mui/material/Box";
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {ListItem, Typography} from "@mui/material";
import {Colors} from "../../Theme/Variables";

export default function FlightDetail({index}) {



    return (


            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                py: 5
            }} >
                <AirLineIcon sx={{
                    width: 100,
                    height: 100,

                }}/>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1

                }}>
                    <Typography
                        variant="body2"
                        align="left"
                        color="grey.700"
                    >
                        16h 45m
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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1

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
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1

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
            </Box>
    );
}
