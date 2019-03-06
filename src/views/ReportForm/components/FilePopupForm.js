import React, {Component} from 'react';
import {Button, Col, FormGroup, FormText, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Text} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import {validateRequired, validateURL} from "../../../utils/validators";
import language from '../../../services/Language';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import style from './FilePopupForm.module.css'


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
    const { formValue } = this.props;
    this.formApi = formApi;
    if(formValue) {
      this.formApi.setValues(formValue);
    }
  };

  getFileOriginalURL = () => {
    const { disabled, formValue } = this.props;

    if(disabled) {
      if(formValue && formValue.original_location) {
        return (
          <React.Fragment>
            <Label for="file">File Original URL</Label>
            <div className={style.originalLocation}>
              <a href={formValue.original_location} target={'new'}>{formValue.original_location}</a>
            </div>
          </React.Fragment>
        )
      }
    } else {
      return(
        <React.Fragment>
          <Label for="original_location">File Original URL</Label>
          <FormTextField
            field={'original_location'}
            validate={this.validateOriginalLocation}
            placeholder={'Enter file location URL'}
            disabled={disabled}
          />
        </React.Fragment>
      )
    }
  };

  getFileName = () => {
    const { formValue } = this.props;
    const filename = this.formApi.getValue('file');

    if( formValue ) {
      return(
        <FormText color="muted" className={style.filenameDisplay}>
          Currently selected: <span className={style.fileName}>{filename}</span>
        </FormText>
      )
    }
  };

  getFileManager = () => {
    const { disabled, formValue } = this.props;

    if(disabled) {
      if(formValue) {
        return(
          <React.Fragment>
            <Label for="file">File</Label>
            <div>
              <a href={formValue.file} target={'new'}>Download file from DEQAR</a>
            </div>
          </React.Fragment>
        )
      }
    } else {
      return (
        <React.Fragment>
          <Label for="file">OR Upload File</Label>
          <Text field={'filename'} hidden />
          <input
            style={{display: 'block'}}
            type={'file'}
            accept='.pdf'
            onChange={this.onFileChange}
            disabled={disabled}
          />
          {this.getFileName()}
        </React.Fragment>
      )
    }
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
  onUpdateFile = (fileItems) => {
    if (fileItems.length > 0) {
      this.setState({
        file: fileItems.map(fileItem => fileItem.file)
      });
      this.formApi.setValue('filename', fileItems[0].filename)
    } else {
      this.setState({
        file: null
      });
      this.formApi.setValue('filename', '')
    }
  };

  onFileChange = (e) => {
    if(e.target.files) {
      this.setState({
        file: e.target.files[0]
      });
      this.formApi.setValue('filename', e.target.files[0].name)
    }
  };

  // Validation
  validateOriginalLocation = (value, values) => {
    const {file} = this.state;
    const original_file = values['file'];

    if(file) {
      if(value) {
        return "Please either upload a file or enter its location. (Both were entered.)"
      }
    }

    if(!file && !original_file) {
        if(!value) {
          return "Please either upload a file or enter its location. (Neither were entered.)"
        }
    }

    if(value) {
      return validateURL(value)
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
    const {modalOpen, disabled, title, formIndex} = this.props;
    const {languageOptions} = this.state;

    const titleText = `${this.renderActionName()} ${title}`;

    return(
      <Modal isOpen={modalOpen} toggle={this.props.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={(value) => this.props.onFormSubmit(value, formIndex)}
          id="file-popup-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.props.onToggle}>{titleText}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      {this.getFileOriginalURL()}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      {this.getFileManager()}
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
                        disabled={disabled}
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
                        disabled={disabled}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                {disabled ?
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.props.onToggle}
                  >
                    Close
                  </Button>
                  :
                  <Button
                    color="primary"
                    type={'button'}
                    onClick={this.submitForm}
                  >
                    {titleText}
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

FilePopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  formValue: PropTypes.object,
  formIndex: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  onFormSubmitFile: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default FilePopupForm;