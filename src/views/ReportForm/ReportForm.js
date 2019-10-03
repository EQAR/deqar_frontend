import React, {Component} from 'react';
import {Form, Scope} from 'informed';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Collapse,
  FormGroup, FormText, Label,
  Row
} from "reactstrap";
import style from './ReportForm.module.css'
import FormSelectField from "../../components/FormFields/FormSelectField";
import agency from '../../services/Agency';
import report from '../../services/Report';
import FormTextField from "../../components/FormFields/FormTextField";
import {
  validateDate,
  validateDateFrom,
  validateRequired,
  validateURL
} from "../../utils/validators";
import moment from 'moment'
import AssignedList from "../../components/FormFieldsUncontrolled/AssignedList";
import InstitutionSelect from "./components/InstitutionSelect";
import FilePopupForm from "./components/FilePopupForm";
import ProgrammePopupForm from "./components/ProgrammePopupForm";
import ReportAlert from "./components/ReportAlert";
import { toast } from 'react-toastify';
import FormDatePickerField from "../../components/FormFields/FormDatePickerField";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import InfoBox from "./components/InfoBox";
import {createFormNormalizer} from "./normalizers/createFormNormalizer";
import {updateFormNormalizer} from "./normalizers/updateFormNormalizer";
import {decodeProgrammeNameData, encodeProgrammeNameData} from "./normalizers/programmeNameNormalizer";
import confirm from 'reactstrap-confirm';
import FormButtons from "../../components/FormFieldsUncontrolled/FormButtons";
import PreventNavigation from '../../components/PreventNavigation/PreventNavigation'


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
      infoBoxOpen: false,
      isSubmit: false
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
      case 'edit':
        if (this.isEditable()) {
          this.setState({
            readOnly: false
          });
          this.populateForm();
          this.populateAgencySelect();
          this.populateStatusSelect();
          this.populateDecisionSelect();
        } else {
          this.props.history.push('/401');
        }
        break;
      case 'create':
        this.setState({
          readOnly: false
        });
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
          this.populateAgencySelect();
          this.populateStatusSelect();
          this.populateDecisionSelect();
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
    agency.selectMySubmissionAgency().then((response) => {
      this.setState({
        agencyOptions: response.data
      })
    })
  };

  populateActivitySelect = (agencyID) => {
    if(agencyID) {
      agency.selectActivity(agencyID).then((response) => {
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
                  onToggle={() => this.toggleModal('programme')}
                  onFormSubmit={this.onProgrammeSubmit}
                  formValue={programmeModalValue}
                  formIndex={programmeModalIndex}
                  disabled={readOnly}
                />
                <AssignedList
                  errors={formState.errors}
                  renderDisplayValue={this.renderProgrammes}
                  values={formState.values.programmes}
                  label={'Programmes'}
                  labelShowRequired={true}
                  btnLabel={'Add'}
                  validate={this.validateProgrammes}
                  onRemove={(idx) => this.onListItemRemove(idx, 'programmes')}
                  onAddButtonClick={() => this.toggleModal('programme')}
                  onClick={(idx) => this.onListItemClick(idx, 'programme', 'programmes')}
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

  toggleModal = (stateBaseName) => {
    this.setState({
      [`${stateBaseName}ModalOpen`]: !this.state[`${stateBaseName}ModalOpen`],
      [`${stateBaseName}ModalIndex`]: undefined,
      [`${stateBaseName}ModalValue`]: undefined
    })
  };

  // ToggleModals
  toggleFileModal = () => {
    this.setState({
      uploadedFile: null,
    });
    this.toggleModal('file');
  };


  // Toggle loading
  toggleLoading = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  };

  // Infobox toggle
  toggleInfoBox = () => {
    this.setState({ infoBoxOpen: !this.state.infoBoxOpen });
  };

  // AssignedList functions
  onListItemClick = (idx, stateBaseName, field) => {
    this.setState({
      [`${stateBaseName}ModalOpen`]: true,
      [`${stateBaseName}ModalIndex`]: idx,
      [`${stateBaseName}ModalValue`]: this.formApi.getValue(field)[idx]
    });
  };

  onListItemRemove = (idx, field) => {
    let values = this.formApi.getValue(field);
    values.splice(idx, 1);
    this.formApi.setValue(field, values);
  };

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

  onProgrammeSubmit = (value, idx) => {
    let programmes = this.formApi.getValue('programmes');
    programmes = programmes ? programmes : [];

    if(idx >= 0) {
      programmes[idx] = value;
    } else {
      programmes.push(value);
    }
    this.formApi.setValue('programmes', programmes);
    this.toggleModal('programme');
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
    if(idx >= 0) {
      this.setState(prevState => ({
        files: [...prevState.files.slice(0, idx), uploadedFile, ...prevState.files.slice(idx+1)],
      }))
    } else {
      this.setState(prevState=> ({
        files: [...prevState.files, uploadedFile],
      }))
    }

    this.toggleFileModal();
  };

  onFileAdded = (file) => {
    if(file.length > 0) {
      if (file[0] instanceof File) {
        this.setState({
          uploadedFile: file[0]
        });
      }
    } else {
      this.setState({
        uploadedFile: null
      })
    }
  };

  onFileRemove = (idx) => {
    // Remove report_file entries from the form
    this.onListItemRemove(idx, 'report_files');

    // Remove the uploaded files as well
    let {files} = this.state;
    if(files) {
      files.splice(idx, 1);
      this.setState({
        files: files
      })
    }
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

    // Mark duplicates
    let names = [];
    programmes.forEach((programme) => {
      names.push(programme.name_primary);
      if (programme.hasOwnProperty('alternative_names')) {
        programme.alternative_names.forEach((aname) => {
          names.push(aname.name_alternative);
        });
      }
    });
    if (new Set(names).size !== names.length) {
      return "You have duplicates in your programme names!"
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
          toast.success(`Uploading file ${files[idx].name} was successful.`);
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
      return response.data.submitted_report;
    }).then((report) =>{
      const {userIsAdmin} = this.props;
      this.toggleLoading();
      this.setState({isSubmit: true});
      userIsAdmin ?
        this.props.history.push(`/reference/reports/view/${report.id}`) :
        this.props.history.push(`/my-reports/view/${report.id}`);
    }).catch((error) => {
      const errors = error.response.data.errors;
      if ('non_field_errors' in errors) {
        this.setState({
          alertVisible: true,
          nonFieldErrors: errors.non_field_errors
        });
        this.toggleLoading();
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

    this.toggleLoading();

    normalizedForm = encodeProgrammeNameData(normalizedForm);
    report.updateReport(normalizedForm, reportID).then((response) => {
      toast.success("Report record was updated.");
      const filesResponse = response.data.report_files;

      filesResponse.forEach((file, idx) => {
        this.uploadFiles(file.id, idx);
      });
    }).then(() => {
      const {userIsAdmin} = this.props;

      this.toggleLoading();
      this.setState({isSubmit: true});

      userIsAdmin ?
        this.props.history.push(`/reference/reports/view/${reportID}`) :
        this.props.history.push(`/my-reports/view/${reportID}`);
    }).catch(error => {
      this.toggleLoading();
    });
  };

  onDelete = () => {
    confirm({
      title: 'Request Deletion',
      message: 'Are you sure you would like to mark this report as deleted?',
      confirmColor: 'danger'
    }).then((result) => {
      const { reportID } = this.props;
      if (result) {
        report.deleteReport(reportID).then((result) => {
          this.populateForm();
          this.setState({
            infoBoxOpen: true
          })
        });
      }
    });
  };

  onRemoveFlag = (flagID) => {
    confirm({
      title: 'Remove Flag',
      message: 'Are you sure you would like to remove this flag from the report?',
      confirmColor: 'danger'
    }).then((result) => {
      if (result) {
        report.deleteReportFlag(flagID).then((result) => {
          this.populateForm();
          this.setState({
            infoBoxOpen: true
          })
        });
      }
    });
  };


  onSubmit = (values) => {
    const {formType} = this.props;
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
  }

  renderDocLink = () => {
    const {formType} = this.props;
    let url;

    switch(formType) {
      case 'view':
        break;
      case 'create':
        url = 'https://docs.deqar.eu/data_submission/#data-submission-via-webform';
        break;
      case 'edit':
        break;
      default:
        break;
    }

    if (url) {
      return(
        <div className="card-header-actions">
          <a className="card-header-action btn btn-close" href={url} target={'blank'} title="Documentation">
            <i className="icon-question"> </i>
          </a>
        </div>
      )
    }
  };

  // Assigned List display values
  renderInstitutions = (value) => {
    return value['name_primary'];
  };

  renderProgrammes = (value) => {
    const {name_primary} = value;

    const {qualification_primary} = value;
    const degree = qualification_primary ? `, ${qualification_primary}` : '';

    const qf_ehea = value['qf_ehea_level'] ? ` (${value['qf_ehea_level']['level']})` : '';
    return `${name_primary}${degree}${qf_ehea}`;
  };

  renderFiles = (value) => {
    const {display_name} = value;
    const {report_language} = value;
    const {original_location} = value;
    const {filename} = value;

    const languages = report_language.map((lang) => { return(lang.language_name_en) });
    let language_display = languages.join(', ');
    language_display = language_display.length > 0 ? `(${language_display})` : '';

    if (display_name) {
      return `${display_name} ${language_display}`;
    } else {
      if (original_location) {
        return `${original_location} ${language_display}`;
      } else {
        return `${filename} ${language_display}`;
      }
    }
  };

  // Buttons
  isEditable = () => {
    const {location, userIsAdmin} = this.props;
    const currentPath = location.pathname;
    if (currentPath.includes('/reference/reports') && !userIsAdmin) {
      return false
    } else {
      // More to come...
      return true
    }
  };

  render() {
    const {agencyOptions, agencyActivityOptions, statusOptions, decisionOptions,
      fileModalOpen, fileModalValue, fileModalIndex,
      readOnly, infoBoxOpen, loading, isSubmit } = this.state;
    const {formType, formTitle, reportID, userIsAdmin, backPath} = this.props;

    return(
      <div className="animated fadeIn">
        <Card className={style.ReportFormCard}>
          <CardHeader>
            <Row>
              <Col>
                {formTitle}
                {this.renderDocLink()}
              </Col>
            </Row>
          </CardHeader>
          <Form
            getApi={this.setFormApi}
            onSubmit={this.onSubmit}
            id="report-submission-form"
          >
            {({ formState }) => (
              <React.Fragment>
                <PreventNavigation
                  formState={formState}
                  isSubmit={isSubmit}
                />
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
                              disabled={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="local_identifier">Local Report Identifier</Label>
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
                              includeID={'back'}
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
                              <Label for="institution" className={'required'}>Institutions</Label>
                              <InstitutionSelect
                                onChange={this.onInstitutionSelected}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      }
                      <Row>
                        <Col md={12}>
                          { readOnly ?
                            <Label for="institution" className={'required'}>Institutions</Label> : null}
                          <AssignedList
                            errors={formState.errors}
                            field={'institutions'}
                            validate={this.validateInstitutions}
                            labelShowRequired={true}
                            renderDisplayValue={this.renderInstitutions}
                            values={formState.values.institutions}
                            onRemove={(idx) => this.onListItemRemove(idx, 'institutions')}
                            onClick={(idx) => this.onListItemClick(idx, 'instiution', 'institutions')}
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
                              includeID={'front'}
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
                              includeID={'front'}
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
                              validate={(value) => validateDateFrom(value, formState.values.valid_to)}
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
                            renderDisplayValue={this.renderFiles}
                            label={'Files'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            validate={validateRequired}
                            values={formState.values.report_files}
                            onAddButtonClick={this.toggleFileModal}
                            onRemove={this.onFileRemove}
                            onClick={(idx) => this.onListItemClick(idx, 'file', 'report_files')}
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
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="link">Other comment (optional)</Label>
                            <FormTextField
                              field={'other_comment'}
                              placeholder={'Enter comment, if necessary'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <FormButtons
                    backPath={backPath}
                    userIsAdmin={userIsAdmin}
                    editButton={this.isEditable()}
                    deleteButton={this.isEditable()}
                    buttonText={'Report'}
                    recordID={reportID}
                    formType={formType}
                    infoBoxOpen={infoBoxOpen}
                    infoBoxToggle={this.toggleInfoBox}
                    submitForm={this.formApi.submitForm}
                    onDelete={this.onDelete}
                    loading={loading}
                  />
                </CardFooter>
                <CardFooter className={style.infoFooter}>
                  {formType === 'create' ? "" :
                    <Collapse isOpen={infoBoxOpen}>
                      <InfoBox
                        id={reportID}
                        formState={formState.values}
                        disabled={readOnly}
                        userIsAdmin={userIsAdmin}
                        onRemoveFlag={this.onRemoveFlag}
                      />
                    </Collapse>
                  }
                </CardFooter>
              </React.Fragment>
            )}
          </Form>
        </Card>
      </div>
    )
  }
}

ReportForm.defaultProps = {
  userIsAdmin: false
};

ReportForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  reportID: PropTypes.string,
  backPath: PropTypes.string,
  userIsAdmin: PropTypes.bool
};

export default withRouter(ReportForm)
