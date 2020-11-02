import axios from 'axios';
import {GET_LANGUAGES} from "./config-api";

class Language {
  select = (configParams) => {
    return axios.get(GET_LANGUAGES, configParams);
  };
}

const language = new Language();
export default language;
