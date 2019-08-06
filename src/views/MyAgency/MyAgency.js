import React from 'react';
import AgencyForm from "../AgencyForm/AgencyForm";
import {connect} from "react-redux";

const MyAgency = ({userIsAdmin, match, ...props}) => {
  const {param} = match.params;

  return(
    <React.Fragment>
      <AgencyForm
        formTitle={param === 'view' ? 'My Data » My Agency » View' : 'My Data » My Agency » Edit'}
        formType={param ? param : 'view'}
        currentPath={'my-agency'}
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

export default connect(mapStateToProps)(MyAgency);
