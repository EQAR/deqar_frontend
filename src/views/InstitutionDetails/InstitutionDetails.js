import React from 'react';
import InstitutionForm from '../InstitutionForm/InstitutionForm';

const InstitutionDetails = (props) => {
  const { id, param } = props.match.params;

  return(
    <React.Fragment>
      <InstitutionForm
        formType={param}
        formID={parseInt(id, 10)}
        backPath={'/reference/institutions'}
      />
    </React.Fragment>
  )
}

export default InstitutionDetails;
