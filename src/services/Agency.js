import axios from 'axios';
import {GET_ACTIVITIES, GET_AGENCIES} from "./config-api";

class Agency {
  select = () => {
    return axios.get(GET_AGENCIES);
  };

  selectActivity = (agencyID) => {
    if(agencyID) {
      return axios.get(`${GET_ACTIVITIES}${agencyID}/`)
    }
  }
}

const agency = new Agency();
export default agency;
