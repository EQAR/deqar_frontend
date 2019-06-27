import React from 'react';
import ReportForm from "../ReportForm/ReportForm";

const ReportSubmission = (props) => {
  return(
    <React.Fragment>
      <ReportForm
        formType='create'
        formTitle={'Submit Report'}
      />
    </React.Fragment>
  )
};

export default ReportSubmission;
