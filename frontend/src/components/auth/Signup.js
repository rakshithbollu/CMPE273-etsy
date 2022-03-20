import React from 'react'
import { useState } from "react"
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { signup } from "../../actions/userauthentication";
import { setAlert } from "../../actions/alert";
import { Modal, Button} from "react-bootstrap";
import Form  from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";

export const Signup = ({setAlert, signup}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const history = useHistory();
    const {name,email,password} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});
    const onSubmit = async e => {
        e.preventDefault();
            signup({name,email,password});
    }
    const onlogin = async e => {
      e.preventDefault();
          history.push('/signin');
  }
    return (        
     <div className="container">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required
              name="name"
              value={name}
              onChange={(e) => onChange(e)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="test@sjsu.edu" required
              name="email"
              value={email}
              onChange={(e) => onChange(e)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="enter your password" value={password}
              name='password'
              required
              onChange={(e) => onChange(e)} />
            <Form.Text className="text-muted">
              Password should be minimum of length 8 characters
            </Form.Text>
          </Form.Group>
          <Button variant="outline-primary" value="submit" type="submit" onClick={(e) => onSubmit(e)}>Signup</Button>{' '}
          <Button variant="outline-success" value="Login" type="submit" onClick={(e) => onlogin(e)}>Signin</Button>{' '}
        </Form>
        </div>
    )
}
Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired
};
export default connect(null, {setAlert, signup})(Signup);
