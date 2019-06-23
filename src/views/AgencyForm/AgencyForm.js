import React, {Component} from 'react';
import {Form, Scope, Text, Checkbox} from 'informed';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col, Collapse,
  FormGroup,
  Label,
  Row
} from "reactstrap";
import style from './AgencyForm.module.css';
import country from "../../services/Country";
import agency from "../../services/Agency";
import PropTypes from "prop-types";
import FormTextField from "../../components/FormFields/FormTextField";
import FormDatePickerField from "../../components/FormFields/FormDatePickerField";
import FormTextAreaFormatted from "../../components/FormFields/FormTextAreaFormatted";
import FormSelectField from "../../components/FormFields/FormSelectField";
import AssignedList from "../../components/FormFieldsUncontrolled/AssignedList";
import MembershipPopupForm from "./components/MembershipPopupForm";
import DecisionPopupForm from "./components/DecisionPopupForm";
import AgencyActivityPopupForm from "./components/AgencyActivityPopupForm";
import FocusCountryPopupForm from "./components/FocusCountryPopupForm";
import {populateFormNormalizer} from "./normalizers/populateFormNormalizer";
import NamePopupForm from "./components/NamePopupForm";
import InfoBox from "./components/InfoBox";
import FormButtons from "../../components/FormFieldsUncontrolled/FormButtons";
import {validateDateFrom, validateRequired, validateRequiredDate, validateRequiredURL} from "../../utils/validators";
import FormTextArrayField from "../../components/FormFieldsUncontrolled/FormTextArrayField";


class AgencyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryOptions: [],
      currentNameModalOpen: false,
      currentNameModalValue: undefined,
      currentNameModalIndex: undefined,
      formerNameModalOpen: false,
      formerNameModalValue: undefined,
      formerNameModalIndex: undefined,
      membershipModalOpen: false,
      membershipModalValue: undefined,
      membershipModalIndex: undefined,
      decisionModalOpen: false,
      decisionModalValue: undefined,
      decisionModalIndex: undefined,
      activityModalOpen: false,
      activityModalValue: undefined,
      activityModalIndex: undefined,
      focusCountryModalOpen: false,
      focusCountryModalValue: undefined,
      focusCountryModalIndex: undefined,
      nonFieldErrors: [],
      alertVisible: false,
      loading: false,
      readOnly: false,
      infoBoxOpen: false,
    };
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
        this.setState({
          readOnly: false
        });
        this.populateForm();
        this.populateCountrySelect();
        break;
      case 'create':
        this.setState({
          readOnly: false
        });
        this.populateCountrySelect();
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
          this.populateCountrySelect();
          break;
        default:
          break;
      }
    }
  }

  populateForm = () => {
    const {agencyID} = this.props;

    if (agencyID) {
      agency.getAgency(agencyID).then((response) => {
        this.formApi.setValues(populateFormNormalizer(response.data));
      })
    } else {
      agency.getMyAgency().then((response) => {
        this.formApi.setValues(populateFormNormalizer(response.data));
      })
    }
  };

  populateCountrySelect = () => {
    country.select().then((response) => {
      this.setState({
        countryOptions: response.data
      })
    })
  };

  renderDecisions = (value) => {
    const {decision_file_name, decision_type, decision_date} = value;
    return `${decision_type['type']}, ${decision_date} (${decision_file_name})`;
  };

  renderActivities = (value) => {
    const {activity_type, activity_description, activity_local_identifier, activity_valid_to} = value;
    return `${activity_description} 
       (${activity_type['type']}${activity_local_identifier ? `; ${activity_local_identifier})` : ')'}
       ${activity_valid_to ? activity_valid_to : ''}`;
  };

  renderFocusCountries = (value) => {
    const {country, country_is_official, country_valid_to} = value;
    return `${country['name_english']} 
       ${country_is_official ? `(official)` : ''}
       ${country_valid_to ? `, ${country_valid_to}` : ''}`;
  };

  renderMemberships = (value) => {
    const {association, membership_valid_from, membership_valid_to} = value;
    return `${association['association']}, ${membership_valid_from} - ${membership_valid_to ? membership_valid_to : ''}`;
  };

  renderNames = (value) => {
    const {agency_name_versions} = value;
    const name = agency_name_versions.filter(version => version['name_is_primary']);
    if (name.length > 0) {
      return `${name[0]['name']} (${name[0]['acronym']})`
    }
  };

  toggleModal = (stateBaseName) => {
    this.setState({
      [`${stateBaseName}ModalOpen`]: !this.state[`${stateBaseName}ModalOpen`],
      [`${stateBaseName}ModalIndex`]: undefined,
      [`${stateBaseName}ModalValue`]: undefined
    })
  };

  // Infobox toggle
  infoBoxToggle = () => {
    this.setState({ infoBoxOpen: !this.state.infoBoxOpen });
  };

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

  onPopupFormSubmit = (value, idx, stateBaseName, field) => {
    let fields = this.formApi.getValue(field);
    fields = fields ? fields : [];

    if(idx >= 0) {
      fields[idx] = value;
    } else {
      fields.push(value);
    }
    this.formApi.setValue(field, fields);
    this.toggleModal(stateBaseName);
  };

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  render() {
    const {readOnly, infoBoxOpen, countryOptions, loading,
      membershipModalOpen, membershipModalValue, membershipModalIndex,
      decisionModalOpen, decisionModalValue, decisionModalIndex,
      activityModalOpen, activityModalValue, activityModalIndex,
      focusCountryModalOpen, focusCountryModalValue, focusCountryModalIndex,
      currentNameModalOpen, currentNameModalValue, currentNameModalIndex,
      formerNameModalOpen, formerNameModalValue, formerNameModalIndex
    } = this.state;
    const {formType, formTitle, userIsAdmin, currentPath, backPath, agencyID} = this.props;

    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            <Row>
              <Col>
                {formTitle}
              </Col>
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
                  <Row>
                    <Col md={6} className={style.reportFormLeft}>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="link">Primary Name / Acronym</Label>
                            <FormTextField
                              field={'primary_name_acronym'}
                              placeholder={'Primary Name / Acronym'}
                              disabled={true}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NamePopupForm
                            modalOpen={currentNameModalOpen}
                            title={'Current Name / Acronym Group'}
                            onToggle={() => this.toggleModal('currentName')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'currentName', 'current_names')}
                            formValue={currentNameModalValue}
                            formIndex={currentNameModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderNames}
                            values={formState.values.current_names}
                            label={'Current Names / Acronyms'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'current_names')}
                            onAddButtonClick={() => this.toggleModal('currentName')}
                            onClick={(idx) => this.onListItemClick(idx, 'currentName', 'current_names')}
                            field={'current_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <NamePopupForm
                            modalOpen={formerNameModalOpen}
                            title={'Former Name / Acronym Group'}
                            onToggle={() => this.toggleModal('formerName')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'formerName', 'former_names')}
                            formValue={formerNameModalValue}
                            formIndex={formerNameModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderNames}
                            values={formState.values.former_names}
                            label={'Former Names / Acronyms'}
                            labelShowRequired={false}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'former_names')}
                            onAddButtonClick={() => this.toggleModal('formerName')}
                            onClick={(idx) => this.onListItemClick(idx, 'formerName', 'former_names')}
                            field={'former_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="link" className={'required'}>Agency Website</Label>
                            <FormTextField
                              field={'website_link'}
                              placeholder={'Enter agency website'}
                              validate={validateRequiredURL}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Label className={style.GroupLabel}>Contact</Label>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="link" className={'required'}>Contact Person</Label>
                            <FormTextField
                              validate={validateRequired}
                              field={'contact_person'}
                              placeholder={'Enter agency contact person name'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Label className={'required'}>Contact Phone</Label>
                          <FormTextArrayField
                            field={'phone_numbers'}
                            values={formState.values.phone_numbers}
                            disabled={readOnly}
                          >
                            <Row>
                              <Col md={12}>
                                <FormGroup>
                                  <Text field={'id'} hidden />
                                  <FormTextField
                                    field={'phone'}
                                    placeholder={'# with country code'}
                                    disabled={readOnly}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormTextArrayField>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label for="link">Contact Fax</Label>
                            <FormTextField
                              field={'fax'}
                              placeholder={'# with country code'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Label className={'required'}>Contact Email</Label>
                          <FormTextArrayField
                            field={'emails'}
                            values={formState.values.emails}
                            disabled={readOnly}
                          >
                            <Row>
                              <Col md={12}>
                                <FormGroup>
                                  <Text field={'id'} hidden />
                                  <FormTextField
                                    field={'email'}
                                    placeholder={'Enter contact email address for agency'}
                                    disabled={readOnly}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </FormTextArrayField>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="address" className={'required'}>Address</Label>
                            <FormTextAreaFormatted
                              field={'address'}
                              disabled={readOnly}
                              validate={validateRequired}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="country" className={'required'}>Country</Label>
                            <FormSelectField
                              options={countryOptions}
                              field={'country'}
                              labelField={'name_english'}
                              valueField={'id'}
                              validate={validateRequired}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <MembershipPopupForm
                            modalOpen={membershipModalOpen}
                            title={'Membership'}
                            onToggle={() => this.toggleModal('membership')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'membership', 'memberships')}
                            formValue={membershipModalValue}
                            formIndex={membershipModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderMemberships}
                            values={formState.values.memberships}
                            label={'Memberships'}
                            labelShowRequired={false}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'memberships')}
                            onAddButtonClick={() => this.toggleModal('membership')}
                            onClick={(idx) => this.onListItemClick(idx, 'membership', 'memberships')}
                            field={'memberships'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Label className={style.GroupLabel}>Register</Label>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="registration_start" className={'required'}>Valid from</Label>
                            <FormDatePickerField
                              field={'registration_start'}
                              validate={(value) => validateDateFrom(value, formState.values.registration_valid_to)}
                              placeholderText={'YYYY-MM-DD'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label for="registration_valid_to" className={'required'}>Valid to</Label>
                            <FormDatePickerField
                              field={'registration_valid_to'}
                              validate={validateRequiredDate}
                              placeholderText={'YYYY-MM-DD'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={2}>
                          <FormGroup>
                            <Label for="is_registered">Registered</Label>
                            <Checkbox
                              field="is_registered"
                              className={style.Checkbox}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="registration_note">Registration Note</Label>
                            <FormTextAreaFormatted
                              field={'registration_note'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <DecisionPopupForm
                            modalOpen={decisionModalOpen}
                            title={'EQAR Decision'}
                            onToggle={() => this.toggleModal('decision')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'decision', 'decisions')}
                            formValue={decisionModalValue}
                            formIndex={decisionModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderDecisions}
                            values={formState.values.decisions}
                            label={'EQAR Decisions'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'decisions')}
                            onAddButtonClick={() => this.toggleModal('decision')}
                            onClick={(idx) => this.onListItemClick(idx, 'decision', 'decisions')}
                            field={'decisions'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <AgencyActivityPopupForm
                            modalOpen={activityModalOpen}
                            title={'Activity'}
                            onToggle={() => this.toggleModal('activity')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'activity', 'activities')}
                            formValue={activityModalValue}
                            formIndex={activityModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderActivities}
                            values={formState.values.activities}
                            label={'Activities'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'activities')}
                            onAddButtonClick={() => this.toggleModal('activity')}
                            onClick={(idx) => this.onListItemClick(idx, 'activity', 'activities')}
                            field={'activities'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <FocusCountryPopupForm
                            modalOpen={focusCountryModalOpen}
                            title={'Activity'}
                            onToggle={() => this.toggleModal('focusCountry')}
                            onFormSubmit={(idx, value) => this.onPopupFormSubmit(idx, value, 'focusCountry', 'focus_countries')}
                            formValue={focusCountryModalValue}
                            formIndex={focusCountryModalIndex}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            renderDisplayValue={this.renderFocusCountries}
                            values={formState.values.focus_countries}
                            label={'Focus Countries'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            onRemove={(idx) => this.onListItemRemove(idx, 'focus_countries')}
                            onAddButtonClick={() => this.toggleModal('focusCountry')}
                            onClick={(idx) => this.onListItemClick(idx, 'focusCountry', 'focus_countries')}
                            field={'focus_countries'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="specialisation_note">Specialisation Note</Label>
                            <FormTextAreaFormatted
                              field={'specialisation_note'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <FormGroup>
                            <Label for="description_note" className={'required'}>Description Note</Label>
                            <FormTextAreaFormatted
                              field={'description_note'}
                              disabled={readOnly}
                              validate={validateRequired}
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
                    currentPath={currentPath ? currentPath : backPath}
                    adminCondition={'my-agency'}
                    userIsAdmin={userIsAdmin}
                    buttonText={'Agency'}
                    recordID={agencyID}
                    formType={formType}
                    infoBoxOpen={infoBoxOpen}
                    infoBoxToggle={this.infoBoxToggle}
                    submitForm={this.formApi.submitForm}
                    onDelete={this.onDelete}
                    loading={loading}
                  />
                </CardFooter>
                <CardFooter className={style.infoFooter}>
                  {formType === 'create' ? "" :
                    <Collapse isOpen={infoBoxOpen}>
                      <InfoBox
                        id={formState.values.id}
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

AgencyForm.defaultProps = {
  userIsAdmin: false
};

AgencyForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  agencyID: PropTypes.string,
  backPath: PropTypes.string,
  currentPath: PropTypes.string,
  userIsAdmin: PropTypes.bool,
};

export default AgencyForm;