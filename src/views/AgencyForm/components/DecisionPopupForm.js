import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Text} from 'informed';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import list from "../../../services/List";
import FormDatePickerField from "../../../components/FormFields/FormDatePickerField";
import {validateRequired, validateRequiredDate} from "../../../utils/validators";
import 'filepond/dist/filepond.min.css';
import {FilePond} from "react-filepond";

class MembershipPopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decisionTypeOptions: [],
      decisionFiles: [],
      decisionExtraFiles: []
    }
  }

  componentDidMount() {
    this.populateDecisionType();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.formIndex !== prevProps.formIndex) {
      this.setFileUpload('decision_file_name', 'decision_file_size', 'decisionFiles');
      this.setFileUpload('decision_file_extra_name', 'decision_file_extra_size', 'decisionExtraFiles')
    }
  }

  setFileUpload = (nameField, sizeField, stateName) => {
    const { formValue } = this.props;

    if (formValue) {
      if (nameField in formValue) {
        if (formValue[nameField].length > 0) {
          this.setState({
            [stateName]: [{
              options: {
                type: 'local',
                file: {
                  name: formValue[nameField],
                  size: formValue[sizeField],
                  type: 'application/pdf'
                }
              }
            }]
          })
        }
      }
    } else {
      this.setState({
        decisionFiles: [],
        decisionExtraFiles: []
      })
    }
  };

  setFormApi = (formApi) => {
    const { formValue } = this.props;
    this.formApi = formApi;
    if(formValue) {
      this.formApi.setValues(formValue);
    }
  };

  // Submit the form
  submitForm = () => {
    this.props.onFormSubmitFile(this.state.decisionFiles, 'decision_file');
    this.props.onFormSubmitFile(this.state.decisionExtraFiles, 'decision_file_extra');
    this.formApi.submitForm();
  };

  // Populate selects
  populateDecisionType = () => {
    list.selectDecisions().then((response) => {
      this.setState({
        decisionTypeOptions: response.data
      })
    })
  };

  onToggle = () => {
    this.props.onToggle();
  };

  // Events
  onFileChange = (fileItems, field, state) => {
    if(fileItems.length > 0) {
      this.setState({
        [state]: fileItems.map(fileItem => fileItem.file)
      });
      this.formApi.setValue(`${field}_name`, fileItems[0].filename);
      this.formApi.setValue(`${field}_size`, fileItems[0].fileSize);
    } else {
      this.setState({
        [state]: []
      })
    }
  };

  getFileManager = (field, label, stateName) => {
    const { disabled, formValue } = this.props;

    if(disabled) {
      if(formValue) {
        if (formValue[field]) {
          return(
            <React.Fragment>
              <FormGroup>
                <Label for={field}>Current {label}</Label>
                <div>
                  <a href={formValue[field]} target={'new'}>Download {label} file from DEQAR</a>
                </div>
              </FormGroup>
            </React.Fragment>
          )
        }
      }
    } else {
      return (
        <React.Fragment>
          <Text field={`${field}_name`} hidden />
          <Text field={`${field}_size`} hidden />
          <Label for={field}>Current {label}</Label>
          <FilePond
            files={this.state[stateName]}
            allowMultiple={false}
            acceptedFileTypes={['application/pdf']}
            onupdatefiles={(fileItems) => this.onFileChange(fileItems, field, stateName)}
          />
        </React.Fragment>
      )
    }
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
    const {modalOpen, title, disabled, formIndex} = this.props;
    const {decisionTypeOptions} = this.state;

    const titleText = `${this.renderActionName()} ${title}`;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id={`file-popup-form-${formIndex}`}
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{titleText}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="decision_date" className={'required'}>Date</Label>
                      <FormDatePickerField
                        field={'decision_date'}
                        placeholderText={'YYYY-MM-DD'}
                        disabled={disabled}
                        validate={validateRequiredDate}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="decision_type" className={'required'}>Decision Type</Label>
                      <FormSelectField
                        field={'decision_type'}
                        options={decisionTypeOptions}
                        placeholder={'Please select'}
                        labelField={'type'}
                        valueField={'id'}
                        disabled={disabled}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {this.getFileManager('decision_file', 'Decision File', 'decisionFiles')}
                {this.getFileManager('decision_file_extra', 'Decision Extra File', 'decisionExtraFiles')}
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
                { disabled ? "" :
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
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

MembershipPopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default MembershipPopupForm;
