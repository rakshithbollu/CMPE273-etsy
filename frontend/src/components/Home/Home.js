import React,{ Fragment, useEffect} from 'react';
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import "./Home.css";
import Product from './Product.js';
import {getProduct} from '../../actions/productAction';
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import { getFavDetails } from '../../actions/favoriteAction';
import  _ from 'underscore';

const Home = ({history}) => {
  const alert = useAlert();
 
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector((state)=>state.products);
  const {user} =useSelector((state)=>state.auth);
  const email = user && user.length && user[0].email;
  const {favproducts} =useSelector((state)=>state.favdetails);
  const favid =_.pluck(favproducts,'productid');
  const favkeyword ='undefined';
  console.log(favid)
  useEffect(() =>
  {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
    if (email) {
      dispatch(getFavDetails(favkeyword,email));
    }
  },[dispatch, error,alert,email]);
return(
  <Fragment>
      {loading ? (
        <Loader />
      ) : ( 
 <Fragment>
          <h2 className="homeHeading">Trending Products at Etsy</h2> 
          <div className="container" id ="container">
          {products &&
              products.map((product) => (
                <Product product={product} favid= {favid} history={history}/>
              ))}
            </div>
          </Fragment>
      )}
       </Fragment>    
);
}
export default Home;