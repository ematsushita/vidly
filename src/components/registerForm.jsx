import React from 'react';
import Joi from 'joi-browser';
import Form from './form';
import { register } from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: {username: '', password: '', name: ''},
    errors: {}
  }

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name")
  }


  doSubmit = async() => {
    try {
      const response = await register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = "/";
    }
    catch (ex){
      if (ex.response && ex.response === 400) {
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors })
      }
    }
    
  }

  render() { 

    return ( 
      <>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </>
     );
  }
}
 
export default RegisterForm;