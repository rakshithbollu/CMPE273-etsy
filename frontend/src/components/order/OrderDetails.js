import React,{useState} from "react";
//import './CartItemCard.css';
import { Link } from "react-router-dom";
import moment from 'moment';
import {ListGroup} from "react-bootstrap";
const OrderDetails = ({item}) => {
  const [orderid,setOrderid]=useState('');
 
    return (
      <ListGroup varient="flush">
      <ListGroup.Item>
        <div className="CartItemCard">
        <img src={item.image_URL} alt=" " />
        <div>
        {orderid !== item.orderid ?
          <span>{item.orderid}</span> : ''}
          <Link to={`/product/${item.productid}`}>{item.productname}</Link>
          <span>{item.shopname}</span>
          <span>{`Price: ${item.currency} ${item.price}`}</span>
          {orderid !== item.orderid ?
          <span>{moment(item.orderdate).format('DD MMM YYYY')}</span> : ''}
        </div>
      </div>
      </ListGroup.Item>
      </ListGroup>
    );
}
export default OrderDetails;