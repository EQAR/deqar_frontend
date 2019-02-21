import React, { Component } from 'react';
import InstitutionForm from '../InstitutionForm/InstituttionForm';

class Institution extends Component {

  render() {
    const {id, param} = this.props.match.params;

    return(
      <React.Fragment>
        <InstitutionForm
          formType={param}
          reportID={id}
          backPath={'/institutions'}
        />
      </React.Fragment>
    )
  }
}

export default Institution;
