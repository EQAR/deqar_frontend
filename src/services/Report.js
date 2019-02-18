import axios from 'axios';
import {
  GET_DECISIONS,
  GET_MY_REPORTS,
  GET_REPORTS, GET_REPORTS_BY_AGENCY,
  GET_STATUSES,
  POST_CSV,
  POST_FILE,
  POST_REPORT
} from "./config-api";

class Report {
  listByAgency = (params) => {
    return axios.get(GET_REPORTS_BY_AGENCY, {params: params})
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

  getReports = (params) => {
    return axios.get(GET_REPORTS, { params: params });
  };

  getMyReports = (params) => {
    return axios.get(GET_MY_REPORTS, { params: params });
  }
}

const report = new Report();

export default report;