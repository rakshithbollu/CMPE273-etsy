/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
//import "./Profile.css";
import moment from 'moment';
import  FavProduct from './FavProduct';
import { getFavDetails } from "../../actions/favoriteAction";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
const UserProfile = ({ history }) => {
  const dispatch = useDispatch();
    const { user, loading, isAuthenticated } = useSelector((state) => state.auth);
    const {favproducts} =useSelector((state)=>state.favdetails);
    const email = user && user.length && user[0].email;
    const [favkeyword,setFavKeyword] =useState('undefined');
    useEffect(() => {
      if (isAuthenticated === false) {
        history.push("/login");
      }
      else{
        dispatch(getFavDetails(favkeyword,email)); 
      }
    }, [history, isAuthenticated]);
    const searchfavproducts = (e) =>
    {
      e.preventDefault();
      if (favkeyword.trim()) {
        dispatch(getFavDetails(favkeyword,email));
        //history.push("/userProfile");
      } else {
        dispatch(getFavDetails(favkeyword,email));
        //history.push("/userProfile");
      }
    };
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
          {user && user.length && 
            <>
            <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div class="card p-4">
        <div class=" image d-flex flex-column justify-content-center align-items-center"> <button class="btn btn-secondary"> <img src={user[0].picture} height="100" width="100" /></button> <span class="name mt-3">{user[0].name}</span> <span class="idd">{user[0].email}</span>
            <div class=" d-flex mt-2"> <button class="btn1 btn-dark"><Link to="/EditUser">Edit Profile</Link></button> </div>
        </div>
    </div>
</div><div className="profilehhontainer">        
                </div><h2 className="homeHeading">View your Favorite Products</h2><form>
                    <input style={{"width":"700px"}} classname="searchfav"
                      type="text"
                      placeholder="Search your Favorite Products ..."
                      onChange={(e) => setFavKeyword(e.target.value)} />
                    <input type="submit" style={{"backgroundColor":"orange"}} value="Search" onClick={searchfavproducts} />
                  </form><div className="container" id="container">
                    {favproducts &&
                      favproducts.map((product) => (
                        <FavProduct product={product} favkeyword={favkeyword} history={history} />
                      ))}
                  </div></>
}
            </Fragment>
      )}
          </Fragment>
    );
  };
  
  export default UserProfile;