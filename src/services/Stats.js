import axios from 'axios';
import {GET_BADGES} from "./config-api";

class Stats {
  getBadges = () => {
    return axios.get(GET_BADGES)
  }
}

const stats = new Stats();

export default stats;