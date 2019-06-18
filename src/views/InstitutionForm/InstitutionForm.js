import React, { Component } from 'react';
import { Form } from 'informed';
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
import { Link } from "react-router-dom";
import Select from 'react-select';
import { connect } from "react-redux";

import FormTextField from '../../components/FormFields/FormTextField';
import FormSelectField from '../../components/FormFields/FormSelectField';
import FormDatePickerField from "../../components/FormFields/FormDatePickerField";
import institution from '../../services/Institution';
import style from './InstitutionForm.module.css';
import AssignedList from '../../components/FormFieldsUncontrolled/AssignedList';
import AlternativeNameForm from './components/AlternativeNameForm';
import FormerNameForm from './components/FormerNameForm';
import LocalIdForm from './components/LocalIdForm';
import HistoricalLinkForm from './components/HistoricalLinkForm';
import HierarchicalLinkForm from './components/HierarchicalLinkForm';
import InfoBox from './components/InfoBox';
import country from '../../services/Country';
import qfEHEALevel from '../../services/QFeheaLevel';
import { strictEqual } from 'assert';


class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      adminEdit: false,
      openModal: null,
      formType: null,
      formIndex: null,
      alternativeNameValue: null,
      formerNameValue: null,
      localIDValue: null,
      qFeheaLevels: null,
      historicalLinkValue: null,
      hierarchicalLinkValue: null,
      countries: null,
      infoBoxOpen: true
    }
  }

  componentDidMount() {
    const { formType } = this.props;
    console.log(this.props);


    this.setState({
      adminEdit: true,
      isEdit: true,
      formType: formType
    });
    this.setState({
      adminEdit: this.notView(formType),
      isEdit: this.notView(formType),
      formType: formType
    });
    this.populate();
  }

  notView = (formType) => formType !== 'view'

  populate = () => {
    const { formID, formType } = this.props;

    if (formType !== 'create') {
      institution.getInstitution(formID).then((response, error) => {
        let data = response.data
        const historical_source = response.data.historical_source.map(s => ({...s, direction: 'source'}))
        const historical_target = response.data.historical_target.map(t => ({...t, direction: 'target'}))
        const hierarchical_parent = response.data.hierarchical_parent.map(p => ({...p, position: 'parent'}))
        const hierarchical_child = response.data.hierarchical_child.map(c => ({...c, position: 'child'}))
        data.historical_links = [...historical_source, ...historical_target];
        data.hierarchical_links = [...hierarchical_child, ...hierarchical_parent];
        this.formApi.setValues(data);
      })
    }

    qfEHEALevel.select().then((response, error) => {
      this.setState({
        qFeheaLevels: response.data
      });
    });

    country.getInstitutionCountries().then((response, error) => {
      this.setState({
        countries: response.data
      });
    })
  }

  onEditForm = () => {
    this.setState({
      isEdit: true,
      adminEdit: true
    });
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  formTitle() {
    let { formType, isEdit } = this.state;

    formType = isEdit && formType === 'view' ? 'edit' : formType;

    return {
      view: 'View Institution',
      edit: 'Edit Institution',
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
    this.setState({
      formerIndex: null,
      localIDValue: null
    });
    this.toggleModal('local-id');
  }

  onLocalIDClick = (i) => {
    this.setState({
      localIDValue: this.formApi.getValue('identifiers_local')[i],
      formerIndex: i
    });
    this.toggleModal('local-id');
  }

  getLocalIDValues = formState => (
    formState.values.identifiers_local
    ? formState.values.identifiers_local
    : null
  )

  renderLocalID = value => value.identifier;

  changeQFEheaLvels = (level) => {
    this.formApi.setValue('qf_ehea_levels', [...this.formApi.getValue('qf_ehea_levels'), {qf_ehea_level: level.id}]);
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

  onQFEheaLevelsRemove = (index) => {
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
    const { countries, isView, adminEdit } = this.state;

    if (this.formApi.getValue('countries')) {
      return this.formApi.getValue('countries').map((country, i) => {
        return (
          <Row key={i}>
            <Col md={6}>
              <FormGroup>
              <Label for="country">Country</Label>
                <FormSelectField
                  field={`countries[${i}].country`}
                  options={countries}
                  placeholder={'Please select'}
                  labelField={'name_english'}
                  valueField={'id'}
                  disabled={!adminEdit}
                  />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
              <Label for="city">City</Label>
                <FormTextField
                  field={`countries[${i}].city`}
                  placeholder={'Enter city name'}
                  disabled={!adminEdit}
                />
              </FormGroup>
            </Col>
          </Row>
        )
      });
    }
  }

  renderQFEheaLevels = value => value.level;

  getLabel = (option) => option.level;

  getValue = (option) => option.id;

  render() {
    const {
      isView,
      openModal,
      alternativeNameValue,
      formerNameValue,
      historicalLinkValue,
      hierarchicalLinkValue,
      infoBoxOpen,
      qFeheaLevels,
      adminEdit,
      isEdit,
      localIDValue,
      formIndex
    } = this.state;
    const { backPath, formType } = this.props;

    return  qFeheaLevels ? (
      <Form className="animated fadeIn" getApi={this.setFormApi}>
        {({ formState }) => (
          <Card>
            <CardHeader>
              <Row>
                <Col>{this.formTitle()}</Col>
              </Row>
            </CardHeader>
            <CardBody>
              <React.Fragment>
                <CardBody>
                  <Row>
                    <Col md={6} className={style.borderLeft}>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_official" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'name_primary'}
                              placeholder={'Enter official institution name'}
                              disabled={!adminEdit}
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
                              disabled={!adminEdit}
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
                              disabled={!adminEdit}
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
                            disabled={!adminEdit}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getAlternativeNameValues(formState)}
                            label={'Institution Name, Alternative'}
                            btnLabel={'Add Alternative Name'}
                            onRemove={this.onRemove}
                            renderDisplayValue={this.renderAlternativeNames}
                            onAddButtonClick={this.onAddAlternativeName}
                            onClick={this.onAltenativeNameClick}
                            field={'names_actual[0].alternative_names'}
                            fieldName={'names_actual[0].alternative_names'}
                            disabled={!adminEdit}
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
                              disabled={!adminEdit}
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
                              disabled={!adminEdit}
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
                            disabled={!adminEdit}
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
                            disabled={!adminEdit}
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
                            disabled={!isEdit}
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
                            disabled={!isEdit}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      {this.renderLocations(formState)}
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="founding_date">Founding Year</Label>
                            <FormDatePickerField
                              field={'founding_date'}
                              placeholderText={'Enter year'}
                              disabled={!adminEdit}
                              />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="closing_date">Closing Year</Label>
                            <FormDatePickerField
                              field={'closure_date'}
                              placeholderText={'Enter year'}
                              disabled={!adminEdit}
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
                                    className={!adminEdit ? style.hidden : null}
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
                                    onRemove={this.onQFEheaLevelsRemove}
                                    renderDisplayValue={this.renderQFEheaLevels}
                                    field={'qf_ehea_levels'}
                                    disabled={!adminEdit}
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
                              field={'comment'}
                              placeholder={'Enter comment, if applicable'}
                              disabled={!adminEdit}
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
                            disabled={!adminEdit}
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
                            disabled={!adminEdit}
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
                            disabled={!adminEdit}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </React.Fragment>
            </CardBody>
            <CardFooter className={style.infoFooter}>
              <Collapse isOpen={infoBoxOpen}>
                <InfoBox formState={formState} />
              </Collapse>
            </CardFooter>
            <CardFooter>
              <Link to={{pathname: `${backPath}`}}>
                <Button
                  size="sm"
                  color="secondary"
                  >
                  Close
                </Button>
              </Link>
              {formType === 'view' ?
                <Button
                  size="sm"
                  color="primary"
                  className={'pull-right'}
                  onClick={this.onEditForm}
                >
                  Edit
                </Button> :
                null
              }
            </CardFooter>
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

export default connect(mapStateToProps)(InstitutionForm);
