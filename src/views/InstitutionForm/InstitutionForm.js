import React, { Component, Fragment } from 'react';
import { Form, Scope} from 'informed';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  FormGroup,
  Collapse,
  Label,
  Row
} from "reactstrap";
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";

import FormTextField from '../../components/FormFields/FormTextField';
import FormSelectField from '../../components/FormFields/FormSelectField';
import FormDatePickerField from "../../components/FormFields/FormDatePickerField";
import institution from '../../services/Institution';
import style from './InstitutionForm.module.css';
import AssignedList from '../../components/FormFieldsUncontrolled/AssignedList';
import FormButtons from '../../components/FormFieldsUncontrolled/FormButtons';
import AlternativeNameForm from './components/AlternativeNameForm';
import FormerNameForm from './components/FormerNameForm';
import LocalIdForm from './components/LocalIdForm';
import HistoricalLinkForm from './components/HistoricalLinkForm';
import HierarchicalLinkForm from './components/HierarchicalLinkForm';
import InfoBox from './components/InfoBox';
import country from '../../services/Country';
import qfEHEALevel from '../../services/QFeheaLevel';
import { validateRoman, validateRequired, validateRequiredURL, validateDateFrom } from "../../utils/validators";
import agency from '../../services/Agency';
import { toast } from 'react-toastify';
import { createFormNormalizer } from './createFormNormalizer';
import FormAlert from './components/FormAlert'


