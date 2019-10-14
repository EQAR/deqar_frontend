import axios from 'axios';
import {
  GET_ACTIVITIES,
  GET_ACTIVITY_TYPES,
  GET_AGENCIES, GET_ALL_AGENCIES, GET_MY_AGENCIES,
  GET_MY_SUBMISSION_AGENCIES,
  MANAGE_AGENCY,
  MANAGE_MY_AGENCY, POST_AGENCY_DECISION_EXTRA_FILE, POST_AGENCY_DECISION_FILE,
} from "./config-api";

class Agency {
  selectMySubmissionAgency = () => {
    return axios.get(GET_MY_SUBMISSION_AGENCIES);
  };

  getMyAgencies = (params) => {
    return axios.get(GET_MY_AGENCIES, {params: params});
  };

  getMyAgency = (agencyID) => {
    return axios.get(`${MANAGE_MY_AGENCY}${agencyID}/`);
  };

  updateMyAgency = (formValues, agencyID) => {
    return axios.put(`${MANAGE_MY_AGENCY}${agencyID}/`, formValues);
  };

  selectActivity = (agencyID, params=null) => {
    if(agencyID) {
      return axios.get(`${GET_ACTIVITIES}${agencyID}/`);
    } else {
      return axios.get(`${GET_ACTIVITIES}`, {params: params});
    }
  };

  selectActivityType = () => {
    return axios.get(GET_ACTIVITY_TYPES);
  };

  selectAllAgencies = () => {
    return axios.get(GET_ALL_AGENCIES)
  };

  getAgencies = (params) => {
    return axios.get(GET_AGENCIES, {params: params});
  };

  getAgency = (agencyID) => {
    return axios.get(`${MANAGE_AGENCY}/${agencyID}/`);
  };

  updateAgency = (formValues, agencyID) => {
    return axios.put(`${MANAGE_AGENCY}/${agencyID}/`, formValues);
  };

  submitDecisionFile = (file, decisionID, type) => {
    if (type === 'decision') {
      return axios.put(`${POST_AGENCY_DECISION_FILE}/${decisionID}/${file.name}`, file);
    } else {
      return axios.put(`${POST_AGENCY_DECISION_EXTRA_FILE}/${decisionID}/${file.name}`, file);
    }
  };
}

const agency = new Agency();
export default agency;
