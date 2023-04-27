import * as React from 'react';
import {createTheme} from '@mui/material/styles';
import Map from "../../Assets/SVGIcons/Map";
import {Autocomplete, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MainAppBar from "../../components/AppBar";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

export default function Home() {
    const navigate = useNavigate()

    return (
        <Grid>
            <MainAppBar/>
            <Grid container direction="column" alignItems="center" component="main" sx={{
                width: '100%',
                overflowY: "scroll",
            }}>
                <Grid container direction="column" alignItems="center"
                      sx={{
                          my: 8,
                          width: '100%',
                          position: "relative",
                          overflowY: "scroll",

                      }}
                >

                    <Map/>

                    <Grid container direction="column" alignItems="center"
                          sx={{
                              width: '100%',
                              position: "absolute",
                              top: "20%",
                          }}
                    >

                        <Typography
                            variant="h1"
                            align="left"
                            color="grey.700"
                            xs={12} sm={3} md={2}
                            sx={{
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

                        <Grid container direction="row" alignItems="center" justifyContent='center'
                              sx={{
                                  mt: 5,
                                  width: '100%',
                                  gap: 2
                              }}
                        >
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="departure"
                                    freeSolo

                                    xs={12}
                                    options={['sample', 'sample1']}
                                    renderInput={(params) => <TextField {...params} label="Departure"/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="arrival"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    options={['sample', 'sample1']}
                                    renderInput={(params) => <TextField {...params} label="Arrival"/>}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <DateRangePicker
                                    xs={12} sx={{flex: 1,}}
                                    localeText={{start: 'Departure Date', end: 'Arrival Date'}}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="cabin"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    options={['sample', 'sample1']}
                                    renderInput={(params) => <TextField {...params} label="Cabin"/>}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="airline"
                                    freeSolo
                                    xs={12}
                                    sx={{flex: 1,}}
                                    options={['sample', 'sample1']}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Airline (Optional)"/>}/></Grid>


                        </Grid>
                        <Button variant="outlined" size="large" endIcon={<SearchIcon sx={{
                            width: 30,
                            height: 30
                        }}/>} onClick={()=>{
                            navigate('flight-search')
                        }} sx={{
                            textTransform: "none",
                            mt: 5,
                            alignItems: 'center',
                            justifyContent: 'center',

                            borderRadius: 50,
                            border: 3,
                            fontSize: 20, fontWeight: 'medium'
                        }}>
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
