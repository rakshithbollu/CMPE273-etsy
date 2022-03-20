//import { Fragment } from "react"
import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile,loadUser } from "../../actions/userauthentication";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../actions/types";
import MetaData from "../layout/MetaData";
import Axios from 'axios'
import { Image } from 'cloudinary-react';
import { Modal, Button} from "react-bootstrap";
import Form  from "react-bootstrap/Form";

export const EditUser= ({history}) => {

  const dispatch = useDispatch();
  const alert = useAlert();

  
  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [dateofbirth, setDateOfBirth] = useState("");
  const [picture, setPicture] = useState("");
  const [image, setImage] = useState(null)
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    dispatch(updateProfile(email,name,city,mobile,address,dateofbirth,country,gender,picture));
  };

  const uploadImage = async (e) => {
    e.preventDefault()
    // console.log('image',image);
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('cloud_name', 'dj3in4dua')
    formData.append('upload_preset', 'hbhuqhw2')
    // console.log('image',image);
    await Axios.post(
      'https://api.cloudinary.com/v1_1/dj3in4dua/image/upload',
      formData
    ).then((res) => {
      console.log(res.data.secure_url)
      setPicture(res.data.secure_url)
    })
  }

  useEffect(() => {
    if (user) {
      setname(user[0].name);
      setEmail(user[0].email);
      setDateOfBirth(user[0].dateofbirth);
      setPicture(user[0].picture);
      setMobile(user[0].mobile);
      setCity(user[0].city);
      setCountry(user[0].country);
      setAddress(user[0].address);
      setGender(user[0].gender);
      setImage(user.userImage)
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser()).then (()=> history.push("/UserProfile"));
      //history.push("/UserProfile");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);
  return (
    <div className="container">
    <Form>
    <Form.Group className="mb-3">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" placeholder="Enter your name"  required
                          name="name"
                          value={name}
                          onChange={(e) => setname(e.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3">
      <Form.Label>Email</Form.Label>
      <Form.Control type="text" placeholder="test@sjsu.edu" required
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} />
    </Form.Group>
  
    <Form.Group className="mb-3">
      <Form.Label>Date of Birth</Form.Label>
      <Form.Control type="date" placeholder="MM/DD/YYYY" value={dateofbirth}
                          name='dateofbirth'
                          required='true'
                          onChange={(e) => setDateOfBirth(e.target.value)}/>
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>Mobile Number</Form.Label>
      <Form.Control type="text" placeholder="mobile number" value={mobile}
                          name='mobile'
                          onChange={(e) => setMobile(e.target.value)}
                          required />
    </Form.Group>
    <Form.Group className="mb-3" >
      <Form.Label>City</Form.Label>
      <Form.Control type="text" placeholder="city" value={city}
                          name='city'
                          onChange={(e) => setCity(e.target.value)}
                          required />
    </Form.Group>
    <Form.Group className="mb-3">
    <Form.Label>Select Your Country</Form.Label>
    <Form.Select aria-label="Select the Country" value={country}
                          name='country'
                          onChange={e => setCountry(e.target.value)}>
            <option value="null">Select country</option>
            <option value="usa">Unitedstatesofamerica</option>
             <option value="india">India</option>
             <option value="pakistan">Pakistan</option>
             <option value="china">China</option>
             <option value="russia">Russia</option>
             <option value="japan">Japan</option>
             <option value="brazil">Brazil</option>
  </Form.Select>
  </Form.Group>
  <Form.Group className="mb-3" >
      <Form.Label>Address</Form.Label>
      <Form.Control type="text" placeholder="address" value={address}
                          name='address'
                          onChange={(e) => setAddress(e.target.value)}
                          required />
    </Form.Group>
  <Form.Group  className="mb-3">
      <Form.Label>Upload your Photo</Form.Label>
      <Form.Control type="file" name='userName' onChange={(e) => uploadImage(e)} />
    </Form.Group>
    <Button variant="primary"  value="update" placeholder="Update" type="submit" onClick={(e) => updateProfileSubmit(e)}>
    Submit
  </Button>
  </Form>
  </div>
  );
};

export default EditUser;