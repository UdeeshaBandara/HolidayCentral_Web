import * as React from 'react';
import {useEffect, useState} from 'react';
import env from "react-dotenv";
import {useNavigate} from "react-router-dom";
import {Alert, Autocomplete, Snackbar, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";

import MainAppBar from "../../components/AppBar";

import Map from "../../Assets/SVGIcons/Map";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import useToken from "../../hooks/useToken";

export default function Package() {
    const navigate = useNavigate();
    const {token} = useToken();

    const [alertState, setAlertState] = useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const {vertical, horizontal, isOpen, message} = alertState;
    const [filterValues, setFilterValues] = useState([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState({
        destination: '',
        duration: '',
        traveler_count: '',
        speciality: ''
    });

    useEffect(() => {
        getFilterValues();
    }, []);

    const getFilterValues = () => {
        fetch(`${env.BASE_URL}packages/params`, {
            method: 'GET', headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
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
                          pt: 10,
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
                            Find your next {'\n'}stay today
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
                                    id="destination"
                                    freeSolo
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        destination: value
                                    })}
                                    options={filterValues.package_destination}
                                    renderInput={(params) => <TextField {...params} label="Destinations"/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="duration"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        duration: value
                                    })}
                                    options={filterValues.package_duration}
                                    renderInput={(params) => <TextField {...params} label="Duration (Days)"/>}
                                />
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="travelers"
                                    freeSolo
                                    xs={12}
                                    sx={{flex: 1,}}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        traveler_count: value
                                    })}
                                    options={filterValues.package_travelers_count}
                                    renderInput={(params) => <TextField {...params}
                                                                        label="Travelers Count"/>}/></Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="speciality"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        speciality: value
                                    })}
                                    options={filterValues.package_speciality}
                                    renderInput={(params) => <TextField {...params} label="Package Specialities"/>}
                                />
                            </Grid>

                        </Grid>
                        <Button variant="outlined" size="large" endIcon={<SearchIcon sx={{
                            width: 30,
                            height: 30
                        }}/>} onClick={() => {
                            if (selectedFilterValues.destination === '') {
                                setAlertState({...alertState, message: 'Please select destination', isOpen: true});
                            } else if (selectedFilterValues.duration === '') {
                                setAlertState({...alertState, message: 'Please select duration', isOpen: true});
                            } else if (selectedFilterValues.traveler_count === '') {
                                setAlertState({
                                    ...alertState,
                                    message: 'Please select from travelers count',
                                    isOpen: true
                                });
                            } else if (selectedFilterValues.speciality === [""]) {
                                setAlertState({...alertState, message: 'Please select from speciality', isOpen: true});
                            } else {
                                navigate('/package-search', {
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
