import './App.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home";
import './fonts/NunitoSans-Bold.ttf'
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import FlightSearch from "./components/FlightSearch";

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='register' element={<Register/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='flight-search' element={<FlightSearch/>}/>
            </Routes>
        </LocalizationProvider>
    );
}

export default App;
