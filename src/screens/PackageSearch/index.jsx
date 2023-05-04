import * as React from "react";
import {useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import env from "react-dotenv";

import MainAppBar from "../../components/AppBar";
import {Alert, Autocomplete, FormControl, InputLabel, Select, Snackbar, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import ClearIcon from '@mui/icons-material/Clear';
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import {Colors} from "../../Theme/Variables";
import useToken from "../../hooks/useToken";
import PackageDetail from "../../components/PackageDetail";

export default function PackageSearch() {
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
    const [packages, setPackages] = useState([]);
    const [packagesOriginal, setPackagesOriginal] = useState([]);
    const [selectedFilterValues, setSelectedFilterValues] = useState(location.state.selectedFilterValues);

    const [price, setPrice] = useState('');
    const [rating, setRating] = useState('');
    const [ratingList, setRatingList] = useState('');

    useEffect(() => {
        getPackages();
    }, []);

    const filterPackages = (price, rating) => {
        let packageFiltered = {};
        if (price !== '' && rating !== '') {
            packageFiltered = packagesOriginal.filter(x => x.package_price <= price && x.package_rating >= rating);
        }

        if (price === '' && rating === '') {
            packageFiltered = packagesOriginal;
        }

        if (price !== '') {
            packageFiltered = packagesOriginal.filter(x => x.package_price <= price);
        }

        if (rating !== '') {
            packageFiltered = packagesOriginal.filter(x => x.package_rating >= rating);
        }

        setPackages(packageFiltered);
    };
    const getPackages = () => {
        fetch(`${env.BASE_URL}packages/search`, {
            method: 'POST', body: JSON.stringify({
                package_destination: selectedFilterValues.destination,
                package_duration_min: selectedFilterValues.duration,
                package_travelers_count: selectedFilterValues.traveler_count,
                package_speciality: [selectedFilterValues.speciality]
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status) {
                    console.log('data.data', data.data)
                    setPackages(data.data);
                    setPackagesOriginal(data.data);
                    setRatingList([...new Set(data.data.map(item => item.package_rating))]);
                } else {
                    setPackages([]);
                    setPackagesOriginal([]);
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
                  }}>
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
                <Grid item xs={11} sm={3} md={1.5}>
                    <Button variant="outlined" size="large" endIcon={
                        <SearchIcon sx={{width: 30, height: 30}}/>} onClick={() => {
                        if (selectedFilterValues.destination === '') {
                            setAlertState({...alertState, message: 'Please select destination', isOpen: true});
                        } else if (selectedFilterValues.duration === '') {
                            setAlertState({...alertState, message: 'Please select duration', isOpen: true});
                        } else if (selectedFilterValues.traveler_count === '') {
                            setAlertState({...alertState, message: 'Please select from travelers count', isOpen: true});
                        } else if (selectedFilterValues.speciality === [""]) {
                            setAlertState({...alertState, message: 'Please select from speciality', isOpen: true});
                        } else {
                            getPackages();
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
                      }}>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <FormControl fullWidth>
                            <InputLabel id="price">Price</InputLabel>
                            <Select
                                labelId="price"
                                id="price-select"
                                value={price}
                                label="Price"
                                onChange={(event) => {
                                    filterPackages(event.target.value, rating);
                                    setPrice(event.target.value);
                                }}
                                endAdornment={<IconButton sx={{display: price ? "" : "none"}}
                                                          onClick={() => {
                                                              filterPackages('', rating);
                                                              setPrice('');
                                                          }}><ClearIcon/></IconButton>}
                            >
                                <MenuItem value={1000}>$500 - $999</MenuItem>
                                <MenuItem value={2500}>$1000 - $2499</MenuItem>
                                <MenuItem value={50000000000000000}>more than $2500</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={11} sm={3} md={1.5}>
                        <FormControl fullWidth>
                            <InputLabel id="rating">Rating</InputLabel>
                            <Select
                                labelId="rating"
                                id="rating-select"
                                value={rating}
                                label="Rating"
                                onChange={(event) => {
                                    filterPackages(price, event.target.value);
                                    setRating(event.target.value);
                                }}
                                endAdornment={<IconButton sx={{display: rating ? "" : "none"}}
                                                          onClick={() => {
                                                              filterPackages(price, '');
                                                              setRating('');
                                                          }}><ClearIcon/></IconButton>}
                            >
                                {ratingList.length > 0 && ratingList.map((item, idx) => {
                                    return (<MenuItem
                                        value={item} key={idx}>{item} </MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            {packages.length > 0 ? packages.map((item, idx) => {
                    console.log(packages)
                    return (
                        <Grid sx={{mx: 5}} key={idx}>
                            <PackageDetail item={item}/>
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
                        }}>
                        No packages are available for selected filters!!!
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
