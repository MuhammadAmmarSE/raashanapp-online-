import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, rgbToHex } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
    palette: {
      
       secondary : { main: 'rgb(126, 119, 84)' ,

       light: 'rgb(255,255,255)',
       dark: 'rgb(255,255,255)',
       contrastText: 'rgb(255,255,255)'


     },
    },
  });

ReactDOM.render(    
 <ThemeProvider theme={theme}>
     <App />
</ThemeProvider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
