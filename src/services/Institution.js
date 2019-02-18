import axios from 'axios';
import { GET_INSTITUTIONS } from "./config-api";


class Institution {
  async select(search, loadedOptions) {
    let params;
    let hasMore;

    if (search) {
      params = {
        query: search,
        limit: 10,
        offset: loadedOptions.length
      };
      return axios.get(GET_INSTITUTIONS, {params: params}).then((response) => {
        hasMore = response.data.next ? true : false;
        return {
          options: response.data.results,
          hasMore: hasMore
        }
      });
    }
  }

  getInstitutions = (params) => {
    return axios.get(GET_INSTITUTIONS, { params: params });
  }
}

const institution = new Institution();
export default institution;