class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = true;
    this.state = {
      isEdit: false,
      openModal: null,
      formType: null,
      formIndex: null,
      alternativeNameValue: null,
      formerNameValue: null,
      localIDValue: null,
      qFeheaLevels: [],
      historicalLinkValue: null,
      hierarchicalLinkValue: null,
      countries: null,
      infoBoxOpen: true,
      agencies: null,
      localIDDisabled: true,
      loading: false,
      alertVisible: false,
      nonFieldErrors: []
    }
  }

  componentDidMount() {
    const { formType, isAdmin } = this.props;

    this.setState({
      isEdit: isAdmin || this.notView(formType),
      formType: formType
    });
    this.populate();

    // this.setState({
    //   isEdit: true,
    //   formType: formType
    // });
    // this.populate();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }

  notView = (formType) => formType !== 'view'

  populate = () => {
    const { formID, formType, isAdmin } = this.props;
    const values = this.formApi.getState().values

    if (formType !== 'create') {
      institution.getInstitution(formID).then((response) => {
        let data = response.data
        const historical_source = response.data.historical_source.map(s => ({...s, direction: 'source'}))
        const historical_target = response.data.historical_target.map(t => ({...t, direction: 'target'}))
        const hierarchical_parent = response.data.hierarchical_parent.map(p => ({...p, position: 'parent'}))
        const hierarchical_child = response.data.hierarchical_child.map(c => ({...c, position: 'child'}))
        data.historical_links = [...historical_source, ...historical_target];
        data.hierarchical_links = [...hierarchical_child, ...hierarchical_parent];
        data.flags = data.flags ? [{flag: 'none', flag_message: 'Institution has no flag assigned', banned: true}] : data.flags;
        this.formApi.setValues(data);
      });
    } else {
      this.formApi.setValues({
        ...values,
        flags: [{flag: 'none', flag_message: 'Institution has no flag assigned', banned: true}]
      })
    }

    qfEHEALevel.select().then((response) => {
      this.setState({
        qFeheaLevels: response.data
      });
    });

    country.getInstitutionCountries().then((response) => {
      this.setState({
        countries: response.data
      });
    });

    isAdmin
    ? agency.selectAllAgency().then((response) => this.setState({agencies: response.data}))
    : agency.selectMySubmissionAgency().then((response) => this.setState({agencies: response.data}));
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  toggleLoading = () => {
    this.setState({
      loading: !this.state.loading
    });
  }

  toggleInfoBox = () => this.setState({ infoBoxOpen: !this.state.infoBoxOpen });

  formTitle() {
    let { formType } = this.state;

    return {
      view: 'Institution',
      create: 'Add Institution'
    }[formType];
  }

  toggleModal = (modal) => {
    const { openModal } = this.state;

    modal = openModal === modal ? '' : modal;
    this.setState({
      openModal: modal
    })
  }

  onAddAlternativeName = () => {
    this.setState({
      alternativeNameValue: null,
      formIndex: null
    });
    this.toggleModal('alternative-name');
  }

  onAltenativeNameClick = (i) => {
    this.setState({
      alternativeNameValue: this.formApi.getValue('names_actual')[0].alternative_names[i],
      formIndex: i
    });
    this.toggleModal('alternative-name');
  }

  getAlternativeNameValues = formState => (
    formState.values.names_actual
    ? formState.values.names_actual[0].alternative_names
    : null
  )

  renderAlternativeNames = value => value.name;

  onAddFormerName = () => {
    this.setState({
      formerNameValue: null,
      formIndex: null
    });
    this.toggleModal('former-name');
  }

  onFormerNameClick = (i) => {
    this.setState({
      formerNameValue: this.formApi.getValue('names_former')[i],
      formIndex: i
    });
    this.toggleModal('former-name');
  }

  getFormerValues = formState => (
    formState.values.names_former
    ? formState.values.names_former
    : null
  )

  renderFormerNames = value => value.name_official;

  onAddLocalID = () => {
    const localIds = this.formApi.getValue('identifiers_local');
    const { agencies } = this.state;

    this.setState({
      formerIndex: null,
      localIDValue: null,
      localIDDisabled: localIds ? agencies.filter(a => localIds.filter(l => l.agency.id !== a.id)) ? false : true : false
    });
    this.toggleModal('local-id');
  }

  onLocalIDClick = (i) => {
    const localIds = this.formApi.getValue('identifiers_local');
    const { agencies } = this.state;

    this.setState({
      localIDValue: localIds[i],
      formerIndex: i,
      localIDDisabled: agencies.find(a => localIds[i].agency.id === a.id) ? false : true
    });
    this.toggleModal('local-id');
  }

  getLocalIDValues = formState => {
    const { agencies } = this.state;
    let { identifiers_local } = formState.values;

    if (identifiers_local && agencies) {
      identifiers_local = identifiers_local.map(id => (
        agencies.find(a => id.agency.id === a.id) ? {...id, banned: false }: {...id, banned: true})
      )
    }
    return identifiers_local
  }

  renderLocalID = value => value.identifier;

  changeQFEheaLvels = (level) => {
    this.formApi.getValue('qf_ehea_levels')
    ? this.formApi.setValue('qf_ehea_levels', [...this.formApi.getValue('qf_ehea_levels'), {qf_ehea_level: level.id}])
    : this.formApi.setValue('qf_ehea_levels', [{qf_ehea_level: level.id}])
  }

  getQFEheaLevels = (formState) => {
    const { qFeheaLevels } = this.state;

    return formState.values.qf_ehea_levels && qFeheaLevels ?
      formState.values.qf_ehea_levels.map(level => qFeheaLevels.filter(l => level.qf_ehea_level === l.id)[0]) :
      null;
  }

  getQFEheaOptions = (qFeheaLevels) => {

    const formLevels = this.formApi.getValue('qf_ehea_levels');
    if (formLevels && qFeheaLevels) {
      formLevels.forEach(l => {
        qFeheaLevels = qFeheaLevels.filter(level => level.id !== l.qf_ehea_level);
      });
    }
    return qFeheaLevels;
  }

  onAddHistoricalLink = () => {
    this.setState({
      formIndex: null,
      historicalLinkValue: null
    });
    this.toggleModal('historical-link')
  }

  onHistoricalLinkClick = (i) => {
    this.setState({
      formIndex: i,
      historicalLinkValue: this.formApi.getValue('historical_links')[i]
    });
    this.toggleModal('historical-link')
  }

  getHistoricalLinkValues = formState => (
    formState.values.historical_links
    ? formState.values.historical_links
    : null
  )

  renderHistoricalLinks = value => value.institution.name_primary

  onAddHierarchicallLink = () => {
    this.setState({
      formIndex: null,
      hierarchicalLinkValue: null
    });
    this.toggleModal('hierarchical-link')
  }

  onHierarchicalLinkClick = (i) => {
    this.setState({
      formIndex: i,
      hierarchicalLinkValue: this.formApi.getValue('hierarchical_links')[i]
    });
    this.toggleModal('hierarchical-link')
  }

  getHierarchicalLinkValues = formState => (
    formState.values.hierarchical_links
    ? formState.values.hierarchical_links
    : null
  )

  renderHierarchicalLinks = value => value.institution.name_primary

  onFormSubmit = (value, i, field) => {
    let values = this.formApi.getValue(field) || [];
    Number.isInteger(i) ? values[i] = value : values.push(value)
    this.formApi.setValue(field, values);
    this.toggleModal('');
  }

  onRemove = (i, field) => {
    let values = this.formApi.getValue(field);
    values.splice(i, 1);
    this.formApi.setValue(field, values);
  }

  renderLocations = formState => {
    const { countries, isEdit } = this.state;
    const c = this.formApi.getValue('countries') || [''];

    if (countries) {
      return c.map((country, i) => {
        const scopeName = `countries[${i}]`;
        return (
          <Fragment key={i}>
            <Scope scope={scopeName}>
              <Row key={i}>
                <Col md={6}>
                  <FormGroup>
                  <Label for="country" className={'required'}>Country</Label>
                  <FormSelectField
                    field={'country'}
                    options={countries}
                    placeholder={'Please select'}
                    labelField={'name_english'}
                    valueField={'id'}
                    disabled={!isEdit}
                    validate={validateRequired}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                  <Label for="city">City</Label>
                  <FormTextField
                    field={'city'}
                    placeholder={'Enter city name'}
                    disabled={!isEdit}
                  />
                  </FormGroup>
                </Col>
              </Row>
            </Scope>
          </Fragment>
        )
      });
    }
  }

  onAddCountryClick = () => {
    let countries = this.formApi.getValue('countries');
    const values = this.formApi.getState().values;
    countries = [...countries, {country: null, city: null}];
    this.formApi.setValues({...values, countries: countries});
  }

  renderError = () => {
    const {alertVisible, nonFieldErrors} = this.state;

    return (
      <Row>
        <Col md={12}>
          <FormAlert
            visible={alertVisible}
            onClose={this.onAlertClose}
            errorMessage={nonFieldErrors}
          />
        </Col>
      </Row>
    )
  }

  onAlertClose = () => {
    this.setState({
      alertVisible: false
    });
  }

  renderQFEheaLevels = value => value.level;

  getLabel = (option) => option.level;

  getValue = (option) => option.id;

  submitForm = () => {
    this.formApi.submitForm();
  }

  createInstitution = (value) => {
    this.toggleLoading();
    institution.submitInstitution(createFormNormalizer(value)).then((r) => {
      this.toggleLoading();
      toast.success("Institution was created.");
      this.props.history.push('/reference/institutions');
    }).catch(error => {
      const errors = error.response.data.errors || error.response.data;

      if ('non_field_errors' in errors) {
        this.setState({
          alertVisible: true,
          nonFieldErrors: errors.non_field_errors
        });
        this.toggleLoading();
      }

      Object.keys(errors).forEach(key => {
        if (errors[key].non_field_errors) {
          this.setState({
            alertVisible: true,
            nonFieldErrors: errors[key].non_field_errors
          });
        } else {
          if (this.formApi.fieldExists(key)) {
            this.formApi.setError(key, errors[key]);
          }
        }
      });
      this.toggleLoading();
    })
  }

  submitInstitutionForm = (value) => {
    const { formType } = this.props;
    formType === 'create'
    ? this.createInstitution(value)
    : this.updteInstitution(value)
  }

  render() {
    const {
      openModal,
      alternativeNameValue,
      formerNameValue,
      historicalLinkValue,
      hierarchicalLinkValue,
      infoBoxOpen,
      qFeheaLevels,
      isEdit,
      localIDValue,
      localIDDisabled,
      formIndex,
      loading
    } = this.state;
    const { backPath, isAdmin, formType } = this.props;

    return  qFeheaLevels ? (
      <Form
        className="animated fadeIn"
        getApi={this.setFormApi}
        onSubmit={this.submitInstitutionForm}
      >
        {({ formState }) => (
          <Card>
            <CardHeader>
              <Row>
                <Col>{this.formTitle()}</Col>
              </Row>
            </CardHeader>
            <CardBody>
              {this.renderError()}
              <React.Fragment>
                <CardBody>
                  <Row>
                    <Col md={6} className={style.borderLeft}>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_official" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'names_actual[0].name_official'}
                              placeholder={'Enter official institution name'}
                              disabled={!isEdit}
                              validate={validateRequired}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_official_transliterated">Institution Name, Transliterated</Label>
                            <FormTextField
                              field={'names_actual[0].name_official_transliterated'}
                              placeholder={'Enter transliterated form'}
                              disabled={!isEdit}
                              validate={validateRoman}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_english">Institution Name, English</Label>
                            <FormTextField
                              field={'names_actual[0].name_english'}
                              placeholder={'Enter English form'}
                              disabled={!isEdit}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AlternativeNameForm
                            modalOpen={openModal === 'alternative-name'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onFormSubmit}
                            fieldName={'names_actual[0].alternative_names'}
                            formIndex={formIndex}
                            formValue={alternativeNameValue}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getAlternativeNameValues(formState)}
                            label={'Institution Name, Alternative'}
                            btnLabel={'Add Alternative Name'}
                            onRemove={() => null}
                            renderDisplayValue={this.renderAlternativeNames}
                            onAddButtonClick={this.onAddAlternativeName}
                            onClick={this.onAltenativeNameClick}
                            field={'names_actual[0].alternative_names'}
                            fieldName={'names_actual[0].alternative_names'}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="acronym" className={'required'}>Institution Acronym</Label>
                            <FormTextField
                              field={'names_actual[0].acronym'}
                              placeholder={'Enter acronym'}
                              disabled={!isEdit}
                              validate={validateRequired}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="website_link" className={'required'}>Institution Website</Label>
                            <FormTextField
                              field={'website_link'}
                              placeholder={'Enter institution website'}
                              disabled={!isEdit}
                              validate={validateRequiredURL}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <FormerNameForm
                            modalOpen={openModal === 'former-name'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onFormSubmit}
                            fieldName={'names_former'}
                            formIndex = {formIndex}
                            formValue={formerNameValue}
                            disabled={!isEdit}
                            />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name_official']}
                            values={this.getFormerValues(formState)}
                            label={'Former Names'}
                            btnLabel={'Add'}
                            onRemove={this.onRemove}
                            onAddButtonClick={this.onAddFormerName}
                            onClick={this.onFormerNameClick}
                            renderDisplayValue={this.renderFormerNames}
                            field={'names_former'}
                            fieldName={'names_former'}
                            disabled={!isEdit}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <LocalIdForm
                            modalOpen={openModal === 'local-id'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onFormSubmit}
                            fieldName={'identifiers_local'}
                            formIndex={formIndex}
                            formValue={localIDValue}
                            disabled={localIDDisabled}
                            localIDs={formState.values.identifiers_local}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['identifier']}
                            values={this.getLocalIDValues(formState)}
                            label={'Local ID'}
                            btnLabel={'Add'}
                            onRemove={this.onRemove}
                            onAddButtonClick={this.onAddLocalID}
                            onClick={this.onLocalIDClick}
                            renderDisplayValue={this.renderLocalID}
                            field={'identifiers_local'}
                            fieldName={'identifiers_local'}
                            validate={this.validateAgency}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      {this.renderLocations(formState)}
                      {isEdit && formState.values.countries ?
                        <Row>
                          <Col md={12}>
                            <div className="pull-right">
                              <Button
                                type={'button'}
                                size="sm"
                                color="secondary"
                                onClick={this.onAddCountryClick}
                              >Add New Location</Button>
                            </div>
                          </Col>
                        </Row> : null
                      }
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="founding_date">Founding Year</Label>
                            <FormDatePickerField
                              field={'founding_date'}
                              placeholderText={'Enter year'}
                              disabled={!isEdit}
                              validate={(value) => formState.values.closure_date ? validateDateFrom(value, formState.values.closure_date) : null}
                              />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="closing_date">Closing Year</Label>
                            <FormDatePickerField
                              field={'closure_date'}
                              placeholderText={'Enter year'}
                              disabled={!isEdit}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label for="country">QF-EHEA Levels</Label>
                                  <Select
                                    className={!isEdit ? style.hidden : null}
                                    options={this.getQFEheaOptions(qFeheaLevels)}
                                    onChange={this.changeQFEheaLvels}
                                    placeholder={'Select select multiple, if necessary'}
                                    getOptionLabel={this.getLabel}
                                    getOptionValue={this.getValue}
                                    value={0}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <AssignedList
                                    errors={formState.errors}
                                    valueFields={['qf_ehea_level']}
                                    values={this.getQFEheaLevels(formState)}
                                    renderDisplayValue={this.renderQFEheaLevels}
                                    onClick={() => null}
                                    field={'qf_ehea_levels'}
                                    fieldName={'qf_ehea_levels'}
                                    onRemove={this.onRemove}
                                    disabled={!isEdit}
                                    />
                                </FormGroup>
                              </Col>
                            </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="comment">Other comment(optional)</Label>
                            <FormTextField
                              field={'other_comment'}
                              placeholder={'Enter comment, if applicable'}
                              disabled={!isEdit}
                              />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <HistoricalLinkForm
                            modalOpen={openModal === 'historical-link'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onFormSubmit}
                            formValue={historicalLinkValue}
                            formIndex={formIndex}
                            disabled={!isEdit}
                            fieldName={'historical_links'}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['institution.name_primary']}
                            values={this.getHistoricalLinkValues(formState)}
                            label={'Historical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onRemove}
                            onAddButtonClick={this.onAddHistoricalLink}
                            onClick={this.onHistoricalLinkClick}
                            renderDisplayValue={this.renderHistoricalLinks}
                            field={'historical_links'}
                            fieldName={'historical_links'}
                            disabled={!isEdit}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <HierarchicalLinkForm
                            modalOpen={openModal === 'hierarchical-link'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onFormSubmit}
                            formValue={hierarchicalLinkValue}
                            formIndex={formIndex}
                            disabled={!isEdit}
                            fieldName={'hierarchical_links'}
                            />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['institution.name_primary']}
                            values={this.getHierarchicalLinkValues(formState)}
                            label={'Hierarchical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onRemove}
                            onAddButtonClick={this.onAddHierarchicallLink}
                            onClick={this.onHierarchicalLinkClick}
                            renderDisplayValue={this.renderHierarchicalLinks}
                            field={'hierarchical_links'}
                            fieldName={'hierarchical_links'}
                            disabled={!isEdit}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </React.Fragment>
            </CardBody>
            <CardFooter>
              <FormButtons
                backPath={backPath}
                currentPath={backPath}
                adminCondition={'institution'}
                userIsAdmin={isAdmin}
                buttonText={'Institution'}
                // recordID={reportID}
                formType={formType}
                infoBoxOpen={infoBoxOpen}
                infoBoxToggle={this.toggleInfoBox}
                submitForm={this.formApi.submitForm}
                loading={loading}
              />
            </CardFooter>
            <CardFooter className={style.infoFooter}>
              <Collapse isOpen={infoBoxOpen}>
                <InfoBox
                  formState={formState}
                  disabled={!isEdit}
                />
              </Collapse>
            </CardFooter>
            <CardFooter></CardFooter>
          </Card>
        )}
      </Form>
    ) : null;
  }
}

InstitutionForm.propTypes = {
  formType: PropTypes.string.isRequired,
  formID: PropTypes.number,
  backPath: PropTypes.string
}

const mapStateToProps = (state) => {
  return {isAdmin: state.user.is_admin}
}

export default withRouter(connect(mapStateToProps)(InstitutionForm));
