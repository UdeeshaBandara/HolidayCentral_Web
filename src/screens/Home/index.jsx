import * as React from 'react';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Map from "../../Assets/SVGIcons/Map";
import Box from "@mui/material/Box";
import {Autocomplete, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import Departure from "../../Assets/SVGIcons/Departure";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

const theme = createTheme();

export default function Home() {


    return (
        <ThemeProvider theme={theme}>
        <Box   sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        }}>
            <Box
                sx={{
                    my: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    position: "relative",

                }}
            >
                <Map/>

            </Box>
            <Typography
                variant="h1"
                align="left"
                color="grey.700"
                sx={{
                    position: "absolute",
                    top: "20%",
                    width: "100%",
                    textAlign: "center",
                    backgroundColor: "primary",
                    backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontFamily: 'bold'
                }}
            >
                It’s more than{'\n'}just a trip
            </Typography>
            <Box
                sx={{
                    px: 10,
                    top: "40%",
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: "absolute",
                    flex: 1,
                    width: '100%',
                    gap:5
                }}
            >
                <Autocomplete
                    id="departure"
                    freeSolo
                    sx={{flex: 1}}
                    options={['sample', 'sample1']}
                    renderInput={(params) => <TextField {...params} label="Departure"/>}
                />
                <Autocomplete
                    id="arrival"
                    freeSolo
                    sx={{flex: 1,}}
                    options={['sample', 'sample1']}
                    renderInput={(params) => <TextField {...params} label="Arrival"/>}/>

                <DateRangePicker sx={{flex: 1,}} localeText={{start: 'Departure Date', end: 'Arrival Date'}}/>

                <Autocomplete
                    id="cabin"
                    freeSolo
                    sx={{flex: 1,}}
                    options={['sample', 'sample1']} renderInput={(params) => <TextField {...params} label="Cabin"/>}/>
                <Autocomplete
                    id="airline"
                    freeSolo
                    sx={{flex: 1,}}
                    options={['sample', 'sample1']}
                    renderInput={(params) => <TextField {...params} label="Airline (Optional)"/>}/>


            </Box>
            <Button variant="outlined" size="large" endIcon={<SendIcon />}  sx={{
                textTransform: "none",
                top: "50%",
                alignItems: 'center',
                justifyContent: 'center',
                position: "absolute",
            }}>
                Search
            </Button>
        </Box>
        </ThemeProvider>
    )
        ;
}
