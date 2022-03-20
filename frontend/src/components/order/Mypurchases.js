import React, { Fragment,useEffect,useState} from "react";
import {Redirect} from "react-router-dom";
//import "./Cart.css";
import OrderDetails from "./OrderDetails";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails} from "../../actions/orderAction";
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import moment from 'moment';
import {ListGroup} from "react-bootstrap";
export const Mypurchases = ({history}) =>
{
    const {user} = useSelector((state)=> state.auth);
    const {orderItems} = useSelector((state) => state.getorder);
    const email = user && user.length && user[0].email;
    const dispatch = useDispatch();
    const alert = useAlert();
    useEffect(() => {
      if(email)
      {
        dispatch(getOrderDetails(email));
      }
      }, [dispatch,email]);


return (
    <Fragment>
       <section class="section-pagetop bg">

<div class="container">
            <h2 class="title-page">orders placed</h2>
        </div> 
        </section>
        
        <section class="section-content padding-y">
        <div class="container">
        {orderItems && orderItems.length &&
        <div class="row">
            <main class="col-md-9">
        <div class="card">
        
        <table class="table table-borderless table-shopping-cart">
        <thead class="text-muted">
        <tr class="small text-uppercase">
        <th scope="col">Product</th>
        <th scope="col" width="120">Quantity</th>
        <th scope="col" width="120">Price</th>
        <th scope="col" class="text-right" width="200"> </th>
        </tr>
        </thead>
        {orderItems && 
            orderItems.map((item) => (
        <tbody>
        <tr>
            <td>
                <figure class="itemside">
                <span>orderid: {item.orderid}</span>
                    <div class="aside"><img src={item.image_URL} height="100" widht ="100" class="img-sm" /></div>
                    <figcaption class="info">
                        
                        <a href="#" class="title text-dark"><Link to ={`/product/${item.productid}`}>{item.productname}</Link></a>
                        <p class="text-muted small">{item.shopname}</p>
                        <span>{moment(item.orderdate).format('DD MMM YYYY')}</span>
                    </figcaption>
                </figure>
            </td>
            <td> 
                <p>{item.quantity}</p>
            </td>
            <td> 
                <div class="price-wrap"> 
                    <var class="price"> {
                        item.currency
                      } {`${
                        item.price
                      }`}</var> 

                </div> 
            </td>
        </tr>
        </tbody>))}
        </table>
        
        <div class="card-body border-top">
            <a href="#" class="btn btn-light"> <Link to ="/products"><i class="fa fa-chevron-left"></i>view shopping products </Link></a>
        </div>  
        </div> 
    </main>
    <aside class="col-md-3">  
        <div class="card">
            <div class="card-body">
                    <dl class="dlist-align">
                    <dt>Total amount shopped:</dt>
                    <dd class="text-right">{orderItems && orderItems[0].currency}{`${orderItems && orderItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</dd>
                    </dl>
                    <hr />
                    
            </div> 
        </div>  
    </aside> 
</div>
}
</div> 
</section>
    </Fragment>
    );
}

export default Mypurchases;