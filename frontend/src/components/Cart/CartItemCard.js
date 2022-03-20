import React from "react";
import './CartItemCard.css';
import { Link } from "react-router-dom";
const CartItemCard = ({item, deleteCartItems }) => {
    return (
        <div className="CartItemCard">
        <img src={item.image_URL} alt=" " />
        <div>
          <Link to={`/product/${item.productid}`}>{item.productname}</Link>
          <span>{`Price: ${item.currency} ${item.price}`}</span>
          <p onClick={() => deleteCartItems(item.productid)}>Remove</p>
        </div>

      </div>
    );
}

export default CartItemCard;