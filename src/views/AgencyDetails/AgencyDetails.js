import React from 'react';
import {connect} from "react-redux";
import AgencyForm from "../AgencyForm/AgencyForm";

const AgencyDetails = ({userIsAdmin, ...props}) => {
  const {id, param} = props.match.params;

  return(
    <React.Fragment>
      <AgencyForm
        formTitle={param === 'view' ? 'Reference Data » Agencies » View' : 'Reference Data » Agencies » Edit'}
        formType={param}
        agencyID={id}
        backPath={'/reference/agencies'}
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

export default connect(mapStateToProps)(AgencyDetails);
