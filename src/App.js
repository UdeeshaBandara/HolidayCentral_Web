import './App.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import {Route, Routes} from "react-router-dom";
import Home from "./screens/Home";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>
        </Routes>
    );
}

export default App;
