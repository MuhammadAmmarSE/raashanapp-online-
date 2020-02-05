import React, { Component } from 'react';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

import {withStyles} from '@material-ui/core/styles';


import './MiniDrawer.css'; 

const style= theme =>({

    typography: {
       
        cursor:'pointer'
      },


})

const headerCell=["Home" , "Setting" , "Profile"]

class MiniDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = { anchorEl:null,  }

        


        
          
    }

     handleClick = event => {
        this.setState({ anchorEl:event.currentTarget });
      };
      
    
       handleClose = () => {
        this.setState({ anchorEl:null });
      };
    render() { 
        const {classes} = this.props;
        const open = Boolean(this.state.anchorEl);
          const id = open ? 'simple-popover' : undefined;
        return (
        <div>
            <IconButton onClick={this.handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
            style={{background:this.state.anchorEl?'rgb(0,0,0,0.2)':null}}
            >
            <MenuIcon />
            </IconButton>
            <Popover
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin=
            {{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin=
            {{
            vertical: 'top',
            horizontal: 'center',
            }}
            
            >

            {headerCell.map( (text,index)=>
            
                <div class="MiniDrawerPoper" >
                    <Typography className={classes.typography}> {text} </Typography>
                </div>
            )
            }

            </Popover>
        </div>  );
    }
}
 
export default withStyles(style)(MiniDrawer);