import * as React from 'react';
import Grid from '@mui/material/Grid';
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

export default function Home() {


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>

            </Grid>
        </ThemeProvider>
    );
}
