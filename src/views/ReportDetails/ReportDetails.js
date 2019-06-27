import React from 'react';
import ReportForm from "../ReportForm/ReportForm";
import {connect} from "react-redux";


const ReportDetails = ({userIsAdmin, ...props}) => {
  const {id, param} = props.match.params;

  return(
    <React.Fragment>
      <ReportForm
        formTitle={param === 'view' ? 'View Report' : 'Edit Report'}
        formType={param}
        reportID={id}
        backPath={'/reference/reports'}
        userIsAdmin={userIsAdmin}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin
  }
};

export default connect(mapStateToProps)(ReportDetails);
