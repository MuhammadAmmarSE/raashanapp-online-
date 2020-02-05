import React, { Component } from 'react';
import MyContext from '../../../helper/themeContext'
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';


class UsersBarcode extends Component 
{
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() 
    { 
        const customers=this.context.state.customer;
        return ( 
      
        <div>
        {
            customers.length>0?
             <div
             ref={el => (this.componentReff = el)} >
             {customers.map( (customer,id)=>
             <div>
                 <p>Nic : {customer.nic} </p>
                 <Barcode 
                 
                 width= {1}
                 height= {50}
                 format= "CODE128"
                 displayValue= {false}
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
                value={customer.docRef} />
             </div>
             )}
             <ReactToPrint
             trigger={() => <a href="#">Print this out!</a>}
             content={() => this.componentReff} />
             </div>:
             <p>No session User data Exist</p>
        }
        </div>
        
       );
    }
}
 UsersBarcode.contextType=MyContext;
export default UsersBarcode;