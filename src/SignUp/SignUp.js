import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import User from './user.png'
import './signup.css'


const style = theme => ({
    root: {
        
      padding: theme.spacing(3, 2),
      
      width:'50vw',
      margin:'auto',
      minWidth:'400px',
      textAlign:'center'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingBottom:'10px'
      },
      textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  });
  


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
   
    render() { 
        const {classes}=this.props;
        return ( 
        <div style={{paddingTop:'10vh'}}>
 <Paper className={classes.root}>
     <img src={User} alt="Signin"/>
     <p style={{margin:'0px',fontWeight:'bold',fontSize:'10vh',color:'#3c3c3c'}}>Sign Up</p>
 <form className={classes.container} noValidate autoComplete="off">
      <div style={{margin:'auto',textAlign:'center',alignContent:'center'}}>
        <TextField
          id="emailTextBox"
          className={classes.textField}
          label="Enter Your Email"
          margin="normal"
          type="email"
          required
        />
        <br/>
         <TextField
          id="passwordTextBox"
          className={classes.textField}
          label="Enter Password"
          margin="normal"
          type="password"
          required
        /> <br/>
          <TextField
          id="tokenTextBox"
          className={classes.textField}
          label="Enter Your Token"
          margin="normal"
          type="token"
          required
        />
        <br/>
      </div>
     
      </form>
     <div style={{background:'#eeeeee',padding:'10px',color:'#565656'}}>Already Registered , SignIn &nbsp;
      <span onClick={()=>this.props.history.push('./')} className="link">Here</span>
      </div> 
    </Paper>

        </div> );
    }
}
 
export default withStyles(style)(SignUp);