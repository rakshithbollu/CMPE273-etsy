import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    CART_DETAILS_REQUEST,
  CART_DETAILS_FAILURE,
  CART_DETAILS_SUCCESS,
  } from "../constants/cartConstants";
  import axios from "axios";
  
  // Adding the productdetails to Cart
  export const addItemsToCart = (productid,quantity,email,price,shopname) => async (dispatch) => {
    
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      email : email,
      productid :productid,
      quantity: quantity,
      price : price,
      shopname : shopname
    }
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/addtocart/",body1,config);;
  
    dispatch({
      type: ADD_TO_CART,
      payload: data,
    });
  };
  

  export const getCartDetails = (email) => async (dispatch) => {
    dispatch({ type: CART_DETAILS_REQUEST });
    try {
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = {
      email : email,
    }
    const body1 = JSON.stringify(body);
    console.log(body);
    const {data} = await axios.post("/api/profile/getCartDetails",body,config);
    dispatch({
      type: CART_DETAILS_SUCCESS,
      payload: data,
    });
  }
    catch (error) {
      dispatch({
        type: CART_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };

  export const removeItemsFromCart = (productid,email) => async (dispatch) => {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      email : email,
      productid :productid,
    }
    const body1 = JSON.stringify(body);
    console.log(body1);
    const {data} = await axios.post("/api/profile/deletefromcart/",body,config);;
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: data,
    });
  };