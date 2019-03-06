import React, { Component } from 'react';
import InstitutionForm from '../InstitutionForm/InstituttionForm';

class InstitutionDetails extends Component {

  render() {
    const {id, param} = this.props.match.params;

    return(
      <React.Fragment>
        <InstitutionForm
          formType={param}
          formID={parseInt(id, 10)}
          backPath={'/institutions'}
        />
      </React.Fragment>
    )
  }
}

export default InstitutionDetails;