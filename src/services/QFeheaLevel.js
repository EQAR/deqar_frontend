import axios from 'axios';
import {GET_QFEHEA_LEVELS} from "./config-api";

class QFeheaLevel {
  select = () => {
    return axios.get(GET_QFEHEA_LEVELS);
  };
}

const qfEHEALevel = new QFeheaLevel();
export default qfEHEALevel;
