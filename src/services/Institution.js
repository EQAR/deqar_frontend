import axios from 'axios';
import {
  GET_INSTITUTIONS,
  GET_INSTITUTION,
  GET_HISTORICAL_RELATION_TYPES,
  MANAGE_INSTITUTION, GET_HIERARCHICAL_RELATION_TYPES, GET_ORGANIZATION_TYPES
} from "./config-api";


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
  };

  getInstitution = (id) => {
    return axios.get(`${GET_INSTITUTION}${id}/`);
  }

  getHierarchicalRelationTypes = () => {
    return axios.get(GET_HIERARCHICAL_RELATION_TYPES);
  }

  getHistoricalRelationTypes = () => {
    return axios.get(GET_HISTORICAL_RELATION_TYPES);
  }

  submitInstitution = (formValues) => {
    return axios.post(MANAGE_INSTITUTION, formValues);
  }

  updateInstitution = (formValues, institutionID) => {
    return axios.put(`${MANAGE_INSTITUTION}${institutionID}/`, formValues);
  }

  getOrganizationTypes = () => {
    return axios.get(GET_ORGANIZATION_TYPES);
  }
}

const institution = new Institution();
export default institution;
