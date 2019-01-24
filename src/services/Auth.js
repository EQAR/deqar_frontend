import axios from 'axios';
import axiosBearerInterceptor from "../utils/axios.bearer_token";
import {GET_TOKEN, POST_PASSWORD_RESET, POST_PASSWORD_RESET_CONFIRM, POST_TOKEN} from "./config-api";

class Auth {
  isAuthenticated = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    } else {
      axiosBearerInterceptor();
      return true;
    }
  };

  authenticate = (username, password) => {
    return axios.post(GET_TOKEN, {
      username: username,
      password: password,
    })
  };

  resetPassword = (formValues) => {
    return axios.post(POST_PASSWORD_RESET, formValues);
  };

  resetPasswordConfirm = (formValues) => {
    return axios.post(POST_PASSWORD_RESET_CONFIRM, formValues);
  };

  getToken = () => {
    return sessionStorage.getItem('token');
  };

  postToken = (formValues) => {
    return axios.post(POST_TOKEN, formValues);
  };

  saveToken = (token) => {
    sessionStorage.setItem('token', token);
  };

  removeToken = () => {
    sessionStorage.removeItem('token');
  };
}

const auth = new Auth();

export default auth;