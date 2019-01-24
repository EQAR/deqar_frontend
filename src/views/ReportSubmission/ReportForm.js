import React, {Component} from 'react';
import {Form, Scope} from 'informed';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
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
      programmeModalOpen: false,
      alertVisible: false,
      nonFieldErrors: [],
      loading: false
    }
  }

  componentDidMount() {
    this.populateAgencySelect();
    this.populateStatusSelect();
    this.populateDecisionSelect();
  }

  // Populate selects
  populateAgencySelect = () => {
    agency.select().then((response) => {
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
    const {programmeModalOpen} = this.state;
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
                  title={'Add programme'}
                  submitButtonText={'Add programme'}
                  onToggle={this.toggleProgrammeModal}
                  onFormSubmit={this.onProgrammeSubmit}
                />
                <AssignedList
                  errors={formState.errors}
                  valueFields={['name_primary']}
                  values={formState.values.programmes}
                  label={'Assigned programmes'}
                  labelShowRequired={true}
                  btnLabel={'Add programme'}
                  validate={this.validateProgrammes}
                  onRemove={this.onProgrammeRemove}
                  onAddButtonClick={this.toggleProgrammeModal}
                  field={'programmes'}
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
      fileModalOpen: !this.state.fileModalOpen
    })
  };

  toggleProgrammeModal = () => {
    this.setState({
      programmeModalOpen: !this.state.programmeModalOpen
    })
  };

  // Toggle loading
  loadingToggle = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
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

  onInstitutionRemove = (idx) => {
    let institutions = this.formApi.getValue('institutions');
    institutions.splice(idx, 1);
    this.formApi.setValue('institutions', institutions);
  };

  onProgrammeSubmit = (value) => {
    let programmes = this.formApi.getValue('programmes');
    programmes = programmes ? programmes : [];
    programmes.push(value);
    this.formApi.setValue('programmes', programmes);
    this.toggleProgrammeModal();
  };

  onProgrammeRemove = (idx) => {
    let programmes = this.formApi.getValue('programmes');
    programmes.splice(idx, 1);
    this.formApi.setValue('programmes', programmes);
  };

  onFileFormSubmit = (value) => {
    let reportFiles = this.formApi.getValue('report_files');
    reportFiles = reportFiles ? reportFiles : [];
    reportFiles.push(value);
    this.formApi.setValue('report_files', reportFiles);

    let {files, uploadedFile} = this.state;
    files.push(uploadedFile);
    this.setState({
      files: files,
    });
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
    if('name' in files[idx]) {
      report.submitReportFile(files[idx], reportFileID).then((response) => {
        toast.warn(`Uploading file ${files[idx].name} was successful.`);
      }).catch((error) => {
        toast.error(`There was a problem uploading the file: ${files[idx].name}.`)
      });
    }
  };

  onSubmit = (values) => {
    this.loadingToggle();
    let normalizedForm = this.normalizeForm(values);
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
            this.formApi.setError(key, errors[key]);
          }
        }
      });
    });
  };

  normalizeForm = (formValues) => {
    let normalizedForm = {date_format: "%Y-%m-%d"};
    Object.keys(formValues).forEach(key => {
      const value = formValues[key];
      if(value) {
        switch (value.constructor) {
          case Array:
            normalizedForm[key] = [];
            value.forEach((v) => {
              if('id' in v) {
                switch(key) {
                  case "report_language":
                    normalizedForm[key].push(v.iso_639_1);
                    break;
                  case "institutions":
                    normalizedForm[key].push({deqar_id: v.deqar_id});
                    break;
                  case "countries":
                    normalizedForm[key].push(v.iso_3166_alpha2);
                    break;
                  default:
                    normalizedForm[key].push(v.id.toString());
                }
              } else {
                normalizedForm[key].push(this.normalizeForm(v))
              }
            });
            break;
          case Object:
            if('id' in value) {
              switch(key) {
                case "activity":
                  normalizedForm[key] = value.activity;
                  break;
                case "agency":
                  normalizedForm[key] = value.acronym_primary;
                  break;
                case "qf_ehea_level":
                  normalizedForm[key] = value.level;
                  break;
                default:
                  normalizedForm[key] = value.id.toString();
              }
            }
            break;
          default:
            normalizedForm[key] = value;
        }
      }
    });
    return normalizedForm;
  };

  render() {
    const {agencyOptions, agencyActivityOptions, statusOptions, decisionOptions, fileModalOpen} = this.state;

    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>Submit Report</Col>
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
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="agency">Local Report Identifier</Label>
                            <FormTextField
                              field={'local_identifier'}
                              placeholder={'Enter local report ID'}
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="valid_from" className={'required'}>Valid from</Label>
                            <FormTextField
                              field={'valid_from'}
                              validate={this.validateDateFrom}
                              placeholder={'YYYY-MM-DD'}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="valid_to">Valid to</Label>
                            <FormTextField
                              field={'valid_to'}
                              validate={validateDate}
                              placeholder={'YYYY-MM-DD'}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FilePopupForm
                            modalOpen={fileModalOpen}
                            title={'Add file'}
                            submitButtonText={'Add file'}
                            onToggle={this.toggleFileModal}
                            onFormSubmit={this.onFileFormSubmit}
                            onFormSubmitFile={this.onFileAdded}
                          />
                          <AssignedList
                            field={'report_files'}
                            errors={formState.errors}
                            valueFields={['filename', 'original_location']}
                            label={'Assigned files'}
                            labelShowRequired={true}
                            btnLabel={'Add file'}
                            validate={validateRequired}
                            values={formState.values.report_files}
                            onAddButtonClick={this.toggleFileModal}
                            onRemove={this.onFileRemove}
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
                              />
                            </FormGroup>
                          </Scope>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <LaddaButton
                    className={style.reportSubmitButton + " btn btn-primary btn-ladda btn-sm"}
                    loading={this.state.loading}
                    data-color="blue"
                    data-style={EXPAND_RIGHT}
                  >
                    Submit
                  </LaddaButton>
                </CardFooter>
              </React.Fragment>
            )}
          </Form>
        </Card>
      </div>
    )
  }
}

export default ReportForm