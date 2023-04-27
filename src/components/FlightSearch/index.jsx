import Box from "@mui/material/Box";
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {Autocomplete, ListItem, Typography} from "@mui/material";
import {Colors} from "../../Theme/Variables";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import * as React from "react";
import MainAppBar from "../AppBar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import FlightDetail from "../FlightDetail";

export default function FlightSearch() {

    const flights = ['Hawaiian Airlines', 'Hawaiian Airlines', 'Hawaiian Airlines', 'Hawaiian Airlines', 'Hawaiian Airlines', 'Hawaiian Airlines', 'Hawaiian Airlines', 'Japan Airlines', 'Japan Airlines', 'Japan Airlines', 'Japan Airlines', 'Japan Airlines', 'Japan Airlines'];

    return (<><MainAppBar/>
            <Grid direction="column" sx={{
                height: '100%',
                overflowY: "scroll",
            }}>
                <Grid container direction="row" alignItems="center" justifyContent='center'
                      sx={{
                          mt: 5,
                          width: '100%',
                          gap: 2,
                          overflowY: "scroll",
                      }}
                >

                    <Grid item xs={11} sm={3} md={1.5}>
                        <Autocomplete
                            id="departure"
                            freeSolo

                            xs={12}
                            options={['sample', 'sample1']}
                            renderInput={(params) => <TextField {...params} label="Departure"/>}
                        />
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <Autocomplete
                            id="arrival"
                            freeSolo
                            sx={{flex: 1,}}
                            xs={12}
                            options={['sample', 'sample1']}
                            renderInput={(params) => <TextField {...params} label="Arrival"/>}/>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <DateRangePicker
                            xs={12} sx={{flex: 1,}}
                            localeText={{start: 'Departure Date', end: 'Arrival Date'}}/>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <Autocomplete
                            id="cabin"
                            freeSolo
                            sx={{flex: 1,}}
                            xs={12}
                            options={['sample', 'sample1']}
                            renderInput={(params) => <TextField {...params} label="Cabin"/>}/>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <Autocomplete
                            id="airline"
                            freeSolo
                            xs={12}
                            sx={{flex: 1,}}
                            options={['sample', 'sample1']}
                            renderInput={(params) => <TextField {...params}
                                                                label="Airline (Optional)"/>}/></Grid>
                    <Grid item xs={11} sm={3} md={1.5}> <Button variant="outlined" size="large"
                                                                endIcon={<SearchIcon sx={{
                                                                    width: 30,
                                                                    height: 30
                                                                }}/>} onClick={() => {
                    }} sx={{
                        textTransform: "none",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 50,
                        border: 3,
                        fontSize: 20, fontWeight: 'medium'
                    }}>
                        Search
                    </Button>
                    </Grid>
                    {flights.map((item, idx) => {
                        return (
                            <FlightDetail key={idx}/>
                        );
                    })}

                </Grid></Grid></>
    );
}
