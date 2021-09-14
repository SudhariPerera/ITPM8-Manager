import React, { Component } from 'react';
import axios from 'axios';
import companyLogo from '../Images/logo_[Black Edition]_ICO.png';
import additemImg from '../Images/additemImg.jpg';

export default class InventryHome extends Component {
constructor(props){
  super(props);

  this.state={
    posts:[]
  };
  
}

componentDidMount(){
  this.retrievePosts();
}


retrievePosts(){
  axios.get("/Inventry/get").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      });

      console.log(this.state.posts);
    }
  });
}


onDelete =(id)=>{
    axios.delete(`/Inventry/delete/${id}`).then((res) =>{
        alert("Delete Successfully");
        this.retrievePosts();
    })
}


filterData(posts,searchKey){
    const result =posts.filter((post)=>
        post.ProductName.toLowerCase().includes(searchKey)
    )

    this.setState({posts:result})
}


handleSearchArea =(e) =>{
    const searchKey = e.currentTarget.value;

        axios.get("/posts").then(res=>{
          if(res.data.success){
            this.filterData(res.data.existingPosts,searchKey)
            }    
        });
}


//------------------------------------For Add popup----------------------------------------//
handleInputChange =(e) =>{
  const{name,value} = e.target;

  this.setState({
      ...this.state,
      [name] : value
  })
}

onSubmit = (e) =>{
  e.preventDefault();

  const{ProductName,UnitPrice,Qty,Price} = this.state;

  const data ={
      ProductName:ProductName,
      UnitPrice:UnitPrice,
      Qty:Qty,
      Price:Price
  }

  console.log(data)

  axios.post("/Inventry/save",data).then((res)=>{
      if(res.data.success){
        alert("Product added Successfuly!")
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
//------------------------------------End Add popup----------------------------------------//


render() {
    return (
      <div className="InventrycontainerHome">

        {/* <!-- Nav Bar --> */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{color:"green"}}>
                <img src={companyLogo} alt="logo"/>
              </a>
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
        {/* <!-- End Nav Bar --> */}

        <br/>

        {/* <!-- ADD Item Modal --> */}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
                         
            <div id="InventryContainer_addItem_POPUP" className="modal-content">

                <div className="InventryCloseBtnContainer">
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>

                <img src={additemImg} alt='ItemLOGO' />
                            
              <div className="InventryFormContainer">
                  
                <h1 className="InventryAddItem_h1"><u>ADD NEW Product</u></h1>
                <form className="addItem_form" noValidate>

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
                            
                        {/* <input type="Number"
                        className="InventryAddItem_input"
                        name="Price"
                        placeholder="Enter Total Price"
                        value={this.state.Price}
                        onChange={this.handleInputChange}/> */}
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

                      <button className="InventryAddItem_Btn" type="submit" onClick={this.onSubmit}>Save</button>

                </form>

              </div>

            </div>
         
          </div>
        </div>
        {/* <!-- End ADD Item Modal --> */}



        {/* <!-- Start Table --> */}
        <table className="InventrytableHome">
          <thead>
            <tr>
              <th className="th8">              
                <button className = "InventryaddItemBtn" type="button" data-toggle="modal" data-target="#exampleModalCenter">ADD Product</button>              
              </th>
             
              <th className="th8"></th>
              <th className="th8"></th>
              <th className="th8"></th>
              <th className="th8"></th>
              <th className="th8"></th>
            </tr>
          </thead>
          
          <thead>
            <tr>
              <th scope="col">ProductId</th>
              <th scope="col">ProductName</th>
              <th scope="col">UnitPrice</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th className="th8" scope="col"></th>
            </tr>
          </thead>
          
          <tbody>
            {this.state.posts.map((posts,index) =>(

                <tr key={index}>
                  <td id="ProductId">{index+1}</td>
                  <td>{posts.ProductName}</td>
                  <td>{posts.UnitPrice}</td>
                  <td>{posts.Qty}</td>
                  <td>{posts.Price}</td>

                  <td className="action">
                    <a className="btn btn-warning" id="editBtn" href={`/Inventry/edit/${posts._id}`}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a className="btn btn-danger" id="deletetBtn" onClick={() =>this.onDelete(posts._id)}>
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete   
                    </a>
                  </td>

                </tr>
            ))}
          </tbody>
            
        </table>
        {/* <!-- End the Table --> */} 

      </div>
    )
} }