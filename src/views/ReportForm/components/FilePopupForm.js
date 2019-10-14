import React, {Component} from 'react';
import {Button, Col, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Text} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import {validateRequired, validateURL} from "../../../utils/validators";
import language from '../../../services/Language';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';

registerPlugin(FilePondPluginFileValidateType);

class FilePopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      languageOptions: [],
    }
  }

  componentDidMount() {
    this.populateLanguages();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formValue } = this.props;

    if (this.props.formIndex !== prevProps.formIndex) {
      if (formValue) {
        if ('filename' in formValue) {
          if (formValue.filename.length > 0) {
            this.setState({
              files: [{
                options: {
                  type: 'local',
                  file: {
                    name: formValue.filename,
                    size: formValue.filesize,
                    type: 'application/pdf'
                  }
                }
              }]
            })
          }
        }
      } else {
        this.setState({
          files: []
        })
      }
    }
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
        /*
        return (
          <React.Fragment>
            <Label for="file">File Original URL</Label>
            <div className={style.originalLocation}>
              <a href={formValue.original_location} target={'new'}>{formValue.original_location}</a>
            </div>
          </React.Fragment>
        )
        */
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
          <Text field={'filename'} hidden />
          <Text field={'filesize'} hidden />
          <FilePond
            files={this.state.files}
            allowMultiple={false}
            acceptedFileTypes={['application/pdf']}
            onupdatefiles={this.onFileChange}
          />
        </React.Fragment>
      )
    }
  };

  // Submit the form
  onSubmit = (values) => {
    const {formIndex} = this.props;

    this.props.onFormSubmitFile(this.state.files);
    this.props.onFormSubmit(values, formIndex);
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
  onFileChange = (fileItems) => {
    if(fileItems.length > 0) {
      this.setState({
        files: fileItems.map(fileItem => fileItem.file)
      });
      this.formApi.setValue('filename', fileItems[0].filename);
      this.formApi.setValue('filesize', fileItems[0].fileSize);
    } else {
      this.setState({
        files: []
      })
    }
  };

  // Validation
  validateOriginalLocation = (value, values) => {
    const {files} = this.state;
    const original_file = values['original_location'];

    if(files.length > 0) {
      if(value) {
        return "Please either upload a file or enter its location. (Both were entered.)"
      }
    }

    if(!(files.length > 0) && !original_file) {
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
    const {modalOpen, disabled, title} = this.props;
    const {languageOptions} = this.state;

    const titleText = `${this.renderActionName()} ${title}`;

    return(
      <Modal isOpen={modalOpen} toggle={this.props.onToggle}>
        <Form
          getApi={this.setFormApi}
          id="file-popup-form"
          onSubmit={this.onSubmit}
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader>{titleText}</ModalHeader>
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