import React from 'react';
import AgencyForm from "../FormFields/AgencyForm/AgencyForm";
import {connect} from "react-redux";

const MyAgency = ({userIsAdmin, match, agencies, ...props}) => {
  const {id, param} = match.params;

  return(
    <React.Fragment>
      <AgencyForm
        formTitle={param === 'view' ?
          `My Data » My Agency » View : Agency ID ${id}` :
          `My Data » My Agency » Edit : Agency ID ${id}`}
        formType={param ? param : 'view'}
        agencyID={id}
        backPath={'/my-agencies'}
        userIsAdmin={userIsAdmin}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin,
  }
};

export default connect(mapStateToProps)(MyAgency);
