import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import InventryEdit from './component/InventryEdit';
import InventryHome from './component/InventryHome';
import SideBar from './component/SideBar';
import Footer from './component/Footer';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="containerApp">
        <SideBar/>
        <Route path= "/Inventry" exact component={InventryHome}></Route>
        <Route path="/Inventry/edit/:id" component={InventryEdit}></Route>
        <Footer/>
      </div>
      </BrowserRouter>
    );
  }
}
