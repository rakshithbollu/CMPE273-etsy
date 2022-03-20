import {
    ADD_ORDER_DETAILS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_SUCCESS
  } from "../constants/orderConstants";
import axios from "axios";
  
  // Adding the productdetails to Cart
  export const addOrderDetails = (email)  => async (dispatch) => {
    
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      email : email,
    }
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/orders/",body1,config);;
  
    dispatch({
      type: ADD_ORDER_DETAILS,
      payload: data,
    });
  };

  // getting the user order details
  export const getOrderDetails = (email)  => async (dispatch) => {
    try {
    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }
    const body = {
      email : email,
    }
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })
    const body1 = JSON.stringify(body);
    const {data} = await axios.post("/api/profile/mypurchases/",body1,config);
  
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  }
    catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAILURE,
        payload: error.response.data.message,
      });
    }
  };
 