import './App.css';
import Login from "./screens/Login";
import Register from "./screens/Register";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='login' element={<Login/>}/>
        </Routes>
    );
}

export default App;
