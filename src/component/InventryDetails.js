// import React, { Component } from 'react';
// import axios from 'axios';

// export default class InventryDetails extends Component {
//     constructor(pros){
//         super(pros);

//         this.state={
//             post:{}
//         };

//     }

//     componentDidMount(){
//         const id = this.props.match.params.id;

//         axios.get(`/Inventry/getOne/${id}`).then((res) =>{
//             if(res.data.success){
//                 this.setState({
//                     post:res.data.post
//                 });

//                 console.log(this.state.post);
//             }
//         });
//     }
    
//     render() {
//         const{ProductName,UnitPrice,Qty,Price}=this.state.post;
        
//         return (
//             <div style={{marginTop:"20px"}}>
//                 <h4>{ProductName}</h4>
//                 <hr/>

//                 <d1 className="row">
//                     <dt className="col-sm-3">Unit Price</dt>
//                     <dt className="col-sm-9">{UnitPrice}</dt>

//                     <dt className="col-sm-3">Qty</dt>
//                     <dd className="col-sm-9">{Qty}</dd>

//                     <dt className="col-sm-3">Total Price</dt>
//                     <dd className="col-sm-9">{Price}</dd>
//                 </d1>
//             </div>
//         );
//     }
// }

