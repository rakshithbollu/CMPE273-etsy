import React, { useState, Fragment,useEffect } from "react";
import MetaData from "../layout/MetaData";
//import "./Search.css";
import { useParams, Redirect} from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import {getShopDetails} from "../../actions/shopAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import ShopProduct from './ShopProduct';
import { Modal, Button } from "react-bootstrap";
import { createProduct ,insertCategory,getCategory} from "../../actions/shopAction"
import { Image } from 'cloudinary-react'
import axios from 'axios';
import {saveShopImage} from '../../actions/shopAction';
import { loadUser } from "../../actions/userauthentication";
import { shopDetailsReducer } from "../../reducers/shopReducer";
import Form from 'react-bootstrap/Form';
//import "./Profile.css";


const ShopDetails = ({ history }) => {

  const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const alert = useAlert();
  const [newcategory,setNewcategory]=useState('');
  const {categories} = useSelector((state)=>state.categorydetails)
      let { shopname } = useParams();
      const{loading,shopdetails,shopsalesrevenue} = useSelector((state)=>state.shopdetail);
      const{user} =useSelector((state) =>state.auth);
      const email =user && user.length && user[0].email;
      useEffect(() => {
        if(shopname)
        {
        dispatch(getShopDetails(shopname));
        dispatch(getCategory(shopname));

        }
        console.log("shop",shopsalesrevenue);
      }, [shopname])

      const uploadImage = async (e) => {
        e.preventDefault()
        // console.log('image',image);
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('cloud_name', 'dj3in4dua')
        formData.append('upload_preset', 'hbhuqhw2')
        // console.log('image',image);
        await axios.post(
          'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
          formData
        ).then((res) => {
          console.log(res.data.secure_url)
          setImage(res.data.secure_url)
        })
      }
      
      const { error, isUpdated } = useSelector((state) => state.createproduct);
  const [productname, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [currency, setCurrency] = useState("");
  const [category, setCategory] = useState("");
  const [image_URL, setImage] = useState("https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true");
  const [shopimage,setShopImage] = useState('');
      const uploadShopImage = async (e) => {
        e.preventDefault()
        // console.log('image',image);
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        formData.append('cloud_name', 'dj3in4dua')
        formData.append('upload_preset', 'hbhuqhw2')
        // console.log('image',image);
        await axios.post(
          'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
          formData
        ).then((res) => {
          console.log(res.data.secure_url)
          setShopImage(res.data.secure_url)
        })
      }
      useEffect(() => {
        if (shopimage) {
          dispatch(saveShopImage(shopimage,email)).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname)));
        }},[shopimage])

  //const shopname = user && user.length && user[0].shopname;
  console.log(shopname);    
  const updateProfileSubmit = (e) => {
    e.preventDefault();
    if (newcategory)
    {
      dispatch(insertCategory(shopname,newcategory)).then(()=>dispatch(createProduct(productname,description,price,stock,currency,newcategory,image_URL,shopname))).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname))).then(()=>dispatch(getCategory(shopname)));
      setShow(false);
    }
    else{
    dispatch(createProduct(productname,description,price,stock,currency,category,image_URL,shopname)).then(()=>dispatch(loadUser())).then(()=>dispatch(getShopDetails(shopname))).then(()=>dispatch(getCategory(shopname)));
    setShow(false);
    }
  };
    return (
    

          <><Fragment>
        {shopdetails && shopdetails.length && user && user.length &&
        <><div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div class="card p-4">
              <div class=" image d-flex flex-column justify-content-center align-items-center">
              <button class="btn btn-secondary"> <Image
              style={{ height: 100, width: 100, marginBottom: 20 }}
              cloudName='dj3in4dua'
              public_id={shopdetails[0].shopimage} />
              </button>
              <p><b>Edit shop image below:</b></p>
              {shopname === user[0].shopname ? 
              <input
                        type='file'
                        className='form-control'
                        name='userName'
                        onChange={(e) => uploadShopImage(e)}
                      ></input> :''}
                      <span class="name mt-3">shopname: {user[0].shopname}</span> <span class="idd">owner: {shopdetails[0].name}</span><span class="idd">{shopdetails[0].email}</span>
         <div class=" d-flex mt-2"> 
                {shopname === user[0].shopname ?
                <Button variant="primary" style={{backgroundColor:"black"}} onClick={handleShow}>Create New Product
                </Button> : ''}
               </div>
              </div>
            </div>
          </div><div className="profileContainer">

              <div>
                <div style={{"display":"flex","alignItems":"center","justifyContent":"center"}}>

                  {shopname === user[0].shopname ? <h6>Total Sales Income from my shop:</h6> : ''}
                  {shopsalesrevenue
                    && shopsalesrevenue.length && shopname === user[0].shopname ? <h6>{shopsalesrevenue[0].totalsalesrevenue}</h6> : ''}

                </div>
                <div style={{"display":"flex","alignItems":"center","justifyContent":"center"}}>
                  <a>
                    view Shop Products:
                  </a>
                </div>
              </div>

            </div></>}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
  <Form.Group className="mb-3">
    <Form.Label>Product name</Form.Label>
    <Form.Control type="text" placeholder="Name of the Product"  required
                        name="productname"
                        value={productname}
                        onChange={(e) => setProductName(e.target.value)} />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Product Description</Form.Label>
    <Form.Control type="text" placeholder="description" required
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Price</Form.Label>
    <Form.Control type="text" placeholder="Price" value={price}
                        name='price'
                        required
                        onChange={(e) => setPrice(e.target.value)}/>
  </Form.Group>
  <Form.Group className="mb-3" >
    <Form.Label>Quantity</Form.Label>
    <Form.Control type="number" placeholder="Product Quantity" value={stock}
                        name='stock'
                        onChange={(e) => setStock(e.target.value)}
                        required />
  </Form.Group>
  <Form.Group className="mb-3">
  <Form.Select aria-label="Select the Currency type" value={currency}
                        name='currency'
                        onChange={e => setCurrency(e.target.value)}>
  <option value="null">SelectCurrency</option>
                        <option value="USD">USD DOLLAR</option>
                        <option value="INR">INDIAN RUPEE</option>
                        <option value="CAD">CANADIAN DOLLAR</option>
                        <option value="euro">EUROS</option>
</Form.Select>
</Form.Group>
<Form.Group className="mb-3">
<Form.Select aria-label="Select Product Category" value={category}
                        name='category'
                        onChange={e => setCategory(e.target.value)} >
                        {categories && categories.map(categoryname => 
                        <option value={categoryname.category}>{categoryname.category}</option>
                        )}
</Form.Select>
{category === 'createnew' ? <input
                      type="text"
                      placeholder="create your own category"  
                      required
                      name="category name"
                      value={newcategory}
                      onChange={(e) => setNewcategory(e.target.value)} /> : ''}
</Form.Group>
<Form.Group controlId="formFile" className="mb-3">
    <Form.Label>Choose product image</Form.Label>
    <Form.Control type="file" onChange={(e) => uploadImage(e)} />
  </Form.Group>
</Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateProfileSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      <div className="container" id="container">
          {shopdetails &&
            shopdetails.map((shopproduct) => (
              <ShopProduct shopproduct={shopproduct} history={history} shopname={shopname} />
            ))}
        </div>
          </Fragment></>
      
    );
          }


export default ShopDetails;