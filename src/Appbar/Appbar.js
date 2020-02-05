import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MyContext from '../helper/themeContext';
import firebase from 'firebase'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import MiniDrawer from '../Mini drawer/MiniDrawer';

import './appbar.css'
const style = theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color:'rgb(235, 209, 153,0.8)',
      cursor:'pointer',
    },
  });

class MyAppbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleLog =(e) =>{
if(e.target.innerText=="LOGOUT")
{
  
  firebase.auth().signOut().then( ()=>{

    this.freeToken();

  })
}

else if(e.target.innerText=="SIGN UP")
{
  alert("Under Development, Please Try Again Later")
}
      
    }

    freeToken =() =>{
     
      
          this.context.setCookie('uid','',0)
          this.context.updateValue('uid',null)
          this.context.history.push('./')
      
        
      }
            
          
    render() { 
        const {classes}=this.props;
        return ( 
<div className={classes.root}>
      <AppBar position="static" id="appbar">
        <Toolbar>
         <MiniDrawer/>
          <Typography variant="h6" className={classes.title}>
            Umar E Farooq
          </Typography>
          <Button onClick={this.handleLog} color="inherit">{this.context.history.location.pathname=="/"?"Sign Up":this.context.state.uid!=null? 'Logout':'Login'}</Button>
{console.log(this.context.history)}
        </Toolbar>
      </AppBar>
    </div>
         );
    }
}
 MyAppbar.contextType=MyContext;
export default withStyles(style)(MyAppbar);