import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Snackbar, Typography} from "@mui/material";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from "@mui/material/TextField";
import {Alert} from '@mui/material'

import './list.css';
import Rating from '@mui/material/Rating';

import { Image } from 'mui-image'
import Box from '@mui/material/Box';

import ListSubheader from '@mui/material/ListSubheader';



import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';


import MainAppBar from "../../components/AppBar";

import Map from "../../Assets/SVGIcons/Map";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


import Stack from '@mui/material/Stack';


import {createTheme} from '@mui/material/styles';
import List from './List';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
  
const theme = createTheme();
export default function HotelIn() {
    const navigate = useNavigate();

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
        fetch("http://localhost:3001/flight/query/param")
            .then((response) => response.json())
            .then((data) => {
                data.cabins = data.cabins.map(a => a.name);
                data.cabins = [...new Set(data.cabins.map(item => item))];
                setFilterValues(data);

            });
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        
      }));
    
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
                                    id="arrival"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        arrival: value
                                    })}
                                    options={filterValues.arrivals}
                                    renderInput={(params) => <TextField {...params} label="Where are you going"/>}/>
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
                            

                        </Grid>
                        <Button variant="outlined" size="large" endIcon={<SearchIcon sx={{
                            width: 30,
                            height: 30
                        }}/>} onClick={() => {
                            if (selectedFilterValues.departure === '') {
                                setAlertState({
                                    ...alertState,
                                    message: 'Please select departure location',
                                    isOpen: true
                                });
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
            <Grid
               container
               direction="row"
               justifyContent="center"
              alignItems="center"
            >           
                <ImageList sx={{ width: 1500, height: 450, borderRadius: 10}}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">December</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            
          />
        </ImageListItem>
      ))}
     </ImageList>
    
        </Grid>
             <Grid container spacing={0.5}>
            <Grid item xs>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                             Comfort Suites Airport
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Austin
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                         Exceptional
                         </Typography>
                     </Grid>
                  <Grid item>
                  <Stack spacing={1}>
      
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from $140
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                         Four Seasons Hotel
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Lisbon
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Exceptional
                         </Typography>
                     </Grid>
                  <Grid item>
                  <Stack spacing={1}>
      
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from $99
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            <Grid item xs>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                             Standard license
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                             Full resolution 1920x1080 • JPEG
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             ID: 1030114
                         </Typography>
                     </Grid>
                  <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              Remove
                      </Typography>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    $19.00
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            </Grid>
            
            <Grid container spacing={0.5}>
            <Grid item xs>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                             Standard license
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                             Full resolution 1920x1080 • JPEG
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             ID: 1030114
                         </Typography>
                     </Grid>
                  <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              Remove
                      </Typography>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    $19.00
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            <Grid item xs={6}>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" src="./src/Assets/Images/g1.jpg" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                             Standard license
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                             Full resolution 1920x1080 • JPEG
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             ID: 1030114
                         </Typography>
                     </Grid>
                  <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              Remove
                      </Typography>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    $19.00
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            <Grid item xs>
            <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 500,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={0.5}>
                 <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img alt="complex" Image src="hotel.webp" />
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                             Standard license
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                             Full resolution 1920x1080 • JPEG
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             ID: 1030114
                         </Typography>
                     </Grid>
                  <Grid item>
                      <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              Remove
                      </Typography>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    $19.00
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
            </Grid>
            </Grid>
          
        <Box sx={{ width: '100%', borderRadius : 100}} >
            
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  columns={16} >
        
        <Grid item xs={3}>
          <Item><ul className="fList">
          <ul>Countries</ul>
          <ul >Regions</ul>
          <ul >Cities</ul>
          <ul >Districts</ul>
          <ul >Airports</ul>
          <ul >Hotels</ul>
        </ul></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><ul className="fList">
          <ul>Homes</ul>
          <ul >Apartments</ul>
          <ul >Resorts</ul>
          <ul >Villas</ul>
          <ul >Hostels</ul>
          <ul >Guest houses</ul>
        </ul>
        </Item>
        </Grid>
        <Grid item xs={3} >
          <Item><ul className="fList">
          <ul>Unique places to stay</ul>
          <ul >Reviews</ul>
          <ul >Unpacked: Travel articles</ul>
          <ul >Travel communities</ul>
          <ul >Seasonal and holiday deals</ul>
          
        </ul></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><ul className="fList">
          <ul>Car rental</ul>
          <ul >Flight Finder</ul>
          <ul >Restaurant reservations</ul>
          <ul >Travel Agents</ul>
        
        </ul></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><ul className="fList">
          <ul>Curtomer Service</ul>
          <ul >Partner Help</ul>
          <ul >Careers</ul>
          <ul >Sustainability</ul>
          <ul >Press center</ul>
          <ul >Terms & conditions</ul>
        </ul></Item>
        </Grid>
      </Grid>
    </Box>
                 
            

                
        </Grid>
        
        
    
    );
    
}
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];