import axios from 'axios';
import {GET_USER, POST_EMAIL, POST_PASSWORD} from "./config-api";

class User {
  getUser = () => {
    return axios.get(GET_USER);
  };

  setNewEmail = (formValues) => {
    return axios.post(POST_EMAIL, formValues);
  };

  setNewPassword = (formValues) => {
    return axios.post(POST_PASSWORD, formValues)
  };
}

const user = new User();

export default user;