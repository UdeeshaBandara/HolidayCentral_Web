import './App.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import HotelIn from './screens/Hotel';
import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import './fonts/NunitoSans-Bold.ttf'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import FlightSearch from "./screens/FlightSearch";
import PackageSearch from "./screens/PackageSearch";
import Checkout from "./screens/Checkout";
import Hotelcheckouts from './screens/Hotel/HotelCheckout';
import QuantityEdit from './screens/Hotel/Hotelcart';
import SearchItem from './screens/Hotel/SearchItem';
import List from  './screens/Hotel/List';
import {ProtectedRoute} from "./components/ProtectedRoute";
import Package from "./screens/Package";

function App() {

    return (<LocalizationProvider dateAdapter={AdapterMoment}>
        <Routes>
            <Route exact path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route exact path='/flight-search'
                   element={<ProtectedRoute><FlightSearch/></ProtectedRoute>}/>
            <Route exact path='/flight-checkout'
                   element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
            <Route exact path='/hotel' element={<HotelIn/>}/>
            <Route exact path='/package' element={<Package/>}/>
            <Route exact path='/hotelcheckout' element={<Hotelcheckouts/>}/>
            <Route exact path='/hotelcart' element={<QuantityEdit/>}/>
            <Route exact path='/search' element={<SearchItem/>}/>
            <Route exact path='/filter' element={<List/>}/>
            <Route exact path='/package-search'
                   element={<ProtectedRoute><PackageSearch/></ProtectedRoute>}/>
        </Routes>
    </LocalizationProvider>);
}

export default App;
