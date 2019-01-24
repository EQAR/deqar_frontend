import axios from 'axios';
import {GET_LANGUAGES} from "./config-api";

class Language {
  select = () => {
    return axios.get(GET_LANGUAGES);
  };
}

const language = new Language();
export default language;
