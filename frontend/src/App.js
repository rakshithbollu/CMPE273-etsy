/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import  Signup  from './components/auth/Signup';
import  Signin  from './components/auth/Signin';
import  Home from './components/Home/Home';
import UserProfile from './components/dashboard/UserProfile';
import EditUser from './components/dashboard/EditUser';
import { Fragment, useEffect } from 'react';
import { Landing } from './components/layout/Landing';
import {Provider} from 'react-redux';
import store from './store';

import Alert from './components/layout/Alert';
import ProtectedRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/userauthentication';
import setAuthToken from './utils/setAuthToken';
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import productDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Cart from "./components/Cart/Cart";
import Mypurchases from "./components/order/Mypurchases";
import {useSelector} from "react-redux";

import ShopCreation from "./components/Shop/ShopCreation";
import ShopDetails from "./components/Shop/ShopDetails";
import Footer from "./components/layout/Footer";
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  const {isAuthenticated,user} = useSelector((state)=>state.auth);
  useEffect(() => {
          store.dispatch(loadUser())
  },[]);
  return (
 
  <Router>
      <Fragment>
        <Navbar />
       
          <Route exact path='/' component={Home}></Route>
          <Route exact path="/product/:productid" component={productDetails}></Route>
          <ProtectedRoute exact path='/products' component={Products}/>
          <Route path='/products/:keyword' component={Products}></Route>
          <Route exact path='/search' component={Search}></Route>
          <ProtectedRoute exact path="/cart" component={Cart}/>
          <Route exact path="/signin" component={Signin} />
          <ProtectedRoute exact path="/mypurchases" component={Mypurchases} />
          <ProtectedRoute exact path="/EditUser" component={EditUser} />
          <ProtectedRoute exact path="/shopcreation" component={ShopCreation}/>
          <ProtectedRoute exact path="/shop/:shopname" component={ShopDetails}/>
          <section className='container'>
          <Alert />
            <Switch>
              <Route exact path="/signup" component={Signup} />
              
              <ProtectedRoute exact path="/UserProfile" component={UserProfile}/>
              
            </Switch>
          </section>
      </Fragment>
      <Footer />
  </Router>
  );
}
export default App;
