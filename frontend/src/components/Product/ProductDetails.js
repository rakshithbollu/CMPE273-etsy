import React, { Fragment, useEffect, useState} from "react";
import { useParams, Redirect} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {getProductDetails} from "../../actions/productAction";
import {addItemsToCart} from "../../actions/cartAction";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import  {getFavDetails,addFavDetails,deleteFavDetails} from '../../actions/favoriteAction';
import { FaHeart,FaRegHeart} from "react-icons/fa";
import _ from "underscore";

 export const ProductDetails = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const favkeyword="undefined";
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
      );
    const {isAuthenticated,user} =useSelector(
      (state) => state.auth
    );
   
    const {favproducts} =useSelector((state)=>state.favdetails);
    const favid =_.pluck(favproducts,'productid'); 
      let { productid } = useParams();
      console.log(productid);
      const addToCartHandler = () => {
        if(!isAuthenticated){
          history.push('/signin');
      }
      else{
        {
          const email = user && user.length && user[0].email;
          const price = product && product.price;
          const shopname = product && product.shopname;
          if (product.stock>1)
          {
          dispatch(addItemsToCart(productid, quantity,email,price,shopname));
          alert.info("Item Added To Cart");
          }
          else
          {
            alert.info("stock is not available");
          }
        }  
    }};
    const email = user && user.length && user[0].email;
      useEffect(() => {
        if(productid)
        {
        dispatch(getProductDetails(productid));
        }
        if (email) {
          dispatch(getFavDetails(favkeyword,email));
        }
      }, [dispatch,productid,email]);
      console.log(product)
      const [quantity, setQuantity] = useState(1);
      console.log("quantity is" +quantity);

  const increaseQuantity = () => {
    if (product.stock <= quantity)
    {
      alert.error('the item reached its maximum limit');
      return;
    }
    const qty = quantity + 1;

    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
 

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
  const isfav = (productid) => {
    return favid && favid.length && favid.indexOf(productid) !== -1;
  }

    return (
        <Fragment>
            <div class="container">
    <div class="col-lg-8 border p-3 main-section bg-white">
        <div class="row m-0">
            <div class="col-lg-4 left-side-product-box pb-3">
                { product && isAuthenticated &&  (isfav(product.productid) ? (
                    <FaHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" 
                    onClick={(e) => unfavoriteitems(e,email,product.productid)} />) :<FaRegHeart className="card-btn" style={{color: '#cc0000'}} title="Favourites" size="1.5em" onClick={(e) => 
                      favoriteitems(e,email,product.productid)} />)}
                     { product &&
                   <img
                   class="border p-3"
                      key={product.image_URL}
                      src={product.image_URL}
                      alt=''
                    />}
            </div>
            <div class="col-lg-8">
                <div class="right-side-pro-detail border p-3 m-0">
                    <div class="row">
                        <div class="col-lg-12">
                            <span><Link to={`/shop/${product.shopname}`}>{product.shopname}</Link></span>
                            <p class="m-0 p-0">{product.productname}</p>
                        </div>
                        <div class="col-lg-12">
                            <p class="m-0 p-0 price-pro">{`${product.currency} ${product.price}`}</p>
                            
                        </div>
                        <div class="col-lg-12 pt-2">
                            <h5>Product Description</h5>
                            <span>{product.description}</span>
                        </div>
                        <div class="col-lg-12">
                            <p class="tag-section">sales count: {product.salescount}</p>
                        </div>
                        <div class="col-lg-12" style={{color:"red"}}>
                            <p style={{color:"red"}} class="tag-section">Available Stock: {product.stock}</p>
                        </div>
                        <div class="col-lg-12">
                            <h6>Quantity :</h6>
                            <button onClick={decreaseQuantity}>-</button>
                            <input type="text" class="form-control text-center w-100" value={quantity}/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <div class="col-lg-12 mt-3">
                            <div class="row">
                                <div class="col-lg-6 pb-2">
                                    <a onClick={addToCartHandler} href="#" class="btn btn-danger w-100" >Add To Cart</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </Fragment>
    )
 }

 export default ProductDetails;