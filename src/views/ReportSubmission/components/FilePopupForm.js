import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Text} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import {validateRequired, validateURL} from "../../../utils/validators";
import language from '../../../services/Language';
import FormSelectField from "../../../components/FormFields/FormSelectField";

class FilePopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      languageOptions: [],
    }
  }

  componentDidMount() {
    this.populateLanguages();
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  // Submit the form
  submitForm = () => {
    let {file} = this.state;
    file = file ? file : {};
    this.props.onFormSubmitFile(file);
    this.formApi.submitForm();
  };

  // Populate selects
  populateLanguages = () => {
    language.select().then((response) => {
      this.setState({
        languageOptions: response.data
      })
    })
  };

  // Events
  onFileChange = (e) => {
    this.setState({
      file: e.target.files[0]
    });
    this.formApi.setValue('filename', e.target.files[0].name)
  };

  // Validation
  validateOriginalLocation = (value, values) => {
    const {file} = this.state;
    if(file) {
      if(value) {
        return "Please either upload a file or enter its location. (Both were entered.)"
      }
    } else {
      if(!value) {
        return "Please either upload a file or enter its location. (Neither were entered.)"
      }
    }

    if(value) {
      return validateURL(value)
    }
  };

  render() {
    const {modalOpen, title, submitButtonText} = this.props;
    const {languageOptions} = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.props.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={this.props.onFormSubmit}
          id="file-popup-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.props.onToggle}>{title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="original_location">File URL</Label>
                      <FormTextField
                        field={'original_location'}
                        validate={this.validateOriginalLocation}
                        placeholder={'Enter file location URL'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="file">OR Upload File</Label>
                      <Text field={'filename'} hidden />
                      <input
                        style={{display: 'block'}}
                        type={'file'}
                        accept='.doc,.docx,.pdf'
                        onChange={this.onFileChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="display_name">File Display Name</Label>
                      <FormTextField
                        field={'display_name'}
                        placeholder={'Enter file name for display'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="display_name" className={'required'}>File Languages</Label>
                      <FormSelectField
                        field={'report_language'}
                        options={languageOptions}
                        placeholder={'Please select multiple, if necessary'}
                        labelField={'language_name_en'}
                        valueField={'iso_639_2'}

                        isMulti
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  type={'button'}
                  onClick={this.submitForm}
                >
                  {submitButtonText}
                </Button>{' '}
              </ModalFooter>
            </React.Fragment>
          )}
          </Form>
      </Modal>
    )
  }
}

FilePopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormSubmitFile: PropTypes.func.isRequired
};

export default FilePopupForm;