import React, { useState, Fragment } from "react";
//import MetaData from "../layout/MetaData";
//import "./Search.css";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <Fragment>
      
      <form  style={{"width":"700px"}} onSubmit={searchSubmitHandler}>
        <input
        style={{"width":"633px"}}
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input style={{"backgroundColor":"orange"}} type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;