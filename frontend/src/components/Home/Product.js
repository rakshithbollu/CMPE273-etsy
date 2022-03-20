import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";  
import styled from "styled-components";
import {RiHeart3Fill} from 'react-icons/ri';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from "react-redux";
import { FaHeart,FaRegHeart} from "react-icons/fa";
import { deleteFavDetails,getFavDetails,addFavDetails} from "../../actions/favoriteAction";
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;


const Product= ({product,favid,history}) => { 
const favkeyword ="undefined";
  const dispatch= useDispatch();
   const favoriteitems = (e,email,productid) => {
   //e.preventDefault();
    e.stopPropagation(); // USED HERE!
    dispatch(addFavDetails(email,productid)).then(()=>dispatch(getFavDetails(favkeyword,email)));
    //history.push(`/login`);
  };
  const unfavoriteitems = (e,email,productid) => {
    console.log(e);
   //e.preventDefault();
    e.stopPropagation(); // USED HERE!
    dispatch(deleteFavDetails(email,productid)).then(()=>dispatch(getFavDetails(favkeyword,email)));
    //history.push(`/login`);
  };
  const handleshoppage = (e,shopname) => {
    console.log(e);
   //e.preventDefault();
    e.stopPropagation(); // USED HERE!
    history.push(`/shop/${shopname}`);
    //history.push(`/login`);
  };
  const isfav = (productid) => {
    return favid && favid.length && favid.indexOf(productid) !== -1;
  }
  const {isAuthenticated,user} = useSelector(state => state.auth);
  const email = user && user.length && user[0].email;
  const products = (productid) => {
    history.push(`/product/${productid}`);
  }
    return (
      <div className = "productCard" onClick={()=> products(product.productid)}>
      {isAuthenticated &&  (isfav(product.productid) ? (
      <FaHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" 
      onClick={(e) => unfavoriteitems(e,email,product.productid)} />) :<FaRegHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" onClick={(e) => 
        favoriteitems(e,email,product.productid)} />)}
        <div onClick={(e)=> handleshoppage(e,product.shopname)} >
        <a href="" style={{color: 'red'}}>{product.shopname}</a>
        </div>
        <img src={product.image_URL} alt={product.productname} />
      <p>{product.productname}</p>
      <span>{product.currency} {product.price}</span>
        </div>
    )
}
export default Product;
