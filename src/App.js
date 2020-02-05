import React, { Component } from 'react';

import {  Router, Route } from "react-router-dom";


import './App.css';
import SignIn from './SignIn/SignIn'
import SignUp from './SignUp/SignUp'
import TabBar from './RaashanScreen/Admin/TabBar'
import history from './helper/history'
import MyContext from './helper/themeContext';
import Appbar from './Appbar/Appbar';
import firebase from 'firebase'


//On Any Activity
//check Coookie if null then context to null and logout
//if not null then extend cookie from Context uid
//also signout from firebase

class App extends Component {
  state = { uid:null,customer:[] }

 componentWillMount()
 {  

  const firebaseConfig = {
    apiKey: "AIzaSyCUXqzV0xTImRfACBFCgNceGoPTZ90r268",
    authDomain: "raashanapp.firebaseapp.com",
    databaseURL: "https://raashanapp.firebaseio.com",
    projectId: "raashanapp",
    storageBucket: "raashanapp.appspot.com",
    messagingSenderId: "148337453658",
    appId: "1:148337453658:web:5cc735568d1c09e097c663",
    measurementId: "G-S5JHYXQVBR"
  };
  firebase.initializeApp(firebaseConfig);



  if(this.state.uid==null)
  {
    let uid=this.getCookie("uid")

     if(uid!="")
     {
       this.setState({uid});
     }
     else firebase.auth().signOut();
     history.push('./')
  }
  
 }

  updateValue = (key, val) => {
    this.setState({[key]: val});
 }

getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
  setCookie(cname, cvalue, exmins) {
  var d = new Date();
  d.setMinutes( d.getMinutes() +exmins)
  //d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


  render() { 
    
      
      return (
        <div className="App">
    
    <Router history={history}>
    
      
    
    <MyContext.Provider value={{history:history,state: this.state, firebase:firebase, updateValue: this.updateValue,setCookie:this.setCookie}}>  
    
    <Route path="/" component={Appbar}/>

    <Route exact path='/'render={(routesProps) => <SignIn {...routesProps} history={history }/>} />
    
    <Route exact path='/SignUp'render={(routesProps) => <SignUp {...routesProps} history={history }/>} />
    
    <Route exact path="/Home" component={TabBar}/>
                
    </MyContext.Provider>   
    
    
    </Router>
    </div>
      );
  }
}
 
export default App;



 

     
     
   
