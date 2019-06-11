import React, { Component } from 'react';
import InstitutionForm from '../InstitutionForm/InstitutionForm';

class InstitutionDetails extends Component {

  render() {
    const {id, param} = this.props.match.params;

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
}

export default InstitutionDetails;
