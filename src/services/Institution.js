import axios from 'axios';
import { GET_INSTITUTIONS } from "./config-api";
import createTableAPIParams from "../utils/createTableAPIParams";


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
    }

    return axios.get(GET_INSTITUTIONS, { params: params}).then((response) => {
      hasMore = response.data.next ? true : false;
      return {
        options: response.data.results,
        hasMore: hasMore
      }
    });
  }

  async getInstitutions(state) {
    const params = createTableAPIParams(state);
    return axios.get(GET_INSTITUTIONS, { params: params });
  }
}

const institution = new Institution();
export default institution;
