import Box from "@mui/material/Box";
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {Autocomplete, FormControl, InputLabel, ListItem, Select, Typography} from "@mui/material";
import {Colors} from "../../Theme/Variables";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import * as React from "react";
import MainAppBar from "../AppBar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import FlightDetail from "../FlightDetail";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";

export default function FlightSearch() {

    const flights = [{id:1,name:'Hawaiian Airlines',price:100,quantity:1},{id:2,name:'Hawaiian Airlines',price:100,quantity:1},{id:3,name:'Hawaiian Airlines',price:100,quantity:1},{id:4,name:'Hawaiian Airlines',price:100,quantity:1},{id:5,name:'Hawaiian Airlines',price:100,quantity:1},{id:6,name:'Hawaiian Airlines',price:100,quantity:1},{id:7,name:'Hawaiian Airlines',price:100,quantity:1},{id:8,name:'Hawaiian Airlines',price:100,quantity:1},{id:9,name:'Hawaiian Airlines',price:100,quantity:1},{id:10,name:'Hawaiian Airlines',price:100,quantity:1},];

    const [age, setAge] = useState('');


    return (
        <Grid>
            <MainAppBar/>
            <Grid container direction="column" sx={{
                gap: 2,
                height: '100%',
                overflowY: "scroll",
                overflowX: "scroll",

            }}>
                <Grid container direction="row" alignItems="center" justifyContent='center'
                      sx={{
                          pt: 5,
                          gap: 2,
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
                    <Grid container direction="row" alignItems="center" justifyContent='center'
                          sx={{
                              py: 5,
                              width: '100%',
                              gap: 2,
                          }}
                    >
                        <Grid item xs={11} sm={3} md={1.5}>
                            <FormControl fullWidth>
                                <InputLabel id="price">Price</InputLabel>
                                <Select
                                    labelId="price"
                                    id="price-select"
                                    value={age}
                                    label="Price"
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
                        <Grid item xs={11} sm={3} md={1.5}>

                            <FormControl fullWidth>
                                <InputLabel id="duration">Duration</InputLabel>
                                <Select
                                    labelId="duration"
                                    id="duration-select"
                                    value={age}
                                    label="Duration"
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
                        <Grid item xs={11} sm={3} md={1.5}>

                            <FormControl fullWidth>
                                <InputLabel id="airline">Airline</InputLabel>
                                <Select
                                    labelId="airline"
                                    id="airline-select"
                                    value={age}
                                    label="Airline"
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
                    </Grid>


                </Grid>
                {flights.map((item, idx) => {
                    return (
                        <FlightDetail key={idx} item={item}/>
                    );
                })}
            </Grid>
        </Grid>
    );
}
