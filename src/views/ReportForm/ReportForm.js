import React, {Component} from 'react';
import {Form, Scope} from 'informed';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Collapse,
  FormGroup, FormText,
  Label,
  Row
} from "reactstrap";
import style from './ReportForm.module.css'
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import FormSelectField from "../../components/FormFields/FormSelectField";
import agency from '../../services/Agency';
import report from '../../services/Report';
import FormTextField from "../../components/FormFields/FormTextField";
import {validateDate, validateRequired, validateRequiredDate, validateURL} from "../../utils/validators";
import moment from 'moment'
import AssignedList from "../../components/FormFieldsUncontrolled/AssignedList";
import InstitutionSelect from "./components/InstitutionSelect";
import FilePopupForm from "./components/FilePopupForm";
import ProgrammePopupForm from "./components/ProgrammePopupForm";
import ReportAlert from "./components/ReportAlert";
import { toast } from 'react-toastify';
import FormDatePickerField from "../../components/FormFields/FormDatePickerField";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import InfoBox from "./components/InfoBox";
import {createFormNormalizer} from "./normalizers/createFormNormalizer";
import {updateFormNormalizer} from "./normalizers/updateFormNormalizer";
import {decodeProgrammeNameData, encodeProgrammeNameData} from "./normalizers/programmeNameNormalizer";

class ReportForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agencyOptions: [],
      agencyActivityOptions: [],
      statusOptions: [],
      decisionOptions: [],
      uploadedFile: null,
      files: [],
      fileModalOpen: false,
      fileModalValue: undefined,
      fileModalIndex: undefined,
      programmeModalOpen: false,
      programmeModalValue: undefined,
      programmeModalIndex: undefined,
      alertVisible: false,
      nonFieldErrors: [],
      loading: false,
      readOnly: false,
      infoBoxOpen: true
    }
  }

  componentDidMount() {
    const { formType } = this.props;

    switch(formType) {
      case 'view':
        this.setState({
          readOnly: true
        });
        this.populateForm();
        break;
      case 'create':
        this.setState({
          readOnly: false
        });
        this.populateAgencySelect();
        this.populateStatusSelect();
        this.populateDecisionSelect();
        break;
      case 'edit':
        this.setState({
          readOnly: false
        });
        this.populateForm();
        this.populateAgencySelect();
        this.populateStatusSelect();
        this.populateDecisionSelect();
        break;
      default:
        break;
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { formType } = this.props;

    if (this.props.formType !== prevProps.formType) {
      switch (formType) {
        case 'view':
          this.setState({
            readOnly: true
          });
          break;
        case 'create':
          this.setState({
            readOnly: false
          });
          break;
        case 'edit':
          this.setState({
            readOnly: false
          });
          break;
        default:
          break;
      }
    }
  }

  // Populate form
  populateForm = () => {
    const { reportID } = this.props;

    report.getReport(reportID).then((response) => {
      const formValues = decodeProgrammeNameData(response.data);
      this.formApi.setValues(formValues);

      if('agency' in formValues) {
        this.populateActivitySelect(formValues['agency']['id'])
      }

      const files = new Array(formValues['report_files'].length);
      this.setState({
        files: files
      });
    })
  };

  // Populate selects
  populateAgencySelect = () => {
    agency.selectMyAgency().then((response) => {
      this.setState({
        agencyOptions: response.data
      })
    })
  };

  populateActivitySelect = (agencyID) => {
    if(agencyID) {
      agency.selectMyActivity(agencyID).then((response) => {
        this.setState({
          agencyActivityOptions: response.data
        })
      })
    } else {
      this.setState({
        agencyActivityOptions: []
      });
      this.formApi.setValue('activity', '')
    }
  };

  populateStatusSelect = () => {
    report.selectStatus().then((response) => {
      this.setState({
        statusOptions: response.data
      })
    })
  };

  populateDecisionSelect = () => {
    report.selectDecisions().then((response) => {
      this.setState({
        decisionOptions: response.data
      })
    })
  };

  renderProgrammeField = () => {
    const { programmeModalOpen, programmeModalValue, programmeModalIndex, readOnly } = this.state;
    const formState = this.formApi.getState();
    const activity = this.formApi.getValue('activity');
    if(activity) {
      const activityType = activity.activity_type;
      if(activityType !== 'institutional') {
        return(
          <React.Fragment>
            <Row>
              <Col md={12}>
                <ProgrammePopupForm
                  modalOpen={programmeModalOpen}
                  title={'Programme'}
                  onToggle={this.toggleProgrammeModal}
                  onFormSubmit={this.onProgrammeSubmit}
                  formValue={programmeModalValue}
                  formIndex={programmeModalIndex}
                  disabled={readOnly}
                />
                <AssignedList
                  errors={formState.errors}
                  valueFields={['name_primary']}
                  values={formState.values.programmes}
                  label={'Assigned programmes'}
                  labelShowRequired={true}
                  btnLabel={'Add Programme'}
                  validate={this.validateProgrammes}
                  onRemove={this.onProgrammeRemove}
                  onAddButtonClick={this.toggleProgrammeModal}
                  onClick={this.onProgrammeClick}
                  field={'programmes'}
                  disabled={readOnly}
                />
              </Col>
            </Row>
            </React.Fragment>
        )
      }
    }
  };

  renderError = () => {
    const {alertVisible, nonFieldErrors} = this.state;

    return (
      <Row>
        <Col md={12}>
          <ReportAlert
            visible={alertVisible}
            onClose={this.onAlertClose}
            errorMessage={nonFieldErrors}
          />
        </Col>
      </Row>
    )
  };

  // ToggleModals
  toggleFileModal = () => {
    this.setState({
      uploadedFile: null,
      fileModalOpen: !this.state.fileModalOpen,
      fileModalIndex: undefined,
      fileModalValue: undefined
    })
  };

  toggleProgrammeModal = () => {
    this.setState({
      programmeModalOpen: !this.state.programmeModalOpen,
      programmeModalIndex: undefined,
      programmeModalValue: undefined
    })
  };

  // Toggle loading
  loadingToggle = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  };

  // Infobox toggle
  infoBoxToggle = () => {
    this.setState({ infoBoxOpen: !this.state.infoBoxOpen });
  };

  // Events
  onAlertClose = () => {
    this.setState({
      alertVisible: false
    });
  };

  onAgencyChanged = (value) => {
    if(value) {
      this.populateActivitySelect(value.id);
    } else {
      this.populateActivitySelect(null);
    }
    this.formApi.setValue('activity', '')
  };

  onInstitutionSelected = (value) => {
    let institutions = this.formApi.getValue('institutions');

    if(institutions) {
      const institution_ids = institutions.map(i => i.id);
      if(!(institution_ids.includes(value.id))) {
        institutions.push(value)
      }
    } else {
      institutions = [value]
    }
    this.formApi.setValue('institutions', institutions);
  };

  onInstitutionClick = (idx) => {};

  onInstitutionRemove = (idx) => {
    let institutions = this.formApi.getValue('institutions');
    institutions.splice(idx, 1);
    this.formApi.setValue('institutions', institutions);
  };

  onProgrammeSubmit = (value, idx) => {
    let programmes = this.formApi.getValue('programmes');
    programmes = programmes ? programmes : [];

    if(idx >= 0) {
      programmes[idx] = value;
    } else {
      programmes.push(value);
    }
    this.formApi.setValue('programmes', programmes);
    this.toggleProgrammeModal();
  };

  onProgrammeClick = (idx) => {
    this.setState({
      programmeModalOpen: true,
      programmeModalValue: this.formApi.getValue('programmes')[idx],
      programmeModalIndex: idx
    });
  };

  onProgrammeRemove = (idx) => {
    let programmes = this.formApi.getValue('programmes');
    programmes.splice(idx, 1);
    this.formApi.setValue('programmes', programmes);
  };

  onFileFormSubmit = (value, idx) => {
    let reportFiles = this.formApi.getValue('report_files');
    reportFiles = reportFiles ? reportFiles : [];

    // Insert form-values
    if(idx >= 0) {
      reportFiles[idx] = value;
    } else {
      reportFiles.push(value);
    }
    this.formApi.setValue('report_files', reportFiles);

    const { uploadedFile } = this.state;

    // Insert files into state
    if(uploadedFile) {
      if(idx >= 0) {
        this.setState(prevState => ({
          files: [...prevState.files.slice(0, idx), uploadedFile, ...prevState.files.slice(idx+1)],
        }))
      } else {
        this.setState(prevState=> ({
          files: [...prevState.files, uploadedFile],
        }))
      }
    }
    this.toggleFileModal();
  };

  onFileAdded = (file) => {
    this.setState({
      uploadedFile: file
    });
  };

  onFileRemove = (idx) => {
    // Remove report_file entries from the form
    let reportFiles = this.formApi.getValue('report_files');
    reportFiles.splice(idx, 1);
    this.formApi.setValue('report_files', reportFiles);

    // Remove the uploaded files as well
    let {files} = this.state;
    if(files) {
      files.splice(idx, 1);
      this.setState({
        files: files
      })
    }
  };

  onFileClick = (idx) => {
    this.setState({
      fileModalOpen: true,
      fileModalIndex: idx,
      fileModalValue: this.formApi.getValue('report_files')[idx]
    });
  };

  onYearPlusClick = () => {
    const valid_from = this.formApi.getValue('valid_from');
    let valid_to = this.formApi.getValue('valid_to');

    if(valid_from) {
      if(!valid_to) {
        valid_to = moment(valid_from);
      } else {
        valid_to = moment(valid_to);
      }
      this.formApi.setValue('valid_to', valid_to.add(1, 'y').format('YYYY-MM-DD'))
    }
  };

  // Local validators
  validateDateFrom = (value) => {
    const valid_to = this.formApi.getValue('valid_to');
    if(!validateRequiredDate(value)) {
      if(valid_to) {
        if(!validateRequiredDate(valid_to)) {
          if(!moment(value).isBefore(valid_to)) {
            return "Valid from is later date, then valid to"
          }
        }
      }
    } else {
      return validateRequiredDate(value);
    }
  };

  validateInstitutions = (value, values) => {
    let institutions = values.institutions;
    institutions = institutions ? institutions : [];
    const activityType = values.activity ? values.activity.activity_type : undefined;

    // If activity is 'joint programme'
    if (activityType === 'joint programme') {
      if(institutions.length < 2) {
        return "At least two institutions are required"
      }
    }

    // At least one institution is required
    if (institutions.length === 0) {
      return "Selection of minimum one institution is required"
    }
  };

  validateProgrammes = (value, values) => {
    let programmes = values.programmes;
    programmes = programmes ? programmes : [];
    const activityType = values.activity ? values.activity.activity_type : undefined;

    // If activity is 'joint programme'
    if (activityType === 'joint programme') {
      if(!(programmes.length === 1)) {
        return "One program record is required"
      }
    }

    // If activity is 'programme'
    if (activityType === 'programme') {
      if(programmes.length === 0) {
        return "At least one program record is required"
      }
    }
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  uploadFiles = (reportFileID, idx) => {
    const {files} = this.state;
    if(files[idx]) {
      if('name' in files[idx]) {
        report.submitReportFile(files[idx], reportFileID).then((response) => {
          toast.warn(`Uploading file ${files[idx].name} was successful.`);
        }).catch((error) => {
          toast.error(`There was a problem uploading the file: ${files[idx].name}.`)
        });
      }
    }
  };

  createReport = (values) => {
    let normalizedForm = createFormNormalizer(values);
    normalizedForm = encodeProgrammeNameData(normalizedForm);
    report.submitReport(normalizedForm).then((response) => {
      toast.success("Report record was created.");
      const filesResponse = response.data.submitted_report.files;
      filesResponse.forEach((file, idx) => {
        this.uploadFiles(file.id, idx);
      });
    }).then(() =>{
      this.loadingToggle();
      this.formApi.reset();
    }).catch((error) => {
      const errors = error.response.data.errors;
      if ('non_field_errors' in errors) {
        this.setState({
          alertVisible: true,
          nonFieldErrors: errors.non_field_errors
        })
      }
      Object.keys(errors).forEach(key => {
        if(key !== 'non_field_errors') {
          if (this.formApi.fieldExists(key)) {
            if(typeof myVar === 'string') {
              this.formApi.setError(key, errors[key]);
            }
          }
        }
      });
    });
  };

  updateReport = (values) => {
    const { reportID } = this.props;
    let normalizedForm = updateFormNormalizer(values);
    normalizedForm = encodeProgrammeNameData(normalizedForm);
    report.updateReport(normalizedForm, reportID).then((response) => {
      toast.success("Report record was updated.");
      this.formApi.setValues(decodeProgrammeNameData(response.data));
      const filesResponse = response.data.report_files;
      filesResponse.forEach((file, idx) => {
        this.uploadFiles(file.id, idx);
      });
    }).then(() => {
      this.loadingToggle();
    })
  };

  onSubmit = (values) => {
    const {formType} = this.props;
    this.loadingToggle();
    switch(formType) {
      case 'create':
        this.createReport(values);
        break;
      case 'edit':
        this.updateReport(values);
        break;
      default:
        break;
    }
  };

  renderSubmitButton = () => {
    return(
      <div className={'pull-right'}>
        <LaddaButton
          className={style.reportSubmitButton + " btn btn-primary btn-ladda btn-sm"}
          loading={this.state.loading}
          data-color="blue"
          data-style={EXPAND_RIGHT}
        >
          Submit
        </LaddaButton>
      </div>
    )
  };

  renderHideInfoButton = () => {
    const {infoBoxOpen} = this.state;

    return (
      <span className={style.InfoButton}>
        <Button
          size={'sm'}
          color={'secondary'}
          onClick={this.infoBoxToggle}
        >{infoBoxOpen ? "Hide Info" : "Show Info"}</Button>
      </span>
    )
  };

  renderCloseButton = () => {
    const {backPath} = this.props;

    return(
      <React.Fragment>
        <Link to={{pathname: `${backPath}`}}>
          <Button
            size="sm"
            color="secondary"
          >Close</Button>
        </Link>
      </React.Fragment>
    )
  };

  renderEditButton = () => {
    const {backPath, reportID} = this.props;

    if(backPath.includes('my-reports')) {
      return(
        <div className={'pull-right'}>
          <Link to={{pathname: `${backPath}/edit/${reportID}`}}>
            <Button
              size="sm"
              color="primary"
            >Edit Report</Button>
          </Link>
        </div>
      )
    }
  };

  renderButtons = () => {
    const {formType} = this.props;

    switch(formType) {
      case 'view':
        return(
          <div>
            {this.renderCloseButton()}
            {this.renderHideInfoButton()}
            {this.renderEditButton()}
          </div>
        );
      case 'create':
        return(
          <div>
            {this.renderSubmitButton()}
            {this.renderCloseButton()}
          </div>
        );
      case 'edit':
        return(
          <div>
            {this.renderSubmitButton()}
            {this.renderCloseButton()}
            {this.renderHideInfoButton()}
          </div>
        );
      default:
        break;
    }
  };

  render() {
    const {agencyOptions, agencyActivityOptions, statusOptions, decisionOptions,
      fileModalOpen, fileModalValue, fileModalIndex,
      readOnly, infoBoxOpen } = this.state;
    const {formType, formTitle, backPath, reportID} = this.props;

    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>{formTitle}</Col>
            </Row>
          </CardHeader>
          <Form
            getApi={this.setFormApi}
            onSubmit={this.onSubmit}
            onValueChange={this.onValueChange}
            id="report-submission-form"
          >
            {({ formState }) => (
              <React.Fragment>
                <CardBody>
                  {this.renderError()}
                  <Row>
                    <Col md={6} className={style.reportFormLeft}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="agency" className={'required'}>Agency</Label>
                            <FormSelectField
                              field={'agency'}
                              options={agencyOptions}
                              placeholder={'Select agency...'}
                              labelField={'acronym_primary'}
                              valueField={'id'}
                              onChange={this.onAgencyChanged}
                              validate={validateRequired}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="agency">Local Report Identifier</Label>
                            <FormTextField
                              field={'local_identifier'}
                              placeholder={'Enter local report ID'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="activity" className={'required'}>Activity</Label>
                            <FormSelectField
                              field={'activity'}
                              placeholder={'Select agency ESG activity...'}
                              options={agencyActivityOptions}
                              labelField={'activity'}
                              valueField={'id'}
                              validate={validateRequired}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      { readOnly ? "" :
                        <Row>
                          <Col md={12}>
                            <FormGroup>
                              <Label for="institution" className={'required'}>Institution</Label>
                              <InstitutionSelect
                                onChange={this.onInstitutionSelected}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Col md={12}>
                          <AssignedList
                            errors={formState.errors}
                            field={'institutions'}
                            validate={this.validateInstitutions}
                            label={'Assigned institutions'}
                            labelShowRequired={true}
                            valueFields={['name_primary']}
                            values={formState.values.institutions}
                            onRemove={this.onInstitutionRemove}
                            onClick={this.onInstitutionClick}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      {this.renderProgrammeField()}
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="status" className={'required'}>Status</Label>
                            <FormSelectField
                              field={'status'}
                              placeholder={'Select status...'}
                              options={statusOptions}
                              labelField={'status'}
                              valueField={'id'}
                              validate={validateRequired}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="status" className={'required'}>Decision</Label>
                            <FormSelectField
                              field={'decision'}
                              placeholder={'Select decision...'}
                              options={decisionOptions}
                              labelField={'decision'}
                              valueField={'id'}
                              validate={validateRequired}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="valid_from" className={'required'}>Valid from</Label>
                            <FormDatePickerField
                              field={'valid_from'}
                              validate={this.validateDateFrom}
                              placeholderText={'YYYY-MM-DD'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="valid_to">Valid to</Label>
                            <FormDatePickerField
                              field={'valid_to'}
                              validate={validateDate}
                              placeholderText={'YYYY-MM-DD'}
                              disabled={readOnly}
                            />
                            {readOnly ? "" :
                              <FormText color="muted">
                              <span onClick={this.onYearPlusClick} className={style.yearPlus}>
                                +1 Year
                              </span>
                              </FormText>
                            }
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FilePopupForm
                            modalOpen={fileModalOpen}
                            title={'file'}
                            formValue={fileModalValue}
                            formIndex={fileModalIndex}
                            onToggle={this.toggleFileModal}
                            onFormSubmit={this.onFileFormSubmit}
                            onFormSubmitFile={this.onFileAdded}
                            disabled={readOnly}
                          />
                          <AssignedList
                            field={'report_files'}
                            errors={formState.errors}
                            valueFields={['display_name', 'filename', 'original_location']}
                            label={'Assigned files'}
                            labelShowRequired={true}
                            btnLabel={'Add file'}
                            validate={validateRequired}
                            values={formState.values.report_files}
                            onAddButtonClick={this.toggleFileModal}
                            onRemove={this.onFileRemove}
                            onClick={this.onFileClick}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Scope scope="report_links[0]">
                            <FormGroup>
                              <Label for="link">Link to page on agency website (optional)</Label>
                              <FormTextField
                                field={'link'}
                                validate={validateURL}
                                placeholder={'Enter URL of webpage'}
                                disabled={readOnly}
                              />
                            </FormGroup>
                          </Scope>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className={style.infoFooter}>
                  {formType === 'create' ? "" :
                    <Collapse isOpen={infoBoxOpen}>
                      <InfoBox
                        id={reportID}
                        formState={formState.values}
                      />
                    </Collapse>
                  }
                </CardFooter>
                <CardFooter>
                  {this.renderButtons()}
                </CardFooter>
              </React.Fragment>
            )}
          </Form>
        </Card>
      </div>
    )
  }
}

ReportForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  reportID: PropTypes.string,
  backPath: PropTypes.string
};

export default ReportForm