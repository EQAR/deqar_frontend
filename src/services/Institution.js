import axios from 'axios';
import {GET_INSTITUTIONS} from "./config-api";

class Institution {
  async select(search, loadedOptions) {
    if (search) {
      const params = {
        query: search,
        limit: 10,
        offset: loadedOptions.length
      };
      return axios.get(GET_INSTITUTIONS, {params: params}).then((response) => {
        let has_more;
        response.data.next ? has_more = true : has_more = false;
        return {
          options: response.data.results,
          hasMore: has_more
        }
      });
    }
    return axios.get(GET_INSTITUTIONS);
  }


}

const institution = new Institution();
export default institution;
