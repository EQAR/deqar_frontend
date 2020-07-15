import axios from 'axios';
import {
  GET_COUNTRIES,
  GET_COUNTRIES_LIST,
  GET_INSTITUTION_COUNTRIES,
  GET_PERMISSION_TYPES,
  MANAGE_COUNTRIES,
} from "./config-api";

class Country {
  select = (configParams) => {
    return axios.get(GET_COUNTRIES, configParams);
  };

  list = (params) => {
    return axios.get(GET_COUNTRIES_LIST, {params: params});
  };

  create = (formValues) => {
    return axios.post(`${MANAGE_COUNTRIES}`, formValues);
  };

  read = (countryID) => {
    return axios.get(`${MANAGE_COUNTRIES}${countryID}/`);
  };

  update = (formValues, countryID) => {
    return axios.put(`${MANAGE_COUNTRIES}${countryID}/`, formValues);
  };

  getInstitutionCountries = () => {
    return axios.get(GET_INSTITUTION_COUNTRIES);
  };

  getPermissionTypes = () => {
    return axios.get(GET_PERMISSION_TYPES);
  }
}

const country = new Country();
export default country;
