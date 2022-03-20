
import React, { Fragment, useState, useEffect } from "react";
import { useAlert} from "react-alert";
import "./Footer.css";
import { useDispatch,useSelector } from "react-redux";
import { loadUser } from "../../actions/userauthentication";
import axios from 'axios';
import { getProduct } from "../../actions/productAction";
import { getFavDetails } from "../../actions/favoriteAction";


const Footer = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    const {user} =useSelector((state)=>state.auth);
    const email = user && user.length && user[0].email;
    const [currency,setCurrency] = useState('USD');
    const favkeyword = "undefined";
    
    const onchangeCurrency =  (e)=>
    {
        e.preventDefault();
        setCurrency(e.target.value);
          
    }

    useEffect( () =>
  {
    const body = {currency : currency}
    console.log('currency',currency);
    const res = axios.post(
        '/api/profile/changecurrency',
        body
      )
      if(email)
      {
       dispatch(loadUser()).then(()=>{
         dispatch(getProduct()); 
         dispatch(getFavDetails(favkeyword,email));
      
      });
    }},[dispatch, currency,email]);
   
   
  return (
    <footer id="footer">
      <div className="midFooter">
        <h4><b>United States</b></h4>
      </div>
      <div className="midFooter">
      <select  
             value={currency} 
             name='currency'
             onChange={(e) => onchangeCurrency(e)}>
            <option value="null">Select currency</option>
            <option value="USD">USD</option>
             <option value="INR">INR</option>
             <option value="EURO">EURO</option>
             <option value="Dinar">Dinar</option>
             <option value="CAD">CAD</option>
           </select>
      </div>
    </footer>
  );
};

export default Footer;