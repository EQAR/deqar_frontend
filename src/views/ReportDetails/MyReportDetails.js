import React from 'react';
import ReportForm from "../ReportForm/ReportForm";

const MyReportDetails = ({match}) => {
  const {id, param} = match.params;

  return(
    <React.Fragment>
      <ReportForm
        formTitle={param === 'view' ?
          `My Data » My Reports » View & Edit : DEQAR ID ${id}` :
          `My Data » My Reports » Edit : DEQAR ID ${id}`}
        formType={param}
        reportID={id}
        backPath={'/my-reports'}
      />
    </React.Fragment>
  )
};

export default MyReportDetails;
