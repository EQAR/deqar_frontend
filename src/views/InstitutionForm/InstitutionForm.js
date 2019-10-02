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
  Row, FormText
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import { withRouter, Prompt } from 'react-router-dom';

import FormTextField from '../../components/FormFields/FormTextField';
import FormSelectField from '../../components/FormFields/FormSelectField';
import FormDatePickerField from '../../components/FormFields/FormDatePickerField';
import institution from '../../services/Institution';
import style from './InstitutionForm.module.css';
import AssignedList from '../../components/FormFieldsUncontrolled/AssignedList';
import FormButtons from '../../components/FormFieldsUncontrolled/FormButtons';
import FormerNameForm from './components/FormerNameForm';
import LocalIdForm from './components/LocalIdForm';
import HistoricalLinkForm from './components/HistoricalLinkForm';
import HierarchicalLinkForm from './components/HierarchicalLinkForm';
import InfoBox from './components/InfoBox';
import country from '../../services/Country';
import qfEHEALevel from '../../services/QFeheaLevel';
import { validateRoman, validateRequired, validateRequiredURL, validateDateFrom, validateDate } from '../../utils/validators';
import agency from '../../services/Agency';
import { toast } from 'react-toastify';
import { createFormNormalizer } from './createFormNormalizer';
import FormAlert from './components/FormAlert'
import setInstitutionsTable from '../Institutions/actions/setInstitutionsTable';
import toggleInstitutionsTableFilter from '../Institutions/actions/toggleInstitutionsTableFilter';
import cx from 'classnames';


