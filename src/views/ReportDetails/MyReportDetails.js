import React, { Component } from 'react';
import ReportForm from "../ReportForm/ReportForm";


class MyReportDetails extends Component {
  render() {
    const {id, param} = this.props.match.params;

    return(
      <React.Fragment>
        <ReportForm
          formTitle={param === 'view' ? 'View Report' : 'Edit Report'}
          formType={param}
          reportID={id}
          backPath={'/my-reports'}
        />
      </React.Fragment>
    )
  }
}

export default MyReportDetails;
