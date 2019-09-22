import axios from 'axios';
import {
  GET_DECISIONS,
  GET_MY_REPORTS,
  GET_REPORTS,
  GET_REPORTS_BY_AGENCY,
  GET_STATUSES,
  MANAGE_REPORT,
  POST_CSV,
  POST_FILE,
  POST_REPORT, REMOVE_REPORT_FLAG
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
  };

  getReport = (reportID) => {
    return axios.get(`${MANAGE_REPORT}/${reportID}/`);
  };

  updateReport = (formValues, reportID) => {
    return axios.put(`${MANAGE_REPORT}/${reportID}/`, formValues);
  };

  deleteReport = (reportID) => {
    return axios.delete(`${MANAGE_REPORT}/${reportID}`);
  };

  deleteReportFlag = (flagID) => {
    return axios.delete(`${REMOVE_REPORT_FLAG}/${flagID}`);
  }
}

const report = new Report();

export default report;