import axios from 'axios';
import {
  GET_ACTIVITY_TYPES, GET_AGENCIES,
  GET_ALL_AGENCIES,
  GET_MY_ACTIVITIES,
  GET_MY_SUBMISSION_AGENCIES, MANAGE_AGENCY,
  MANAGE_MY_AGENCY
} from "./config-api";

class Agency {
  selectMySubmissionAgency = () => {
    return axios.get(GET_MY_SUBMISSION_AGENCIES);
  };

  getMyAgency = () => {
    return axios.get(MANAGE_MY_AGENCY);
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
  };

  getAgencies = (params) => {
    return axios.get(GET_AGENCIES, {params: params});
  };

  getAgency = (reportID) => {
    return axios.get(`${MANAGE_AGENCY}/${reportID}/`);
  };
}

const agency = new Agency();
export default agency;
