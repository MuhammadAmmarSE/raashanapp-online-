import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Logo from '../../../General Images/logo.png'
import firebase from 'firebase'
import { Button } from '@material-ui/core';

import InputMask from 'react-input-mask';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Barcode from 'react-barcode';

import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';


import MoonLoader from 'react-spinners/MoonLoader';
import ReactToPrint from 'react-to-print';

import MyContext from '../../../helper/themeContext'

import './Form.css';
const styles= theme =>({

    root: {
        paddingRight:'5px',
       
        textAlign:'right',
        background:'rgb(255,255,255,0.7)'
      },
      margin:{
          
          contentAlign:'right',
        textAlign:'right',
         marginLeft:'20px'
      }


})

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { image:'', loading:false,docRef:'',modalOpen:false,name:'',nic:'',city:'',district:'',village_name:'',monthly_income:'',people_count:'',earning_count:'' }
    }
    handleInput=(e)=>{
      this.setState({[e.target.id]:e.target.value})

    }

    handleImage=(e)=>{
      
      if(! /image[/]/.test(e.target.files[0].type.toString()))
      {
        e.target.value="";
        alert('only image can be uploaded');
      }
      else if(e.target.files[0].size > 2e+6)
      {
        e.target.value="";
        alert('max file size exceeded');
      }
      else
      {
        let str=e.target.value.split("\\");
        str=str[str.length-1]
        this.setState({image:str })
      }
    }

    handleInputNumber=(e)=>{

      if(! (e.target.value=="") )
      {
        console.log(e.target.value[e.target.value.length-1])

        if(isNaN(e.target.value[e.target.value.length-1]) || e.target.value[e.target.value.length-1]=='e' )
        {
          console.log('not a number(s)')
        }
        else  this.setState({[e.target.id]:e.target.value})
      }

    else  this.setState({[e.target.id]:e.target.value})

    }

     handleClose = () => {
       this.clearValues();
      
    };

    

    clearValues=()=>{
      this.setState({
        modalOpen:false,docRef:'',name:'',nic:'',city:'',district:'',village_name:'',monthly_income:'',people_count:'',earning_count:''
      })
    }

    Add=()=>
    {  this.setState({loading:true})
      // firebase.firestore().collection('custom').add({
      //   name:this.state.name , nic:this.state.nic , city:this.state.city, 
      //   district:this.state.district , village_name:this.state.village_name,
      //   monthly_income:this.state.monthly_income,
      //   people_count:this.state.people_count, earning_count:this.state.earning_count,
      // }).then(docRef => {//console.log(docref.id)
        
       let newcustomer = this.context.state.customer;
       newcustomer.push({'name':this.state.name,'nic':this.state.nic,'docRef':window.btoa(this.state.nic)});
       this.context.updateValue("customer",newcustomer);
      this.setState({modalOpen:true,docRef:this.state.district,loading:false})
     
      
      // })

    }
    render() { 

        const {classes} =this.props;
        return ( <div style={{width:'100%',margin:'auto'}}>
             <Paper className={classes.root} elevation={5}>

  
     <div style={{display:'inline-block',width:'20%',marginTop:'calc(55vh - 50vh)'}}>

     <img src={Logo} style={{width:'100%'}}  />


     </div>

     <div style={{display:'inline-block',width:'80%'}}>
       {this.state.loading?<div style={{marginLeft:'calc(50% - 70px)'}}>
        <MoonLoader
          
          sizeUnit={"px"}
          size={70}
          color={'#123abc'}
         
        />



       </div>:

<div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="name" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}> *نام ولدیت </InputLabel>
        <Input
        required
        id="name"
        style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
        value={ this.state.name}
        onChange={this.handleInput}
        />
      </FormControl>
      
      <br/>
      <div style={{float:'left'}}>
      <span id="FormImageLabel">{this.state.image}</span>
      <input accept="image/*" onChange={this.handleImage} style={{display:'none'}} id="icon-button-file" type="file" />
      <label  htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera style={{color:'rgb(175, 165, 117)' }} />
        </IconButton>
      </label>
      </div>

      <FormControl className={classes.margin}>
        <InputLabel htmlFor="nic" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>*شناختی کارڈ نمبر </InputLabel>
       <InputMask mask="99999 - 9999 - 999 - 9" maskChar=" " id="nic"
        style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
        value={this.state.nic}
        onChange={this.handleInput} >
        {(inputProps) => <Input {...inputProps}  
         
        />}
         
        </InputMask> 
         
      </FormControl>

      <br/>


      <FormControl className={classes.margin}>
        <InputLabel htmlFor="city" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>*شہر </InputLabel>
        <Input
          id="city"
         style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
         value={this.state.city}
         onChange={this.handleInput}
        />
      </FormControl>
      
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="district" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>*ضلع </InputLabel>
        <Input
          id="district"
         style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
         value={this.state.district}
         onChange={this.handleInput}
        />
      </FormControl>
 
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="village_name" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>*گاؤں کا نام </InputLabel>
        <Input
          id="village_name"
         style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
         value={this.state.village_name}
         onChange={this.handleInput}
        />
      </FormControl>

      <br/>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="monthly_income" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>*ماہانہ آمدنی </InputLabel>
        <Input
          id="monthly_income"
         style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
         value={this.state.monthly_income}
         onChange={this.handleInputNumber}
         
        />
      </FormControl>
      <br/>

 <FormControl className={classes.margin} style={{contentAlign:'right',textAlign:'right'}}>
<InputLabel htmlFor="people_count" style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>  *گھر کے افراد کی تعداد  </InputLabel>
        <Input
          id="people_count"
         style={{fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}
         value={this.state.people_count}
         onChange={this.handleInputNumber}
        />
      </FormControl>
 <br/>
      <FormControl className={classes.margin}>
<InputLabel htmlFor="earning_count" style={{contentAlign:'right',textAlign:'right',fontFamily:'MyFont',fontSize:'calc(10px + 2vmin)'}}>  *کمانے والے کتنے ہیں </InputLabel>
        <Input
          id="earning_count"
         style={{fontSize:'calc(10px + 2vmin)'}}
         value={this.state.earning_count}
         onChange={this.handleInputNumber}
         pattern="\d*" 

        />
      </FormControl></div>
      }
      <br/>
      </div>
                 
       
      </Paper>
<br/>
      <Button onClick={this.Add} variant="contained" style={{textTransform:'none',fontWeight:'bold',padding:'5px 50px',background:'rgb(97, 79, 40)',color:'lightgrey',fontFamily:'serif',marginLeft:'calc(80vw - 190px)'}}>Add</Button>



      <Dialog open={this.state.modalOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
           
          </DialogContentText>
          <div style={{padding:'40px'}} style={{maxWidth:'96%'}} >
          <Barcode ref={el => (this.componentReff = el)} 
          width= {1}
          height= {50}
          format= "CODE128"
          displayValue= {true}
          fontOptions= ""
          font= "monospace"
          textAlign= "center"
          textPosition= "bottom"
          textMargin= {2}
          fontSize= {20}
          background= "#ffffff"
          lineColor= "#000000"
          margin= {10}
          marginTop= {undefined}
          marginBottom= {undefined}
          marginLeft= {undefined}
          marginRight= {undefined}
          
          
          
          
          
          value={window.btoa(this.state.nic)} />

          {window.btoa(this.state.nic)}


           
          </div>
        </DialogContent>
        <DialogActions>
          
      
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentReff}
        />
        

        
     
        </DialogActions>
      </Dialog>



        </div> );
    }
}
 Form.contextType=MyContext;
export default withStyles(styles)(Form);
