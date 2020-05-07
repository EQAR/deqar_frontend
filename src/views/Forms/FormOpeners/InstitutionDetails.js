import React from 'react';
import InstitutionForm from '../FormFields/InstitutionForm/InstitutionForm';
import {connect} from "react-redux";

const InstitutionDetails = ({userIsAdmin, ...props}) => {
  const { id, param } = props.match.params;

  const getTitle = () => {
    switch (param) {
      case 'view': {
        return `Reference Data » Institutions » View : DEQARINST${id.padStart(4, '0')}`;
      }
      case 'edit': {
        return `Reference Data » Institutions » Edit : DEQARINST${id.padStart(4, '0')}`;
      }
      case 'create': {
        return `Reference Data » Institutions » Create`
      }
      default: {
        return ''
      }
    }
  };

  return(
    <React.Fragment>
      <InstitutionForm
        formTitle={getTitle()}
        formType={param}
        institutionID={parseInt(id, 10)}
        backPath={'/reference/institutions'}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin
  }
};

export default connect(mapStateToProps)(InstitutionDetails);
