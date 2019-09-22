import axios from 'axios';
import {GET_ASSOCIATIONS, GET_EQAR_DECISIONS, GET_FLAGS, GET_QFEHEA_LEVELS} from "./config-api";

class List {
  selectQFEHEALevels = () => {
    return axios.get(GET_QFEHEA_LEVELS);
  };

  selectFlags = () => {
    return axios.get(GET_FLAGS);
  };

  selectAssociations = () => {
    return axios.get(GET_ASSOCIATIONS);
  };

  selectDecisions = () => {
    return axios.get(GET_EQAR_DECISIONS);
  }
}

const list = new List();
export default list;
