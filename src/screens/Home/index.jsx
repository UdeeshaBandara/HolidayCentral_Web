import * as React from 'react';
import env from "react-dotenv";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Snackbar, Typography} from "@mui/material";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from "@mui/material/TextField";
import {Alert} from '@mui/material'

import MainAppBar from "../../components/AppBar";

import Map from "../../Assets/SVGIcons/Map";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useToken from "../../hooks/useToken";

export default function Home() {
    const navigate = useNavigate();
    const {token} = useToken();

    const [alertState, setAlertState] = React.useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const {vertical, horizontal, isOpen, message} = alertState;
    const [filterValues, setFilterValues] = useState([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState({
        departure: "",
        arrival: '',
        fromDate: '',
        toDate: '',
        cabin: '',
        airline: ''
    });

    useEffect(() => {
        getFilterValues();
    }, []);

    const getFilterValues = () => {
        fetch(`${env.BASE_URL}flight/query/param`, {
            method: 'GET', headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                data.cabins = data.cabins.map(a => a.name);
                data.cabins = [...new Set(data.cabins.map(item => item))];
                setFilterValues(data);

            });
    };

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
                          pt:10,
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
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        departure: value
                                    })}
                                    options={filterValues.departures}
                                    renderInput={(params) => <TextField {...params} label="Departure"/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="arrival"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        arrival: value
                                    })}
                                    options={filterValues.arrivals}
                                    renderInput={(params) => <TextField {...params} label="Arrival"/>}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <DateRangePicker
                                    onChange={(newValue) => {
                                        if (newValue[0] !== null) {
                                            setSelectedFilterValues({
                                                ...selectedFilterValues,
                                                fromDate: newValue[0]._d
                                            })
                                        }
                                        if (newValue[1] !== null) {
                                            setSelectedFilterValues({
                                                ...selectedFilterValues,
                                                toDate: newValue[1]._d
                                            })
                                        }
                                    }}
                                    xs={12} sx={{flex: 1,}}
                                    localeText={{start: 'Departure Date', end: 'Arrival Date'}}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="cabin"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        cabin: value
                                    })}
                                    options={filterValues.cabins}
                                    renderInput={(params) => <TextField {...params} label="Cabin"/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="airline"
                                    freeSolo
                                    xs={12}
                                    sx={{flex: 1,}}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        airline: value
                                    })}
                                    options={filterValues.airlines}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Airline (Optional)"/>}/></Grid>


                        </Grid>
                        <Button variant="outlined" size="large" endIcon={<SearchIcon sx={{
                            width: 30,
                            height: 30
                        }}/>} onClick={() => {
                            if (selectedFilterValues.departure === '') {
                                setAlertState({...alertState, message: 'Please select departure location', isOpen: true});
                            } else if (selectedFilterValues.arrival === '') {
                                setAlertState({...alertState, message: 'Please select arrival location', isOpen: true});
                            } else if (selectedFilterValues.fromDate === '') {
                                setAlertState({...alertState, message: 'Please select from date', isOpen: true});
                            } else if (selectedFilterValues.toDate === '') {
                                setAlertState({...alertState, message: 'Please select to date', isOpen: true});
                            } else if (selectedFilterValues.cabin === '') {
                                setAlertState({...alertState, message: 'Please select cabin type', isOpen: true});
                            } else {

                                navigate('flight-search', {
                                    state: {
                                        selectedFilterValues: selectedFilterValues,
                                        filterValues: filterValues
                                    }
                                })
                            }

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
            <Snackbar
                autoHideDuration={6000}
                anchorOrigin={{vertical, horizontal}}
                open={isOpen}
                onClose={() => setAlertState({...alertState, isOpen: false})}
                key={vertical + horizontal}
            >
                <Alert severity="error">{message}</Alert>
            </Snackbar>
        </Grid>
    );
}
