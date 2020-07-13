import axios from 'axios';
import {GET_COUNTRIES, GET_COUNTRIES_LIST, GET_INSTITUTION_COUNTRIES, GET_PERMISSION_TYPES} from "./config-api";

class Country {
  select = (configParams) => {
    return axios.get(GET_COUNTRIES, configParams);
  };

  list = (params) => {
    return axios.get(GET_COUNTRIES_LIST, {params: params});
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
