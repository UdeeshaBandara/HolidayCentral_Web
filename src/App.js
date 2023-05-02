import './App.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import HotelIn from './screens/Hotel';
import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import './fonts/NunitoSans-Bold.ttf'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import FlightSearch from "./components/FlightSearch";
import Checkout from "./screens/Checkout";
import hotelcheckout from './screens/Hotel/HotelCheckout';
import Hotelcheckouts from './screens/Hotel/HotelCheckout';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route exact path='/flight-search' element={<FlightSearch/>}/>
                <Route exact path='/flight-checkout' element={<Checkout/>}/>
                <Route exact path='/hotel' element={<HotelIn/>}/>
                <Route exact path='/hotelcheckout' element={<Hotelcheckouts/>}/>
            </Routes>
        </LocalizationProvider>
    );
}

export default App;
