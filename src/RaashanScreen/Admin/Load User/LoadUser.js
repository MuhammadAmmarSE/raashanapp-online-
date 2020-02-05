import React, { Component } from 'react';
import { Button, Paper } from '@material-ui/core';
import MyContext from '../../../helper/themeContext';
import { withStyles } from '@material-ui/core/styles';

import firebase from 'firebase'
import InputBase from '@material-ui/core/InputBase';

import BarcodeReader from 'react-barcode-reader'
import PulseLoader from 'react-spinners/PulseLoader';
// import BarcodeImage from './barcode3.jpg'
import BarcodeImage from './5.png'
import CardImage from './card.jpg'
import ClearIcon from '@material-ui/icons/Clear';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';


import './LoadUser.css'

const style = theme => ({

  Searchroot: {
    position: 'relative',
    height: '40px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    float: 'right',
    width: 300,
    background:'rgb(0,0,0,0.5)',
    marginRight:'30px',
  },
  Searchinput: {

    marginLeft: theme.spacing(1),
    transition: 'all 0.2s ease',
    flex: 1,
   color:'lightgrey',
   
  },

  inputFocused: {
    color:'#FFFFFF',
    borderRadius:'5px',
    border:'0px',
    paddingLeft:'20px',
    backgroundColor: "rgb(0,0,0,0.2)",
  },


  iconButton: {
    padding: 10,
  },
});

class LoadUser extends Component {
  constructor(props) {

    super(props);
    this.state = { loading: false, result: 'No result', error: false, data: {}, response: false, Nic: '', }
    this.handleScan = this.handleScan.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleText = this.handleText.bind(this);
  }

  componentDidMount() {
    let elements = document.getElementById("ImageCardDiv");
    elements.classList.remove('move');
    elements.classList.add('stops');

  }



  handleScan(data) {
    // this.setState({
    //   result: data,loading:true,response:false,error:false,data:{}
    // })
    let global = this;
    let elementa = document.getElementById("ImageCardDiv");
    elementa.classList.remove('stops');
    elementa.classList.add('move');

    setTimeout(function () {
      global.setState({
        result: 'aaa', loading: true, response: false, error: false, data: {}
      })
      global.getData(data);
    }, 1200);

  }


  handleClick() {
    let global = this;
    let elementa = document.getElementById("ImageCardDiv");
    elementa.classList.remove('stops');
    elementa.classList.add('move');

    setTimeout(function () {
      global.setState({
        result: 'aaa', loading: true, response: false, error: false, data: {}
      })
    }, 1200);

  }


  //this.getData(data);

  handleError(err) {
    console.error(err)

  }


  componentWillUnmount() {


  }

  getData = (id) => {
    console.log(id)
    firebase.firestore().collection('custom').doc(id).get().then(snapshot => {
      let customer = snapshot.data();

      if (customer) {
        this.setState({ data: customer, loading: false, response: true })
        console.log("customer", customer)
      }
      else {
        console.log("error", snapshot)
        this.setState({ error: true, loading: false, response: true })
      }
    });

  }

  handleText(event) {
    this.setState({ Nic: event.target.value });
  }

  getDataByNic = () => {

    let global=this;
    console.log('aa')
    this.setState({
      loading: true, response: false, error: false, data: {}
    })
    firebase.firestore().collection('custom').where("nic", "==", this.state.Nic).get().then(QuerySnapshot => {


      let customer = QuerySnapshot.docs[0].data();
      console.log(customer)

      if (customer) {
        this.setState({ data: customer, loading: false, response: true })
        console.log("customer", customer)
      }
      else {
        console.log("error", customer)
        this.setState({ error: true, loading: false, response: true })
      }
      // doc.data() is never undefined for query doc snapshots



      // let customer=snapshot[0].data();

      //   if(customer)
      //   {
      //     this.setState({data:customer,loading:false,response:true})
      //     console.log("customer",customer)
      //   }
      //   else
      //   {
      //       console.log("error",snapshot)
      //       this.setState({error:true,loading:false,response:true})
      //   }

    }).
      catch(function (error) {
        console.log("Error getting documents: ", error);
        global.setState({ error: true, loading: false, response: true })
      });

  }
  render() {
    const { classes } = this.props;
    return (<div style={{ display: 'block', background: '', width: '100%', height: 'calc(100% - 160px)', textAlign: 'center' }} >


      {this.state.loading ? <div style={{ display: 'block', background: 'rgb(255,255,255,0.7)', height: 'calc(50vh - 100px)', paddingTop: 'calc(50vh - 80px)' }}>
        <PulseLoader

          sizeUnit={"px"}
          size={20}
          color={'#4B3522'}

        />



      </div> :

        <div>

          {

            this.state.response == true ?  <div style={{ width: '100%', height: 'calc(100vh - 170px)', background: '' }}  >

              {
                this.state.error == true ? <Paper style={{ width: '100%', height: '10%', background: 'rgb(255,255,255,0.7)' }} elevation={5} > User Does Not Exist</Paper> :
                <div style={{ width:'100%',height:'100%'}} >
                  <div  style={{ borderTopLeftRadius:'10px',borderTopRightRadius:'10px',width: '100%', height: 'calc(10% - 4px)', background: 'rgb(255,255,255,0.7)' }} elevation={5}>
                   <span className="LoadUserText1" > {this.state.data.name} </span> 
                    <Button onClick={()=>this.setState({loading:false,response:false}) } className="LoadUserButtonTop1" > <ClearIcon/> </Button>
                  </div>

                  <Paper square style={{ paddingTop:'20px' ,width: '100%', height: 'calc(90% - 40px)', background: 'rgb(255,255,255,0.4)' }} elevation={5}>
                    <div className="LoadUserFlex1">
                      <span className="LoadUserText2"> Nic:  </span> <span className="LoadUserText3"> {this.state.data.nic} </span>
                      <span className="LoadUserText2"> Monthly Income :  </span> <span className="LoadUserText3"> {this.state.data.monthly_income} </span>
                    </div>
                  </Paper>
                  
                </div>
              }


            </div> :
              <Paper component="form" style={{ width: '100%', height: '100%', background: 'rgb(255,255,255,0.7)' }} elevation={5} >
               
                <Paper  square tabindex="0" className={classes.Searchroot}>
                  <InputBase
                    classes={{ focused: classes.inputFocused}}
                    className={classes.Searchinput}
                    placeholder="Search By Nic"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    value={this.state.Nic}
                    onChange={this.handleText}
                  />
                  <IconButton type="submit" onClick={() => this.getDataByNic()} className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>

                {/* <Button style={{ position: 'absolute' }} onClick={this.handleClick}> ddd</Button> */}
                <BarcodeReader
                  onError={this.handleError}
                  onScan={this.handleScan}
                />
                <div style={{ overflow: 'hidden', background: '', width: '100%', height: 'calc(100vh - 220px)', textAlign: 'center' }}>

                  <img src={BarcodeImage} style={{ width: "auto", maxWidth: '100%', height: 'auto', maxHeight: '100%' }} alt="Scan Barcode" />


                  <div id="ImageCardDiv"  className="stops" >
                    <img src={CardImage} id="ImageCard" style={{}} alt="Scan Barcode" />
                  </div>
                 


                </div>



              </Paper>
          }


        </div>}




    </div>);
  }
}
LoadUser.contextType = MyContext;

export default withStyles(style)(LoadUser);