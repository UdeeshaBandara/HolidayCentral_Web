import * as React from 'react';
import {useNavigate} from "react-router-dom";
import env from "react-dotenv";

import useToken from "../../hooks/useToken";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LoginCover from "../../Assets/SVGIcons/LoginCover";
import MainLogo from "../../Assets/SVGIcons/MainLogo";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Alert, Snackbar} from "@mui/material";
import {useState} from "react";

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();

    const {setToken} = useToken();
    const [alertState, setAlertState] = useState({
        vertical: 'top',
        horizontal: 'center',
        isOpen: false,
        message: ''
    });
    const {vertical, horizontal, isOpen, message} = alertState;
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        fetch(`${env.BASE_URL}user/login`, {
            method: 'POST', body: JSON.stringify({
                username: data.get('email'),
                password: data.get('password')
            }), headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((data) => {

                if ('access_token' in data){
                    setToken(`Bearer ${data.access_token}`);
                    navigate('/', {replace: true});
                }else{
                    setAlertState({...alertState, message: 'Invalid credentials', isOpen: true});
                }
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundRepeat: 'no-repeat',
                        alignSelf: 'center',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <LoginCover xs={false}/>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >

                        <MainLogo/>

                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="User name"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="outlined"
                                sx={{mt: 3, mb: 2}}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="../register" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
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
        </ThemeProvider>
    );
}
