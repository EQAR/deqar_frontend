import axios from 'axios';
import {GET_COUNTRIES} from "./config-api";

class Country {
  select = () => {
    return axios.get(GET_COUNTRIES);
  };
}

const country = new Country();
export default country;
