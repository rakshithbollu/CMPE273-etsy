import { useSelector, useDispatch } from "react-redux";
import React,{ Fragment, useEffect,useState} from 'react';
import "./Products.css";
import { useParams} from "react-router-dom";
import {getProduct} from '../../actions/productAction';
import Product from '../Home/Product.js';
import Pagination from 'react-js-pagination';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const Products = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,250]);
    const [MyArray, setMyArray] = useState([]);

    const one = 1;
    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
       // filteredProductsCount,
      } = useSelector((state) => state.products);
      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };
      let {keyword} = useParams();
      //const keyword = match.params.keyword;
      useEffect(() => {
        dispatch(getProduct(keyword,price));
      }, [dispatch,keyword,price]);
      const priceHandler = (event, newPrice,one) => {
        setPrice(newPrice);
      };
      const sortByPriceAsc = () => {
        const data = MyArray;
            let sorted = data.sort((a, b) => a[1] - b[1]);
            setMyArray(sorted);}
      const sortByPriceDesc = () => {
        const data = MyArray;
            let sorted = data.sort((a, b) => b[1] - a[1]);
            setMyArray(sorted);
        }

return(
    <Fragment>
<div className="container" id ="container">
{products &&
    products.map((product) => (
      <Product product={product} />
    ))}
  </div>
  <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={2500}
            /> </div>
  <div className="paginationBox">
              <Pagination
                activePage={resultPerPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={resultPerPage}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
  </Fragment>);}

  export default Products;