class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this._isMounted = true;
    this.state = {
      isEdit: false,
      openModal: null,
      formType: null,
      formIndex: null,
      formerNameValue: null,
      localIDValue: null,
      qFeheaLevels: [],
      historicalLinkValue: null,
      hierarchicalLinkValue: null,
      countries: [],
      infoBoxOpen: false,
      agencies: [],
      localIDDisabled: true,
      loading: false,
      alertVisible: false,
      nonFieldErrors: [],
      isShowTransliteration: false,
      alternativeNameCount: 0,
      isSubmit: false
    }
  }

  componentDidMount() {
    const { formType } = this.props;

    this.setState({
      isEdit: this.isEditable(formType),
      formType: formType
    });
    this.populate();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  scrollTo = () => {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      offset: -100,
      smooth: 'easeInOutQuart'
    })
  }

  isEditable = () => {
    const { formType, isAdmin } = this.props;
    return isAdmin || formType === 'create';
  }

  populate = async () => {
    const { institutionID, formType, isAdmin } = this.props;
    const values = this.formApi.getState().values

    const qFeheaLevelsResponse = await qfEHEALevel.select();
    this.setState({
      qFeheaLevels: qFeheaLevelsResponse.data.map(level => ({id: level.id, qf_ehea_level: level.level}))
    });

    if (formType !== 'create') {
      institution.getInstitution(institutionID).then((response) => {
        let data = response.data
        const historical_source = response.data.historical_source.map(s => ({...s, direction: 'source'}))
        const historical_target = response.data.historical_target.map(t => ({...t, direction: 'target'}))
        const hierarchical_parent = response.data.hierarchical_parent.map(p => ({...p, position: 'parent'}))
        const hierarchical_child = response.data.hierarchical_child.map(c => ({...c, position: 'child'}))
        data.historical_links = [...historical_source, ...historical_target];
        data.hierarchical_links = [...hierarchical_child, ...hierarchical_parent];
        data.flags = !data.flags || data.flags.length === 0 ? [{flag: 'none', flag_message: 'Institution has no flag assigned', banned: true}] : data.flags;
        data.qf_ehea_levels = data.qf_ehea_levels ? data.qf_ehea_levels.map(l => ({id: l.qf_ehea_level, qf_ehea_level: qFeheaLevelsResponse.data.find(q => q.id === l.qf_ehea_level).level})) : null
        this.formApi.setValues(data);
        this.setState({
          isShowTransliteration: data.names_actual[0].name_official_transliterated ? true : false,
          alternativeNameCount: data.names_actual ? data.names_actual[0].alternative_names.length : 0
        })
      });
    } else {
      this.formApi.setValues({
        ...values,
        flags: [{flag: 'none', flag_message: 'Institution has no flag assigned', banned: true}]
      })
    }

    country.getInstitutionCountries().then((response) => {
      this.setState({
        countries: response.data
      });
    });

    isAdmin
    ? agency.getAgencies().then((response) => this.setState({agencies: response.data.results}))
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
    Number.isInteger(i) ? values[i] = value : values.push(value);
    this.formApi.setValue(field, values);
    this.formApi.setTouched(field, true);
    this.toggleModal('');
  }

  onRemove = (i, field) => {
    let values;

    if (field === 'alternative_names') {
      values = this.formApi.getState().values;
      values.names_actual[0].alternative_names.splice(i, 1);
      this.formApi.setValues(values)
      this.setState({
        alternativeNameCount: this.formApi.getState().values.names_actual[0].alternative_names.length
      })
    } else if (field === 'countries') {
      values = this.formApi.getState().values;
      values.countries.splice(i, 1);
      this.formApi.setValues(values)
    } else {
      values = this.formApi.getValue(field);
      values.splice(i, 1);
      this.formApi.setValue(field, values);
    }
  }

  renderLocations = formState => {
    const { countries, isEdit } = this.state;
    const c = this.formApi.getValue('countries') || [''];

    if (countries) {
      return (
        <Fragment>
          <Row>
            <Col md={6}>
              <Label for="country" className={'required'}>Country</Label>
            </Col>
            <Col md={6}>
              <Label for="city">City</Label>
            </Col>
          </Row>
          {c.map((country, i) => {
            const scopeName = `countries[${i}]`;
            return (
              <Fragment key={i}>
                <Scope scope={scopeName}>
                  <Row key={i} className={style.relativeContainer}>
                    <Col md={6}>
                      <FormGroup>
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
                      <FormTextField
                        field={'city'}
                        placeholder={'Enter city name'}
                        disabled={!isEdit}
                      />
                      </FormGroup>
                    </Col>
                    {isEdit && i >= 1 && (
                      <div className={style.locationRemoveButton + " pull-right"} onClick={(e) => this.onRemove(i, 'countries')}
                      >
                        <i className="fa fa-close"> </i>
                      </div>
                    )}
                  </Row>
                </Scope>
              </Fragment>
            )
          })}
        </Fragment>
      )
    }
  }

  onAddCountryClick = () => {
    let countries = this.formApi.getValue('countries');
    const values = this.formApi.getState().values;
    countries = [...countries, {country: null, city: null}];
    this.formApi.setValues({...values, countries: countries});
  }

  renderAlternativeNames = () => {
    const { alternativeNameCount, isEdit } = this.state;
    const count = Array.apply(null, {length: alternativeNameCount}).map(Number.call, Number);

    return count.map((c, idx) => {
      const scopeName = `names_actual[0].alternative_names[${idx}]`;
      return (
        <React.Fragment key={idx}>
          <Scope scope={scopeName}>
            <Row>
              <Col md={12}>
                <FormGroup className={style.relativeContainer}>
                  <Label for="name">Alternative Institution Name # {c+1}</Label>
                  <FormTextField
                    field={'name'}
                    placeholder={'Enter alternative institution name'}
                  />
                  {isEdit && (
                    <div className={style.alternativeNameRemoveButton + " pull-right"} onClick={(e) => this.onRemove(idx, 'alternative_names')}
                    >
                      <i className="fa fa-close"> </i>
                    </div>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Scope>
        </React.Fragment>
      )
    });
  }

  onAddButtonClick = () => {
    const { alternativeNameCount } = this.state;

    if (alternativeNameCount !== 0) {
      let altNames = this.formApi.getValue('names_actual[0].alternative_names') || [{}];
      const lastAltName = altNames.slice(-1).pop();

      if (lastAltName) {
        if ('name' in lastAltName) {
          if (lastAltName.name.length > 0) {
            this.setState({alternativeNameCount: alternativeNameCount + 1})
          }
        }
      }
    } else {
      this.setState({alternativeNameCount: alternativeNameCount + 1})
    }
  }

  renderError = () => {
    const {alertVisible, nonFieldErrors} = this.state;

    return (
      <Row>
        <Col md={12}>
          <FormAlert
            name="scroll-to-element"
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

  getLabel = (option) => option.level;

  getValue = (option) => option.id;

  submitForm = () => {
    this.formApi.submitForm();
  }

  getMethod = (value, institutionID) => {
    const { formType } = this.props;

    return formType === 'create' ?
    institution.submitInstitution(value) :
    institution.updateInstitution(value, institutionID)
  }

  submitInstitutionForm = (value) => {
    const { institutionID, formType , institutionTableState} = this.props;
    const messages = {
      create: "Institution was created.",
      edit: "Institution was updated."
    }
    this.toggleLoading();
    this.getMethod(createFormNormalizer(value), institutionID).then((r) => {
      this.toggleLoading();
      this.setState({isSubmit: true})
      toast.success(messages[formType]);
      this.props.history.push('/reference/institutions');
      const tableState = {...institutionTableState, filtered: [{id: 'query', value: value.names_actual[0].name_official}]}
      this.props.setInstitutionsTable(tableState)
      this.props.toggleInstitutionsTableFilter()
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
      this.scrollTo();
    })
  }

  deleteTransliteration = () => {
    const {isShowTransliteration} = this.state;
    if(isShowTransliteration) {
      this.formApi.setValue('names_actual[0].name_official_transliterated', '');

    }
    this.setState({isShowTransliteration: !isShowTransliteration})
  }

  isBlocking = (formState) => Object.keys(formState.touched).length > 0 && !this.state.isSubmit ? true : false

  render() {
    const {
      openModal,
      alternativeNameCount,
      formerNameValue,
      historicalLinkValue,
      hierarchicalLinkValue,
      infoBoxOpen,
      qFeheaLevels,
      isEdit,
      localIDValue,
      localIDDisabled,
      formIndex,
      loading,
      isShowTransliteration,
    } = this.state;
    const { backPath, isAdmin, formType, formTitle } = this.props;
    return  qFeheaLevels ? (
      <Card className={style.InstitutionFormCard}>
        <CardHeader>
          <Row>
            <Col>{formTitle}</Col>
          </Row>
        </CardHeader>
        <Form
          className="animated fadeIn"
          getApi={this.setFormApi}
          onSubmit={this.submitInstitutionForm}
          onSubmitFailure={this.scrollTo}
        >
          {({ formState }) => (
            <Fragment>
              <Prompt
                when={this.isBlocking(formState)}
                message="Are you sure you want to leave? Changes that you made may not be saved."
              />
              <CardBody>
              {this.renderError()}
                  <Row>
                    <Col md={6} className={style.borderLeft}>
                      <Row>
                        <Col>
                          <FormGroup className={style.noFormGroupMargin}>
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
                          <Collapse isOpen={isShowTransliteration}>
                            <Row>
                              <Col>
                                <FormGroup className={cx(style.noFormGroupMargin, style.Transliteration)}>
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
                          </Collapse>
                          {!isEdit ? "" :
                            <Row>
                              <FormGroup>
                                <Col md={12}>
                                  <FormText color="muted">
                                    <span onClick={this.deleteTransliteration} className={style.removeTransliteration}>
                                      {isShowTransliteration ? 'Remove Transliteration' : 'Add Transliteration'}
                                    </span>
                                  </FormText>
                                </Col>
                              </FormGroup>
                            </Row>
                          }
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
                      <Collapse isOpen={alternativeNameCount > 0}>
                        {this.renderAlternativeNames()}
                      </Collapse>
                      <Row>
                        <Col md={12}>
                          <div className="pull-right">
                            <Button
                              type={'button'}
                              size="sm"
                              color="secondary"
                              onClick={this.onAddButtonClick}
                            >Add Alternative Name</Button>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="acronym">Institution Acronym</Label>
                            <FormTextField
                              field={'names_actual[0].acronym'}
                              placeholder={'Enter acronym'}
                              disabled={!isEdit}
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
                              validate ={validateDate}
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
                                  <FormSelectField
                                    field={'qf_ehea_levels'}
                                    options={qFeheaLevels}
                                    placeholder={'Please select multiple, if necessary'}
                                    labelField={'qf_ehea_level'}
                                    valueField={'qf_ehea_level'}
                                    isMulti
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
              <CardFooter>
                <FormButtons
                  deleteButton={false}
                  backPath={backPath}
                  currentPath={backPath}
                  editButton={false}
                  userIsAdmin={isAdmin}
                  buttonText={'Institution'}
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
            </Fragment>
            )}
        </Form>
      </Card>
    ) : null;
  }
}

InstitutionForm.propTypes = {
  formType: PropTypes.string.isRequired,
  formID: PropTypes.number,
  backPath: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInstitutionsTable: state => {
      dispatch(setInstitutionsTable(state))
    },
    toggleInstitutionsTableFilter: state => {
      dispatch(toggleInstitutionsTableFilter())
    }
  }
};

const mapStateToProps = (state) => {
  return {
    isAdmin: state.user.is_admin,
    institutionTableState: state.institutionsTable
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstitutionForm));
