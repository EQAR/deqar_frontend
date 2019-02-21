import React, { Component } from 'react';
import { Form } from 'informed';

import institution from "../../services/Institution";


class InstitutionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      readOnly: false
    }
  }

  componentDidMount() {
    const { formType } = this.props;

    this.setState({
      readOnly: this.isReadOnly(formType)
    });
    formType !== 'create' ? this.populate() : this.null();
  }

  isReadOnly = (formType) => formType === 'view';

  null() {
    console.log('need fix');

  }

  populate = () => {
    const { formID } = this.props;
    institution.getInstitution(formID).then(response => console.log(response))
  }

  render() {
    return (
      <div>
        haha
      </div>
    )
  }
}

export default InstitutionForm;
