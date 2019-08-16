import React from 'react';
import InstitutionForm from '../InstitutionForm/InstitutionForm';

const InstitutionDetails = (props) => {
  const { id, param } = props.match.params;

  return(
    <React.Fragment>
      <InstitutionForm
        formTitle={param === 'view' ?
          `Reference Data » Institutions » View : DEQARINST${id.padStart(4, '0')}` :
          `Reference Data » Institutions » Edit : DEQARINST${id.padStart(4, '0')}`}
        formType={param}
        institutionID={parseInt(id, 10)}
        backPath={'/reference/institutions'}
      />
    </React.Fragment>
  )
};

export default InstitutionDetails;
