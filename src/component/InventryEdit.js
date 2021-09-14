import React, { Component } from 'react';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import Item_Image from '../Images/editProduct.jpg';
import Item from '../Images/edit.png';

export default class InventryEdit extends Component {
    
    constructor(props){
        super(props);
        this.state={
            ProductName :"",
            UnitPrice :"",
            Qty :"",
            Price :""
        }
    }

    handleInputChange =(e) =>{
        const{name,value} = e.target;

        this.setState({
            ...this.state,
            [name] : value
        })
    }

    onSubmit = (e) =>{
        e.preventDefault();
        const id = this.props.match.params.id;

        const{ProductName,UnitPrice,Qty,Price} = this.state;

        const data ={
            ProductName:ProductName,
            UnitPrice:UnitPrice,
            Qty:Qty,
            Price:Price
        }

        console.log(data)

        axios.put(`/Inventry/update/${id}`,data).then((res)=>{
            if(res.data.success){
                alert("Post Updated Successfully")
                window.location.href='/Inventry';
                this.setState(
                    {
                        ProductName :"",
                        UnitPrice :"",
                        Qty :"",
                        Price :""
                    }
                )
            }
        })
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/Inventry/getOne/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    ProductName:res.data.post.ProductName,
                    UnitPrice:res.data.post.UnitPrice,
                    Qty:res.data.post.Qty,
                    Price:res.data.post.Price
                });

                console.log(this.state.post);
            }
        });
    }

    render(){
        const{ProductName,UnitPrice,Qty,Price}=this.state;
        return(
            <div>

                {/* <!-- Navigation Bar --> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{color:"green"}}><img src={companyLogo} alt="logo"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex">
                            <input id="searchNav" className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={this.handleSearchArea}/>
                        </form>
                        </div>
                    </div>
                </nav>
                {/* <!-- End Navigation Bar --> */}

                <div className="InventryUpdatedetails_container">
                    <h4>{ProductName}</h4>
                    <hr/>

                    <div className="InventryContainerEdit">

                        <center>
                            <div id="InventryImgContainerEdit">
                                <img alt="Item" className="activator" src={Item}/>
                            </div>
                        </center>

                        <div className="row8">
                            <dt className="InventryCol1">Unit Price</dt>
                            <dd className="InventryCol2">{UnitPrice}</dd>

                            <dt className="InventryCol1">Quantity</dt>
                            <dd className="InventryCol2">{Qty}</dd>

                            <dt className="InventryCol1">Price</dt>
                            <dd className="InventryCol2">Rs.{Price}/=</dd>
                        </div>

                        <button className = "EditFoodItemBtn" type="button" data-toggle="modal" data-target="#exampleModalCenteredit">Edit</button>

                    </div>
 
                </div>

                {/* <!-- Edit Item Modal --> */}
                <div className="modal fade" id="exampleModalCenteredit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
    
                        <div id="InventryContainer_addItem_POPUP" className="modal-content">

                            <div className="InventryCloseBtnContainer">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="imgContainer">
                                <img src={Item_Image} alt='ItemLOGO'/>
                            </div>
                            
                            <div className="InventryFormContainer">
                                
                                <h1 className="InventryAddItem_h1"><u>Update Current Product</u></h1>
                                <form className="InventryAddItem_form" noValidate>

                                    <div className="InventryAddItem_form_group">
                                        <label>Product Name</label>
                                        <input type="text" 
                                        className="InventryAddItem_input" 
                                        name="ProductName" 
                                        placeholder="Enter Product Name"
                                        value={this.state.ProductName}
                                        onChange={this.handleInputChange}/>
                                    </div>

                                    <div className="InventryAddItem_form_group">
                                        <label style={{marginBottom:'5px'}}>Unit Price</label>
                                        <input type="Number"
                                        className="InventryAddItem_input"
                                        name="UnitPrice"
                                        placeholder="Enter Unit Price"
                                        value={this.state.UnitPrice}
                                        onChange={this.handleInputChange}/>
                                    </div>

                                    <div className="InventryAddItem_form_group">
                                        <label style={{marginBottom:'5px'}}>Qty</label>
                                        <input type="Number"
                                        className="InventryAddItem_input"
                                        name="Qty"
                                        placeholder="Enter Qty"
                                        value={this.state.Qty}
                                        onChange={this.handleInputChange}/> 
                                    </div>

                                    <div className="InventryAddItem_form_group">
                                        <label style={{marginBottom:'5px'}}>Price</label>
                                        
                                        <div>
                                            <input type="number" 
                                            className="InventryAddItem_input"
                                            value={this.state.Price}
                                            onChange={this.handleInputChange} 
                                            name="Price" 
                                            id="Price" />
                                            <spam>
                                                {this.state.UnitPrice*this.state.Qty}
                                            </spam>
                                        </div>     

                                    </div>

                                    <button className="InventryAddItem_Btn" type="submit" onClick={this.onSubmit}>Update</button>

                                </form>

                            </div>

                        </div>
                    
                    </div>
                </div>
            {/* <!-- End Edit Item Modal --> */}



{/* 
            <div className="col-md-8 mt-4 mx-auto">
                <h1 className-="h3 mb-3 font-weight-normal">Update posts</h1>
                  <form className="needs-validation" noValidate>
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Product Name</label>
                      <input type="text" 
                        className="form-control" 
                        name="ProductName" 
                        placeholder="Enter Product Name"
                        value={this.state.ProductName}
                        onChange={this.handleInputChange}/>
                    </div>
        
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Unit Price</label>
                      <input type="Number"
                        className="form-control"
                        name="UnitPrice"
                        placeholder="Enter Unit Price"
                        value={this.state.UnitPrice}
                        onChange={this.handleInputChange}/>
                    </div>
        
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Qty</label>
                      <input type="Number"
                        className="form-control"
                        name="Qty"
                        placeholder="Enter Qty"
                        value={this.state.Qty}
                        onChange={this.handleInputChange}/>
                    </div>
    
                    <div className="form-group" style={{marginBottom:'15px'}}>
                      <label style={{marginBottom:'5px'}}>Price</label>
                      <input type="Number"
                        className="form-control"
                        name="Price"
                        placeholder="Enter Total Price"
                        value={this.state.Price}
                        onChange={this.handleInputChange}/>
                    </div>
        
                    <button className="btn btn-success" type="submit" style={{marginTop:'15px'}} onClick={this.onSubmit}>
                      <i className="far fa-check-squre"></i>
                      &nbsp; Update
                    </button>
                  </form>
            </div> */}


            </div>
        );
    }
}