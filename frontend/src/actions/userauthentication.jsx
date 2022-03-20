import axios from 'axios';
import { setAlert } from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    CLEAR_ERRORS,
} from './types';
//import setAuthToken from '../utils/setAuthToken';

export const loadUser = () =>async dispatch => {
    
    try {
        // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
        const res = await axios.get('/api/auth/authentication', {
            headers: {
              'authorization': localStorage.getItem('token')
            }
          });
        console.log(res.data.user);
        dispatch({
            type: USER_LOADED,
            payload: res.data.user,
        });
    } catch (err) {
        const errors = err.response.data.errors;
        console.log(errors)
        dispatch({
            type: AUTH_ERROR,
        })
    }
};

export const signup = ({name, email, password}) => async dispatch =>{
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
const body = JSON.stringify({name, email, password});

try{
    const res = await axios.post('/api/users/',body,config);
    if(res.data==='failure'){
        alert("email id already registered");
    }
    else{
        alert("Registration Successfull")
    }
    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
}catch(err){
    const errors = err.response.data.errors;
    if(errors){
        errors.forEach(err => dispatch(setAlert(err.msg)));
    }
    dispatch({
        type: REGISTER_FAIL
    })
}
}

export const signin = ({ email, password}) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password});
    localStorage.setItem('email', email);
    try{
        const res = await axios.post('/api/users/signin',body,config);
        console.log(res.data);
        if(res.data !== "failure"){
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.results,
                payload1 : res.data.token
            });            
         }
         else{
            dispatch({
                type: LOGIN_FAIL,
            })
            alert("username and password didn't match");
         }
        
        
    }catch(err){
        console.log(JSON.stringify(err));
        const errors = err.response.data.errors;
                if(errors){
            errors.forEach(err => dispatch(setAlert(err.msg)));
        }
        if(err)
        {
            alert("Not a registered user");
    }
    }
    };
export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}

export const updateProfile = (email,name,city,mobile,address,dateofbirth,country,gender,picture) => async (dispatch) => {
    try {

      dispatch({ type: UPDATE_PROFILE_REQUEST });
  
      const config = { headers: {  'Content-Type': 'application/json'} };
      const userData = {
        name : name,
        email : email,
        dateofbirth : dateofbirth,
        mobile : mobile,
        city : city,
      country :country,
        address : address,
        gender :gender,
        picture :picture
      }
      console.log(userData);
      const { data } = await axios.post(`/api/profile/changeprofile`, userData, config);
      
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };