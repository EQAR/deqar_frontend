import React, { Component } from 'react';
import ReportForm from "../ReportForm/ReportForm";


class ReportSubmission extends Component {
  render() {
    return(
      <React.Fragment>
        <ReportForm
          formType='create'
          formTitle={'Submit Report'}
        />
      </React.Fragment>
    )
  }
}

export default ReportSubmission;
