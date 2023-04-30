import Box from "@mui/material/Box";
import AirLineIcon from "../../Assets/SVGIcons/AirLineIcon";
import {Alert, Autocomplete, FormControl, InputLabel, ListItem, Select, Snackbar, Typography} from "@mui/material";
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
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from 'react-router-dom';

export default function FlightSearch() {
    const location = useLocation();
    const navigate = useNavigate();
    const [filterValues, setFilterValues] = useState(location.state.filterValues);
    const [alertState, setAlertState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const {vertical, horizontal, isOpen, message} = alertState;
    const [flights, setFlights] = useState([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState(location.state.selectedFilterValues);
    const [age, setAge] = useState('');
    useEffect(() => {
        getFlights();
    }, [location.state.selectedFilterValues]);

    const getFlights = () => {
        fetch("http://localhost:3001/flight/query", {
            method: 'POST', body: JSON.stringify({
                departure: selectedFilterValues.departure,
                arrival: selectedFilterValues.arrival,
                departure_time: selectedFilterValues.fromDate,
                arrival_time: selectedFilterValues.toDate,
                cabin: selectedFilterValues.cabin,
                airline: selectedFilterValues.airline
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {


                if (!data.status) setFlights(data);

            });
    };

    return (<Grid>
        <MainAppBar/>
        <Grid container direction="column" sx={{
            gap: 2, height: '100%', overflowY: "scroll", overflowX: "scroll",

        }}>
            <Grid container direction="row" alignItems="center" justifyContent='center'
                  sx={{
                      pt: 15, gap: 2,
                  }}
            >

                <Grid item xs={11} sm={3} md={1.5}>
                    <Autocomplete
                        id="departure"
                        freeSolo
                        value={selectedFilterValues.departure}
                        xs={12}
                        onChange={(event, value) => setSelectedFilterValues({
                            ...selectedFilterValues, departure: value
                        })}
                        options={filterValues.departures}
                        renderInput={(params) => <TextField {...params} label="Departure"/>}
                    />
                </Grid>
                <Grid item xs={11} sm={3} md={1.5}>
                    <Autocomplete
                        id="arrival"
                        freeSolo
                        sx={{flex: 1,}}
                        xs={12}
                        value={selectedFilterValues.arrival}
                        onChange={(event, value) => setSelectedFilterValues({
                            ...selectedFilterValues, arrival: value
                        })}
                        options={filterValues.arrivals}
                        renderInput={(params) => <TextField {...params} label="Arrival"/>}/>
                </Grid>
                <Grid item xs={11} sm={3} md={3}>
                    <DateRangePicker
                        xs={12} sx={{flex: 1,}}
                        onChange={(newValue) => {
                            if (newValue[0] !== null) {
                                setSelectedFilterValues({
                                    ...selectedFilterValues, fromDate: newValue[0]._d
                                })
                            }
                            if (newValue[1] !== null) {
                                setSelectedFilterValues({
                                    ...selectedFilterValues, toDate: newValue[1]._d
                                })
                            }
                        }}
                        localeText={{start: 'Departure Date', end: 'Arrival Date'}}/>
                </Grid>
                <Grid item xs={11} sm={3} md={1.5}>
                    <Autocomplete
                        id="cabin"
                        freeSolo
                        sx={{flex: 1,}}
                        xs={12}
                        value={selectedFilterValues.cabin}
                        onChange={(event, value) => setSelectedFilterValues({
                            ...selectedFilterValues, cabin: value
                        })}
                        options={filterValues.cabins}
                        renderInput={(params) => <TextField {...params} label="Cabin"/>}/>
                </Grid>
                <Grid item xs={11} sm={3} md={1.5}>
                    <Autocomplete
                        id="airline"
                        freeSolo
                        inputProps={{autoComplete: 'off'}}
                        xs={12}
                        sx={{flex: 1,}}
                        value={selectedFilterValues.airline}
                        onChange={(event, value) => setSelectedFilterValues({
                            ...selectedFilterValues, airline: value
                        })}
                        options={filterValues.airlines}
                        renderInput={(params) => <TextField {...params}
                                                            label="Airline (Optional)"/>}/></Grid>
                <Grid item xs={11} sm={3} md={1.5}> <Button variant="outlined" size="large"
                                                            endIcon={<SearchIcon sx={{
                                                                width: 30, height: 30
                                                            }}/>} onClick={() => {
                    if (selectedFilterValues.departure === '' || selectedFilterValues.departure === null) {
                        setAlertState({
                            ...alertState,
                            message: 'Please select departure location',
                            isOpen: true
                        });
                    } else if (selectedFilterValues.arrival === '' || selectedFilterValues.arrival === null) {
                        setAlertState({...alertState, message: 'Please select arrival location', isOpen: true});
                    } else if (selectedFilterValues.fromDate === '' || selectedFilterValues.fromDate === null) {
                        setAlertState({...alertState, message: 'Please select from date', isOpen: true});
                    } else if (selectedFilterValues.toDate === '' || selectedFilterValues.toDate === null) {
                        setAlertState({...alertState, message: 'Please select to date', isOpen: true});
                    } else if (selectedFilterValues.cabin === '' || selectedFilterValues.cabin === null) {
                        setAlertState({...alertState, message: 'Please select cabin type', isOpen: true});
                    } else {

                        getFlights();
                    }
                }} sx={{
                    textTransform: "none",
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    border: 3,
                    fontSize: 20,
                    fontWeight: 'medium'
                }}>
                    Search
                </Button>


                </Grid>
                <Grid container direction="row" alignItems="center" justifyContent='center'
                      sx={{
                          py: 5, width: '100%', gap: 2,
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
            {flights.length > 0 ? flights.map((item, idx) => {
                return (<FlightDetail key={idx} item={item}/>);
            }) : <Grid item xs={11} sm={3} md={1.5}>

                <Typography
                    variant="h6"
                    align="center"
                    color={Colors.gray003}
                    xs={12} sm={3} md={2}
                    sx={{
                        fontFamily: 'light'
                    }}
                >
                    No flights are available for selected filters!!!
                </Typography>
            </Grid>}
        </Grid>
        <Snackbar
            autoHideDuration={6000}
            anchorOrigin={{vertical, horizontal}}
            open={isOpen}
            onClose={() => setAlertState({...alertState, isOpen: false})}
            key={vertical + horizontal}
        >
            <Alert severity="error">{message}</Alert>
        </Snackbar>
    </Grid>);
}
