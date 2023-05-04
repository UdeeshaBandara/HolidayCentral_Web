import * as React from 'react';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Autocomplete, Snackbar, Typography} from "@mui/material";
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import TextField from "@mui/material/TextField";
import {Alert} from '@mui/material'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import Divider from '@mui/material/Divider';

import './list.css';
import Rating from '@mui/material/Rating';

import { Image } from 'mui-image'
import Box from '@mui/material/Box';

import ListSubheader from '@mui/material/ListSubheader';

import SendIcon from '@mui/icons-material/Send';


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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

    const [option, setoption] = React.useState('');

    const handleChange = (event) => {
      setoption(event.target.value);
    };

    const [option2, setoption2] = React.useState('');

    const handleChange2 = (event) => {
      setoption2(event.target.value);
    };

    const [option3, setoption3] = React.useState('');

    const handleChange3 = (event) => {
      setoption3(event.target.value);
    };

  
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
        checkIn: '',
        checkOut: '',
        heads: '',
        option: '',
        option2: '',
        option3: '',

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
                                    renderInput={(params) => <TextField {...params} label="Where are you planing to travel"/>}/>
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
                            
                                <Box sx={{ minWidth: 150 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Option one </InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={option}
                                    label="Age"
                                    onChange={handleChange}
                                    >
                                    <MenuItem value={10}>Pool</MenuItem>
                                    <MenuItem value={20}>Kids play area</MenuItem>
                                    <MenuItem value={30}>Beach access</MenuItem>
                                    </Select>
                                </FormControl>
                                </Box>

                                <Box sx={{ minWidth: 150 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Option Two </InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={option2}
                                    label="Age"
                                    onChange={handleChange2}
                                    >
                                    <MenuItem value={10}>Pool</MenuItem>
                                    <MenuItem value={20}>Kids play area</MenuItem>
                                    <MenuItem value={30}>Beach access</MenuItem>
                                    </Select>
                                </FormControl>
                                </Box>

                                <Box sx={{ minWidth: 150 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Option Three </InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={option3}
                                    label="Age"
                                    onChange={handleChange3}
                                    >
                                    <MenuItem value={10}>Pool</MenuItem>
                                    <MenuItem value={20}>Kids play area</MenuItem>
                                    <MenuItem value={30}>Beach access</MenuItem>
                                    </Select>
                                </FormControl>
                                </Box>
                        </Grid>
                        <Button variant="outlined" size="large" color="secondary" endIcon={<SearchIcon sx={{
                            width: 30,
                            height: 30
                        }}/>} onClick={() => {
                            if (selectedFilterValues.location === '') {
                                setAlertState({
                                    ...alertState,
                                    message: 'Please type visiting location',
                                    isOpen: true
                                });
                            } else if (selectedFilterValues.location === '') {
                                setAlertState({...alertState, message: 'Please type where visiting', isOpen: true});
                            } else if (selectedFilterValues.checkIn === '') {
                                setAlertState({...alertState, message: 'Please select Check In', isOpen: true});
                            } else if (selectedFilterValues.checkOut === '') {
                                setAlertState({...alertState, message: 'Please select Check Out', isOpen: true});
                            }else if (selectedFilterValues.heads === '') {
                                    setAlertState({...alertState, message: 'Please type the no.of heads', isOpen: true});
                            } else if (selectedFilterValues.option === '') {
                                setAlertState({...alertState, message: 'Please select option 1', isOpen: true});
                            }else if (selectedFilterValues.optio2n === '') {
                                setAlertState({...alertState, message: 'Please select option 2', isOpen: true});
                            } else if (selectedFilterValues.option3 === '') {
                                setAlertState({...alertState, message: 'Please select option 3', isOpen: true});
                            }else {

                                navigate('/', {
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
                           Explore hotels {'\n'}around the world
                                                    </Typography>        
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
                            The Feels{'\n'} of Hotels
                        </Typography>
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
                            Review hearts {'\n'}of some hotels
                        </Typography>
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
                                            <Img alt="complex" src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/112516884.jpg?k=3c9d9f3562af9b4d4dae3f6ba4724a5f4271ee54f9073d2f81bb3199b9fc82aa&o=&hp=1" width={1100} height={500}/>
                                            </ButtonBase>
                                        </Grid>
                  <Grid item xs={12} sm container >
                    
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                         Cinnamon Grand Colombo
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Colombo, Sri Lanka 
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Exceptional
                         </Typography>
                         
                     </Grid>
                  <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                
                  </Stack>
                  <Button variant="contained" color="success" endIcon={<SendIcon />}>
                      Add to Cart
                  </Button>
                  
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from Rs.26,000
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
                  <Img alt="complex" src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/118292494.jpg?k=cd3d0a106372d89ee6e8b490546fa1ee1d19f8573cd53ff0156d751ea38d4279&o=&hp=1" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                         Galle Face Hotel
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Colombo, Sri Lanka
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Exceptional
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                
                  </Stack>
                  <Button variant="contained" color="success" endIcon={<SendIcon />}>
                      Add to Cart
                  </Button>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from Rs.15,0000
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
                         Hotel Casamara
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Ella, Srilanka
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Exceptional
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                
                  </Stack>
                  <Button variant="contained" color="success" endIcon={<SendIcon />}>
                      Add to Cart
                  </Button>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from Rs.15,000
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
                  <Img alt="complex" src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/154953130.jpg?k=e4913e0af618278be6d31300890de10529f1f5bea7db2e0624eb5c60ca581377&o=&hp=1" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div">
                         Hotel City Grand Ella
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                          Ella, Srilanka
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Exceptional
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                
                  </Stack>
                  <Button variant="contained" color="success" endIcon={<SendIcon />}>
                      Add to Cart
                  </Button>
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    Starting from Rs.10,000
                    </Typography>
                </Grid>
                </Grid>
             </Grid>
             </Paper>
           
         </Grid>

         </Grid>
     </Grid>
     <Divider variant="middle" />
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
                           The Pride {'\n'}of Hotel Rooms
                        </Typography>    
     <Grid container spacing={2} columns={16}>
         <Grid item xs={5}>
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
                  <ButtonBase sx={{ width: 430, height: 250 }}>
                  <Img alt="complex" src="https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Samudra/images/16x7/Deluxe_City_Facing_King_2.jpg/jcr:content/renditions/cq5dam.web.323.323.jpeg" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                         Deluxe Room City Facing
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         The large rooms are a luxurious retreat in the middle of the city, with captivating views of  vibrant scenaries.
                                the room specified of 35 Sq Mt
                                wifi 
                                Inclusive of WiFi
                                maximum Occupancy image
                                Up to 3 guests
                                bed type image
                                Queen/Twin
                                Uninterrupted view of the twinkling pool & city

                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Starting Rate/Night Rs. 43,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                
                  </Stack>
                  
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    
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
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Samudra/images/16x7/Deluxe_Queen_Sea_1.jpg/jcr:content/renditions/cq5dam.web.323.323.jpeg" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                         Deluxe Room Ocean Facing
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         The large rooms are a luxurious retreat in the middle of the city, with captivating views of Colombo’s vibrant streets.
                            The room area includes 
                            35 Sq Mt
                            Inclusive of WiFi
                            maximum Occupancy Up to 3 guests
                            bed of Twin/Queen 
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Starting Rate/Night Rs. 37,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={4} precision={0.1} readOnly />
                
                  </Stack>
                  
                  </Grid>
               </Grid>
                <Grid item>
                    
                </Grid>
                </Grid>
             </Grid>
             </Paper>
         </Grid>
         <Grid item xs={5}>
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
                  <ButtonBase sx={{ width: 430, height: 250 }}>
                  <Img alt="complex" src="https://sitecore-cd-imgr.shangri-la.com/MediaFiles/F/7/E/%7BF7E39F25-D318-4F94-8EDD-416456C5A900%7D800746e88c524e06902524a465eedd75.jpg" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                         Luxury Room City View
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         Unwind in a sanctuary of splendour in these well-furnished rooms.
                                The room contains of area 
                                35 Sq Mt
                                Inclusive of WiFi
                                maximum Up to 2 guests
                                bed type of Queen/Twin 
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                               Starting Rate/Night Rs. 30,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                
                  </Stack>
                
                  </Grid>
               </Grid>
                <Grid item>
                    
                </Grid>
                </Grid>
             </Grid>
             </Paper>
         </Grid>
         <Grid item xs={5}>
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
                  <ButtonBase sx={{ width: 430, height: 250 }}>
                  <Img alt="complex" src="https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Samudra/images/16x7/doDvqLuv1.jpeg/jcr:content/renditions/cq5dam.web.323.323.jpeg" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                         Deluxe One Bed Room Suite City View
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         With contemporary décor and exquisite ethnic aspects, the brand new Deluxe Suites redefine
                         elegance. Enjoy a Continental breakfast served by your own butler, while gazing at the 
                          stunning scenaries

                          The room concists of 
                             63 Sq Mt of room
                            Inclusive of WiFi
                            maximum Up to 3 guests
                            bed type of King size and
                            Bedecked in a contemporary-classic style


                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Starting Rate/Night Rs. 27,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={4.0} precision={0.5} readOnly />
                
                  </Stack>
                  
                  </Grid>
               </Grid>
                <Grid item>
                    <Typography variant="subtitle1" component="div">
                    
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
              maxWidth: 550,
              flexGrow: 1,
              backgroundColor: (theme) =>
               theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
             >
              <Grid container spacing={9}>
                 <Grid item>
                  <ButtonBase sx={{ width: 500, height: 300 }}>
                  <Img alt="complex" src="https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Samudra/images/16x7/Deluxe_Queen_Sea_1.jpg/jcr:content/renditions/cq5dam.web.323.323.jpeg" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                         Grand Luxury Suite
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         The enchanting Grand Luxury Suite displays immaculate luxury and distinction with spellbinding ocean views. These masterpieces can be combined with an adjacent connecting room to form a two-bedroom suite.
                                The room area covers 
                                98 Sq Mt with
                                Inclusive of WiFi
                                maximum Occoupance Up to 3 guests and 
                                bed type of King
                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                             Starting Rate/Night Rs 47,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={5} precision={0.1} readOnly />
                
                  </Stack>
                  
                  </Grid>
               </Grid>
                <Grid item>
                    
                </Grid>
                </Grid>
             </Grid>
             </Paper>
         </Grid>
         <Grid item xs={5}>
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
                  <ButtonBase sx={{ width: 430, height: 250 }}>
                  <Img alt="complex" src="https://m.ahstatic.com/is/image/accorhotels/Colombo_xxxxxxxxxx_i122470:3by2?wid=364&hei=243&dpr=on,2.625&qlt=75&resMode=sharp2&op_usm=0.5,0.3,2,0&iccEmbed=true&icc=sRGB" width={1100} height={500}/>
                  </ButtonBase>
              </Grid>
                <Grid item xs={12} sm container >
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item xs>
                         <Typography gutterBottom variant="subtitle1" component="div" align='center'>
                                Executive 1 Bed Room Suite Ocean View 
                         </Typography>
                         <Typography variant="body2" gutterBottom>
                         The extravagant Executive Suites boast contemporary interiors with mesmerising ocean views. Each has a relaxing living room, elegant bedroom and extravagant bathroom, and offers you nothing but the best experience.
                            The room area covers60 Sq Mt with
                            Inclusive of WiFi and maximum Occoupancy of Up to 3 guests
                            bed type of King with Serene suites catering to business travellers

                         </Typography>
                         <Typography variant="body2" color="text.secondary">
                               Starting Rate/Night Rs 40,000/=
                         </Typography>
                     </Grid>
                     <Grid item align = "center">
                  <Stack spacing={1}>
      
                    <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
                
                  </Stack>
                
                  </Grid>
               </Grid>
                <Grid item>
                    
                </Grid>
                </Grid>
             </Grid>
             </Paper>
         </Grid>
         </Grid>
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
      img: 'https://sitecore-cd.shangri-la.com/-/media/Shangri-La/hambantota_shangrila/settings/79d32e8886f54d0c9f12bea3b42b46ae.jpg',
      title: 'Shangri-La Hambantota',
      author: '7 star hotels in sri lanka',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://www.tajhotels.com/content/dam/luxury/hotels/Taj_Samudra/images/16x7/AAG_TSC_Exterior_3617-16x7.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg',
      title: 'Taj Samudra, Colombo',
      author: '5 star hotels in sri lanka',
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/193379086.jpg?k=bd854a94c6f6a164e0fbc174f30d1f18e746a755122f02980a042036e71f55f5&o=&hp=1',
      title: 'Circus Circus Hotel',
      author: 'Las Vegas Boulevard South, Las Vegas Strip, Las Vegas',
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/194124784.jpg?k=b969e08da048b3f2fa8b78ad829cbb914b2fe8edc4b15f5b6fec3c97abad9d1c&o=&hp=1',
      title: 'Luxor',
      author: 'Las Vegas Boulevard South, Las Vegas Strip, Las Vega',
      cols: 2,
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/103705059.jpg?k=9e078265b31ad1815a573da8ed2a665f863e3925e1efd730df703421868a2ada&o=&hp=1',
      title: 'The Taj Mahal Palace, Mumbai',
      author: 'Apollo Bunder Road The Taj Mahal Palace, Colaba',
      cols: 2,
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/408529249.jpg?k=7065ae4920eb651ad2c17823c662e1b852d0db90776f691cd889e58dec57e5b0&o=&hp=1',
      title: 'Zostel Plus Wayanad',
      author: 'Wayanad district, 673577 Kalpetta, India',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/320392604.jpg?k=0dda15d87918b38c656737caf470969e53b0666a2914becb196983c627673cd5&o=&hp=1',
      title: 'Bridgeport Hotel',
      author: 'Murray Bridge, Australia',
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/440057339.jpg?k=33a185c455507e9c97e6deab14b394d63e7074a1ae7f2e9f42da9ed6379e7e02&o=&hp=1',
      title: 'Sydney Central YHA',
      author:  'Sydney, Australia',
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/448732877.jpg?k=c4fef38dbdfc069dc548f0dce0091ed753df30fd3ab352439c1f5a7c3d5f387e&o=&hp=1',
      title: 'Kastara Resort',
      author: 'Ubud, Indonesia',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/378090097.jpg?k=f6a0cfddfef5e9954deeb1ec025c9f3d2fb685cd1d7bba2bb933e65e4fc60b5b&o=&hp=1',
      title: 'Kalia Bingin',
      author: 'Uluwatu, Indonesia',
    },
   
  ];

  const itemDatas = [
    {
      img: 'https://static.toiimg.com/photo/58277444.cms',
      title: 'Bed',
    },
    {
      img: 'https://www.countryandtownhouse.com/wp-content/uploads/2014/09/Ham-Yard-Hotel-London-910x683.jpg',
      title: 'Books',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8RyYp0FMQ_sSr4smb8cAom_ddSgoK40U6hg&usqp=CAU',
      title: 'Sink',
    },
    {
      img: 'https://www.hotelexecutive.com/images/business_review/cfa58_Kitchen_Table_London.jpg',
      title: 'Kitchen',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4xFvkVjkzr-HwSTBo0DgJAdGms9zA5xy-Yg&usqp=CAU',
      title: 'Blinds',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRRV5wBTPTuOT-lNXORSlmjGiP3xN7KDG23A&usqp=CAU',
      title: 'Chairs',
    },
    {
      img: 'https://i.pcmag.com/imagery/articles/03Wse32V1cCgwKSlWcOT0e3-1..v1602164158.jpg',
      title: 'Laptop',
    },
    {
      img: 'https://idighardware.com/wp-content/uploads/2018/10/Hotel-Corridor.jpg',
      title: 'Doors',
    },
    {
      img: 'https://media.cntraveler.com/photos/564f438496771ce632e4556b/16:9/w_1280,c_limit/roost-coffee-program-cr-courtesy.jpg',
      title: 'Coffee',
    },
    {
      img: 'https://i.pinimg.com/736x/ec/a3/4d/eca34d6ed36105d2a6c8bfeb421f16e7--hotel-room-design-small-boutique-hotel-design-bedroom.jpg',
      title: 'Storage',
    },
    {
      img: 'https://loviesta.com/wp-content/uploads/2021/04/Ella-Hotel-outdoor-loviesta-007-scaled.jpg',
      title: 'Candle',
    },
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4_NnN_oL_LoE8Z4dmHrg6XOGTC8skYUNlYAuJCJyub8U6rZ8a18DbqiBQ-LBC2MQDcg&usqp=CAU',
      title: 'Coffee table',
    },
  ];