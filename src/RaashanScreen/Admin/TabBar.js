import React, { Component } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import SwipeableViews from 'react-swipeable-views';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Form from './Form/Form'
import MyContext from '../../helper/themeContext';
import LoadUser from './Load User/LoadUser'
import UsersBarcode from './Users Barcode/UsersBarcode'
import Background from './backGrey.jpg'

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
    },
  }));

  class TabBar extends Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    componentDidMount(){

      

    }
    render() { 
      return (<div ref={elem => this.nv = elem}>
<MyTabBar  />
</div>

        );
    }
  }
   TabBar.contextType=MyContext;
  export default TabBar;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


 function MyTabBar(){
    const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const theme = useTheme();

        return ( 
        <div style={{width:'100%',height:'calc(100vh - 74px)',backgroundSize:"100vw 800px",paddingTop:'10px',backgroundImage: "url(" + Background + ")"}}>
        <Paper   square style={{height:'calc(100% - 10px)',width:'80%',margin:'auto',background:'rgb(0,0,0,0.5)'}}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Form"  style={{color:value==0?'rgb(175, 165, 117)':'rgb(180, 177, 177)'}}/>
          <Tab label="User"   style={{color:value==1?'rgb(175, 165, 117)':'rgb(180, 177, 177)'}}/>
          <Tab label="Last User Records"  style={{color:value==2?'rgb(175, 165, 117)':'rgb(180, 177, 177)'}} />
        </Tabs>

        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChange}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <div style={{width:'100%',margin:'auto'}}> <Form/> </div>
        </TabPanel>

{value==1?
        <TabPanel  value={value} index={1} dir={theme.direction}>
        <LoadUser/>
        </TabPanel>:<div></div>}
         
        
        <TabPanel disabled value={value} index={2} dir={theme.direction}>
        <UsersBarcode/>
        </TabPanel>
      </SwipeableViews>


      </Paper>
      </div>);
    
}
