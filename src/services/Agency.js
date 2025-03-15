import axios from 'axios';
import {
  GET_ACTIVITIES, GET_ACTIVITIES_BY_AGENCY, GET_ACTIVITY_GROUPS,
  GET_ACTIVITY_TYPES,
  GET_AGENCIES, GET_ALL_AGENCIES, GET_MY_AGENCIES,
  GET_MY_SUBMISSION_AGENCIES, MANAGE_ACTIVITY_GROUP,
  MANAGE_AGENCY,
  MANAGE_MY_AGENCY, MANAGE_REPORT, POST_AGENCY_DECISION_EXTRA_FILE, POST_AGENCY_DECISION_FILE,
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

  selectActivityByAgencies = (agencies) => {
      return axios.get(`${GET_ACTIVITIES_BY_AGENCY}`, {
        params: { agencies: agencies },
        paramsSerializer: {
          indexes: null, // use brackets with indexes
        }
      });
  };

  selectAllActivities = (params) => {
    return axios.get(`${GET_ACTIVITIES}`, {params: params});
  };

  selectActivityType = () => {
    return axios.get(GET_ACTIVITY_TYPES);
  };

  selectActivityGroup = (activity_type) => {
    return axios.get(`${GET_ACTIVITY_GROUPS}`, {
      params: { activity_type: activity_type },
      paramsSerializer: {
        indexes: null, // use brackets with indexes
      }
    });
  }

  createActivityGroup = (formValues) => {
    return axios.post(`${MANAGE_ACTIVITY_GROUP}/`, formValues);
  };

  getActivityGroup = (groupID) => {
    return axios.get(`${MANAGE_ACTIVITY_GROUP}/${groupID}/`);
  };

  updateActivityGroup = (formValues, groupID) => {
    return axios.put(`${MANAGE_ACTIVITY_GROUP}/${groupID}/`, formValues);
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
