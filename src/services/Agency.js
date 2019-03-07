import axios from 'axios';
import {GET_ACTIVITY_TYPES, GET_ALL_AGENCIES, GET_MY_ACTIVITIES, GET_MY_AGENCIES} from "./config-api";

class Agency {
  selectMyAgency = () => {
    return axios.get(GET_MY_AGENCIES);
  };

  selectAllAgency = () => {
    return axios.get(GET_ALL_AGENCIES);
  };

  selectMyActivity = (agencyID, params=null) => {
    if(agencyID) {
      return axios.get(`${GET_MY_ACTIVITIES}${agencyID}/`);
    } else {
      return axios.get(`${GET_MY_ACTIVITIES}`, {params: params});
    }
  };

  selectActivityType = () => {
    return axios.get(GET_ACTIVITY_TYPES);
  }
}

const agency = new Agency();
export default agency;
