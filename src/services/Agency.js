import axios from 'axios';
import {
  GET_ACTIVITY_TYPES,
  GET_AGENCIES,
  GET_MY_ACTIVITIES,
  GET_MY_SUBMISSION_AGENCIES,
  MANAGE_AGENCY,
  MANAGE_MY_AGENCY, POST_AGENCY_DECISION_EXTRA_FILE, POST_AGENCY_DECISION_FILE,
} from "./config-api";

class Agency {
  selectMySubmissionAgency = () => {
    return axios.get(GET_MY_SUBMISSION_AGENCIES);
  };

  getMyAgency = () => {
    return axios.get(MANAGE_MY_AGENCY);
  };

  updateMyAgency = (formValues) => {
    return axios.put(MANAGE_MY_AGENCY, formValues);
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
