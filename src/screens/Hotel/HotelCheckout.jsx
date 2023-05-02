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
import AddressForm from '../../components/Checkout/AddressForm';
import Checkout from '../../components/Checkout/Checkout';
import PaymentForm from '../../components/Checkout/PaymentForm';
import Review from '../../components/Checkout/Review';



const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});
  
const theme = createTheme();
export default function Hotelcheckouts() {
    return (
        <Grid>
            <MainAppBar/>
            <Grid>
            <Checkout />
            
            
            </Grid>
            </Grid>
    );
    
}