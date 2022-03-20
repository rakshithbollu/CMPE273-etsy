import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useState } from "react";
import { signin} from '../../actions/userauthentication';
import { connect } from 'react-redux';
// import './Sign.css'
import PropTypes from 'prop-types';
import { Modal, Button} from "react-bootstrap";
import Form  from "react-bootstrap/Form";
import {useHistory} from "react-router-dom";

export const Signin = ({signin, isAuthenticated}) => {   
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    //const successlogin = '';
    const {email,password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name] : e.target.value});
    const history = useHistory();
    const onsignup = async e => {
        e.preventDefault();
        history.push('/signup');
    }
    const onSubmit = async e => {
        e.preventDefault();
        signin({email,password});
    }
    if (isAuthenticated) {
        return <Redirect to="/products" />;
      }
    
    return (
        <div className="container">
        <Form>
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
          </Form.Group>
          <Button variant="outline-primary" value="submit" type="submit" onClick={(e) => onSubmit(e)}>Signin</Button>{' '}
          <Button variant="outline-success" value="Login" type="submit" onClick={(e) => onsignup(e)}>Signup</Button>{' '}
        </Form>
        </div>
    )
}

Signin.propTypes = {
    signin: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
export default connect(mapStateToProps, {signin})(Signin);
