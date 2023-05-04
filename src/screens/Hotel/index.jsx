import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Snackbar, Typography} from "@mui/material";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from "@mui/material/TextField";
import {Alert} from '@mui/material'

import Divider from '@mui/material/Divider';

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
        location: "",
        hotel: "",
        checkIn: '',
        checkOut: '',
        room: '',
        heads: '',
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
                            align="center"
                            color="grey.700"
                            xs={12} sm={3} md={2}
                            sx={{
                                width: "2500",
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
                            A hotel in the {'\n'}heart of everything
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
                                        location: value
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
                                                checkIn: newValue[0]._d
                                            })
                                        }
                                        if (newValue[1] !== null) {
                                            setSelectedFilterValues({
                                                ...selectedFilterValues,
                                                checkOut: newValue[1]._d
                                            })
                                        }
                                    }}
                                    xs={12} sx={{flex: 1,}}
                                    localeText={{start: 'Check In Date', end: 'Check out Date'}}/>
                            </Grid>
                            <Grid item xs={12} sm={3} md={2}>
                                <Autocomplete
                                    id="cabin"
                                    freeSolo
                                    sx={{flex: 1,}}
                                    xs={12}
                                    onChange={(event, value) => setSelectedFilterValues({
                                        ...selectedFilterValues,
                                        heads: value
                                    })}
                                    options={filterValues.cabins}
                                    renderInput={(params) => <TextField {...params} label="No Of Heads"/>}
                                />
                            </Grid>
                            

                        </Grid>
                        <Button variant="outlined" size="large" color="secondary" endIcon={<SearchIcon sx={{
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
                                setAlertState({...alertState, message: 'Please type where visiting', isOpen: true});
                            } else if (selectedFilterValues.fromDate === '') {
                                setAlertState({...alertState, message: 'Please select Check In', isOpen: true});
                            } else if (selectedFilterValues.toDate === '') {
                                setAlertState({...alertState, message: 'Please select Check Out', isOpen: true});
                            } else if (selectedFilterValues.cabin === '') {
                                setAlertState({...alertState, message: 'Please select number of heads', isOpen: true});
                            } else {

                                navigate('hotel-search', {
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
                <Grid
               container
               direction="row"
               justifyContent="center"
              alignItems="center"
            >           
                <ImageList sx={{ width: 1500, height: 450, borderRadius: 10}}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div"></ListSubheader>
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
     <Box sx={{ width: 1500, height: 1450, overflowY: 'scroll' }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemDatas.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
     <Grid container spacing={2} columns={16}>
         <Grid item xs={8}>
         <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
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
          
          <Grid item xs={8}>
          <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
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
         <Grid item xs={8}>
          <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://images.unsplash.com/photo-1657349226767-66c983d7df39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
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
         <Grid item xs={8}>
          <Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://images.unsplash.com/photo-1543968332-f99478b1ebdc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
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

         </Grid>
     </Grid>
     <Divider variant="middle" />
     <Grid><Paper
              sx={{
              p: 2,
              margin: 'auto',
              maxWidth: 1550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             ></Paper></Grid>       
     <Grid container spacing={2} columns={30}>
         <Grid item xs={6}>
           <Item>
          <ul>Countries</ul>
          
          <ul >Cities</ul>
          <ul >Airports</ul>
          <ul >Hotels</ul></Item>
         </Grid>
         <Grid item xs={6}>
            <Item>
          
          <ul >Resorts</ul>
          <ul >Villas</ul>
          <ul >Hostels</ul>
          <ul >Guest houses</ul></Item>
         </Grid>
         <Grid item xs={6}>
            <Item><ul>Unique places to stay</ul>
          <ul >Reviews</ul>
          
          <ul >Travel communities</ul>
          <ul >Seasonal and holiday deals</ul></Item>
         </Grid>
         <Grid item xs={6}>
            <Item><ul>Car rental</ul>
          <ul >Flight Finder</ul>
          <ul >Restaurant reservations</ul>
          <ul >Travel Agents</ul></Item>
         </Grid>
         <Grid item xs={6}>
            <Item><ul>Curtomer Service</ul>
          <ul >Partner Help</ul>
          
          <ul >Sustainability</ul>
          
          <ul >Terms & conditions</ul></Item>
         </Grid>
         
     </Grid>     
    
    <Grid>
       
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
      img: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
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
      img: 'https://images.unsplash.com/photos-eLgKkKAnA4g',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'src/Assets/lamb.jpg',
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

  const itemDatas = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: 'Books',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];