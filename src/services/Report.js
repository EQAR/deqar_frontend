import axios from 'axios';
import {GET_DECISIONS, GET_REPORTS, GET_STATUSES, POST_CSV, POST_FILE, POST_REPORT} from "./config-api";
import createTableAPIParams from "../utils/createTableAPIParams";

class Report {
  listByInstitution = (state) => {
    const params = createTableAPIParams(state);
    return axios.get(GET_REPORTS, {params: params})
  };

  submitCSV = (csvData) => {
    return axios.post(POST_CSV, csvData, {
      headers: {'Content-Type': 'text/csv'}
    });
  };

  submitReport = (formValues) => {
    return axios.post(POST_REPORT, formValues);
  };

  submitReportFile = (file, reportFileID) => {
    return axios.put(`${POST_FILE}/${reportFileID}/${file.name}`, file);
  };

  selectStatus = () => {
    return axios.get(GET_STATUSES);
  };

  selectDecisions = () => {
    return axios.get(GET_DECISIONS);
  };
}

const report = new Report();

export default report;