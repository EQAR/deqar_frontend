import axios from 'axios';
import { GET_COUNTRIES, GET_INSTITUTION_COUNTRIES} from "./config-api";

class Country {
  select = () => {
    return axios.get(GET_COUNTRIES);
  };

  getInstitutionCountries = () => {
    return axios.get(GET_INSTITUTION_COUNTRIES);
  };
}

const country = new Country();
export default country;
