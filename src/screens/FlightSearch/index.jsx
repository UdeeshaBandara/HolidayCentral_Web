import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import env from "react-dotenv";

import MainAppBar from "../../components/AppBar";

import {Alert, Autocomplete, FormControl, InputLabel, Select, Snackbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import {DateRangePicker} from "@mui/x-date-pickers-pro/DateRangePicker";
import FlightDetail from "../../components/FlightDetail";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import {Colors} from "../../Theme/Variables";
import useToken from "../../hooks/useToken";

export default function FlightSearch() {
    const location = useLocation();
    const {token} = useToken();

    const [filterValues] = useState(location.state.filterValues);
    const [alertState, setAlertState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const {vertical, horizontal, isOpen, message} = alertState;
    const [flights, setFlights] = useState([]);
    const [flightsOriginal, setFlightsOriginal] = useState([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState(location.state.selectedFilterValues);
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [durationList, setDurationList] = useState('');
    const [airline, setAirline] = useState('');

    useEffect(() => {
        getFlights();
    }, []);

    const filterFlights = (price, duration, airline) => {
        let flightFiltered;
        if (price !== '' && duration !== '' && airline !== '') {
            flightFiltered = flightsOriginal.filter(x => x.price <= price && x.duration === duration && x.airline === airline);
        } else if (price === '' && duration === '' && airline === '') {
            flightFiltered = flightsOriginal;
        } else if (price !== '' && duration !== '') {
            flightFiltered = flightsOriginal.filter(x => x.price <= price && x.duration === duration);
        } else if (price !== '' && airline !== '') {
            flightFiltered = flightsOriginal.filter(x => x.price <= price && x.airline === airline);
        } else if (duration !== '' && airline !== '') {
            flightFiltered = flightsOriginal.filter(x => x.airline <= airline && x.duration === duration);
        } else if (price === '' && duration === '') {
            flightFiltered = flightsOriginal.filter(x => x.airline === airline);
        } else if (airline === '' && duration === '') {
            flightFiltered = flightsOriginal.filter(x => x.price <= price);
        } else if (airline === '' && price === '') {
            flightFiltered = flightsOriginal.filter(x => x.duration === duration);
        }
        setFlights(flightFiltered);

    };
    const getFlights = () => {
        fetch(`${env.BASE_URL}flight/query`, {
            method: 'POST', body: JSON.stringify({
                departure: selectedFilterValues.departure,
                arrival: selectedFilterValues.arrival,
                departure_time: selectedFilterValues.fromDate,
                arrival_time: selectedFilterValues.toDate,
                cabin: selectedFilterValues.cabin,
                airline: selectedFilterValues.airline
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.status) {

                    setFlights(data.data);
                    setFlightsOriginal(data.data);
                    setDurationList([...new Set(data.map(item => item.duration))]);
                } else {
                    setFlights([]);
                    setFlightsOriginal([]);
                }

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
                        onChange={(event, value) => {
                            if (value !== null)
                                setSelectedFilterValues({
                                    ...selectedFilterValues, departure: value
                                })
                        }}
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
                        onChange={(event, value) => {
                            if (value !== null)
                                setSelectedFilterValues({
                                    ...selectedFilterValues, arrival: value
                                })
                        }}
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
                        onChange={(event, value) => {
                            if (value !== null)
                                setSelectedFilterValues({
                                    ...selectedFilterValues, cabin: value
                                })
                        }}
                        options={filterValues.cabins}
                        renderInput={(params) => <TextField {...params} label="Cabin"/>}/>
                </Grid>
                <Grid item xs={11} sm={3} md={1.5}>
                    <Autocomplete
                        id="airline"
                        freeSolo
                        xs={12}
                        sx={{flex: 1,}}
                        value={selectedFilterValues.airline}
                        onChange={(event, value) => {
                            if (value !== null)
                                setSelectedFilterValues({
                                    ...selectedFilterValues, airline: value
                                })
                        }}
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
                                value={price}
                                label="Price"
                                onChange={(event) => {

                                    filterFlights(event.target.value, duration, airline);

                                    setPrice(event.target.value);
                                }}
                                endAdornment={<IconButton sx={{display: price ? "" : "none"}}
                                                          onClick={() => {

                                                              filterFlights('', duration, airline);
                                                              setPrice('');
                                                          }}><ClearIcon/></IconButton>}
                            >
                                <MenuItem value={250}>$100 - $250</MenuItem>
                                <MenuItem value={500}>$251 - $500</MenuItem>
                                <MenuItem value={50000000000000000}>more than $500</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>

                        <FormControl fullWidth>
                            <InputLabel id="duration">Duration</InputLabel>
                            <Select
                                labelId="duration"
                                id="duration-select"
                                value={duration}
                                label="Duration"
                                onChange={(event) => {
                                    filterFlights(price, event.target.value, airline);
                                    setDuration(event.target.value);
                                }}
                                endAdornment={<IconButton sx={{display: duration ? "" : "none"}}
                                                          onClick={() => {
                                                              filterFlights(price, '', airline);
                                                              setDuration('');
                                                          }}><ClearIcon/></IconButton>}
                            >
                                {durationList.length > 0 && durationList.map((item, idx) => {

                                    return (<MenuItem
                                        value={item}>{Math.floor(item / 60)} Hours {item % 60 !== 0 ? item % 60 + ' minutes' : null} </MenuItem>)
                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <FormControl fullWidth>
                            <InputLabel id="airline">Airline</InputLabel>
                            <Select
                                labelId="airline"
                                id="airline-select"
                                value={airline}
                                label="Airline"
                                onChange={(event) => {
                                    filterFlights(price, duration, event.target.value);
                                    setAirline(event.target.value);
                                }}
                                endAdornment={<IconButton sx={{display: airline ? "" : "none"}}
                                                          onClick={() => {
                                                              filterFlights(price, duration, '');
                                                              setAirline('');
                                                          }}><ClearIcon/></IconButton>}
                            >
                                {filterValues.airlines.length > 0 && filterValues.airlines.map((item, idx) => {

                                    return (<MenuItem value={item}>{item}</MenuItem>)
                                })}

                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>


            </Grid>
            {flights.length > 0 ? flights.map((item, idx) => {
                return (
                    <Grid sx={{mx: 5}} key={idx}>
                        <FlightDetail item={item} cabin_type={selectedFilterValues.cabin}/>
                    </Grid>);
            })

                : <Grid item xs={11} sm={3} md={1.5} key={new Date()}>

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
