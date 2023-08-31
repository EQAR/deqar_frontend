import axios from 'axios';
import {
  GET_ASSESSMENTS,
  GET_ASSOCIATIONS,
  GET_EQAR_DECISIONS,
  GET_FLAGS,
  GET_QA_REQUIREMENT_TYPE,
  GET_QFEHEA_LEVELS,
  GET_DEGREE_OUTCOMES
} from "./config-api";

class List {
  selectQFEHEALevels = (configParams) => {
    return axios.get(GET_QFEHEA_LEVELS, configParams);
  };

  selectFlags = () => {
    return axios.get(GET_FLAGS);
  };

  selectAssociations = () => {
    return axios.get(GET_ASSOCIATIONS);
  };

  selectAssessments = () => {
    return axios.get(GET_ASSESSMENTS);
  };

  selectDegreeOutcomes = () => {
    return axios.get(GET_DEGREE_OUTCOMES);
  };

  selectDecisions = () => {
    return axios.get(GET_EQAR_DECISIONS);
  };

  selectQARequirementType = () => {
    return axios.get(GET_QA_REQUIREMENT_TYPE);
  }
}

const list = new List();
export default list;
