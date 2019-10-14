import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {Form} from 'informed';
import PropTypes from 'prop-types';
import FormTextArea from "../../../components/FormFields/FormTextArea";
import {validateRequired} from "../../../utils/validators";


class ReportLinkPopupForm extends Component {
  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;

    if(formValue) {
      this.formApi.setValues(formValue);
    }
  };

  // Submit the form
  onSubmit = (values) => {
    const {formIndex} = this.props;
    this.props.onFormSubmit(values, formIndex);
  };

  renderActionName = () => {
    const {formIndex, disabled} = this.props;
    let action = '';

    if(formIndex >= 0) {
      action = disabled ? 'View' : 'Edit'
    } else {
      action = 'Add'
    }

    return action;
  };

  render() {
    const {modalOpen, disabled, formIndex, title} = this.props;
    const titleText = `${this.renderActionName()} ${title}`;

    return (
      <Modal isOpen={modalOpen} toggle={this.props.onToggle}>
        <Form
          getApi={this.setFormApi}
          id={`file-popup-form-${formIndex}`}
          onSubmit={this.onSubmit}
        >
          {({formState}) => (
            <React.Fragment>
              <ModalHeader>{titleText}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="link" className={'required'}>URL</Label>
                      <FormTextArea
                        field={'link'}
                        placeholder={'Enter URL'}
                        validate={validateRequired}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="link_display_name">URL Display Name</Label>
                      <FormTextArea
                        field={'link_display_name'}
                        placeholder={'Enter name for display'}
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter className={'justify-content-between'}>
                <Button
                  color="secondary"
                  type={'button'}
                  onClick={this.props.onToggle}
                  size="sm"
                >
                  Close
                </Button>
                {disabled ? "" :
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={() => this.formApi.submitForm()}
                    size="sm"
                  >
                    Save
                  </Button>
                }
              </ModalFooter>
            </React.Fragment>
          )}
        </Form>
      </Modal>
    )
  }
}

ReportLinkPopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default ReportLinkPopupForm;
