import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import User from './user.png'
import Button from '@material-ui/core/Button';
import './signin.css'
import Right from './right.png'
import Background from './background.jpg'
import firebase from 'firebase'
import MyContext from '../helper/themeContext';
import PropagateLoader from 'react-spinners/PropagateLoader';
// import Pw from './pw.gif';


 

const style = theme => ({
    root: {
        
      //paddingBottom:'10px',
      height:'calc(100% - 10px)',
      width:'50vw',
      margin:'auto',
     paddingTop:'10px',
      textAlign:'center',
      background:'rgb(235, 209, 153,0.7)'
      
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
  


class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {  email:'',password:'',errorCode:null,errorMessage:'',loading:false}
        this.handleClick=this.handleClick.bind(this);
    }
   
    componentDidMount(){
      
        
        if(this.context.state.uid!=null)
        {
          
this.context.history.push('./Home')
        }
        

        
    }

    setUser(uid,displayName,email,emailVerified,photoURL,isAnonymous,providerData){
      this.context.updateValue("uid",uid)
      this.context.updateValue("displayName",displayName)
      this.context.updateValue("email",email)
      this.context.updateValue("emailVerified",emailVerified)
      this.context.updateValue("photoURL",photoURL)
      this.context.updateValue("isAnonymous",isAnonymous)
      this.context.updateValue("providerData",providerData)

      this.context.setCookie("uid",uid,30);
      this.context.setCookie("displayName",displayName,30);
      this.context.setCookie("email",email,30);
      this.context.setCookie("emailVerified",emailVerified,30);
      this.context.setCookie("photoURL",photoURL,30);
      this.context.setCookie("isAnonymous",isAnonymous,30);
      this.context.setCookie("providerData",providerData,30);
      
    }

    handleClick(){
      this.setState({loading:true});
        let global=this;
        console.log(this.state.email)
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        global.setState({errorCode,errorMessage,loading:false})
        // ...
      });
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // ...
          
          global.setUser(uid,displayName,email,emailVerified,photoURL,isAnonymous,providerData);
          global.context.history.push('./Home')
          
        } else {
           
          // User is signed out.
          // ...
        }
      });
      
      
    }
    
    handleChange=(event)=>{
this.setState({[event.target.name]:event.target.value , errorCode:null,errorMessage:''})
    }


    render() { 
        const {classes}=this.props;
        return ( 
          
            <div style={{display:'block',height:'calc(100vh - 64px)', width:'100vw', margin:'0px',backgroundSize:"100vw 800px", backgroundImage: "url(" + Background + ")"}}>
           
       
            <div style={{paddingTop:'10px',position:'relative',display:'block',background:'',width:'100%',height:'calc(100% - 20px)'}}>
 <Paper id="root" className={classes.root} >
     <img src={User} alt="Signin" style={{maxHeight:'30%'}}/>
     <p style={{maxHeight:'20%',margin:'0px',fontWeight:'bold',fontSize:'9vh',color:'#3c3c3c'}}>Umer e Farooq</p>
{this.state.loading===false?<div><form className={classes.container} noValidate autoComplete="off">
      <div style={{margin:'auto',textAlign:'center',alignContent:'center'}}>
        <TextField
          id="emailTextBox"
          className={classes.textField}
          label="Enter Your Email"
          margin="normal"
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
         color={"secondary"}

          required
          
        />
        <br/>
         <TextField
          id="passwordTextBox"
          className={classes.textField}
          label="Enter Password"
          margin="normal"
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
          color={"secondary"}
          required
        />
        <br/>
      {this.state.errorCode?<div>{this.state.errorMessage}</div>:null}
        <Button  type="submit" onClick={this.handleClick} variant="contained" id="SignInButton">Sign In 
        <img style={{position:'absolute',right:'20px'}} src={Right} alt="next" /> 
        </Button>
      </div>
     
      </form>
     <div style={{background:'#eeeeee',padding:'10px',color:'#565656'}}>New Here , SignUp &nbsp;
      <span onClick={()=>this.props.history.push('./SignUp')} className="link">Here</span>
      </div> </div>:
      <div style={{ textAlign:'center',width:'calc(100%)',height:'calc(50%)',maxHeight:'50%',background:''}}>
       <div style={{paddingLeft:'calc(50% - 10px)',paddingTop:'calc(20% - 10px)'}}>
        <PropagateLoader
          
          sizeUnit={"px"}
          size={20}
          color={'#4B3522'}
         
        />
       </div>
        {/* <img style={{paddingTop:'20px',width:'200px'}} src={Pw} alt="Please wait" /> */}
        {/* <p style={{paddingTop:'30px'}}>Please Wait !</p> */}
      </div>}
    </Paper>
    </div>

       
        {/* <div style={{position:'relative',top:'0px',backgroundImage: "url(" + Background + ")",width:'100vh',height:'200px' } }> dsadasdsa </div> */}
       
      
        </div> );
    }
}
 SignIn.contextType=MyContext;
export default withStyles(style)(SignIn);