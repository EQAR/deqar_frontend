import axios from 'axios';
import {GET_FLAGS, GET_QFEHEA_LEVELS} from "./config-api";

class List {
  selectQFEHEALevels = () => {
    return axios.get(GET_QFEHEA_LEVELS);
  };

  selectFlags = () => {
    return axios.get(GET_FLAGS);
  }
}

const list = new List();
export default list;
