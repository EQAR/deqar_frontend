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
  FormText,
  Label,
  Row
} from "reactstrap";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import FormTextField from '../../components/FormFields/FormTextField';
import institution from '../../services/Institution';
import style from './InstitutionForm.module.css';
import AssignedList from '../../components/FormFieldsUncontrolled/AssignedList';
import AlternativeNameForm from './components/AlternativeNameForm';
import LocationForm from './components/LocationForm';
import country from '../../services/Country';
import qfEHEALevel from '../../services/QFeheaLevel';


class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      nameModalOpen: false,
      formType: null,
      alternativeNameValue: null,
      locationModalOpen: false,
      qFeheaLevels: null,
      locationValue: null
    }
  }

  componentDidMount() {
    const { formType } = this.props;

    this.setState({
      readOnly: this.isReadOnly(formType),
      formType: formType
    });
    this.populate();
  }

  isReadOnly = (formType) => formType === 'view';

  populate = () => {
    const { formID } = this.props;
    const { formType } = this.state;

    if (formType !== 'create') {
      institution.getInstitution(formID).then((response, error) => {
        this.formApi.setValues(response.data);
      })
    }

    qfEHEALevel.select().then((response, error) => {
      this.setState({
        qFeheaLevels: response.data
      });
    })
  }

  editForm = () => {
    this.setState({
      formType: 'edit'
    });
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  formTitle() {
    const { formType } = this.state;
    return {
      view: 'View Institution',
      edit: 'Edit Institution',
      create: 'Add Institution'
    }[formType];
  }

  toggleNameModal = () => {
    this.setState({
      nameModalOpen: !this.state.nameModalOpen
    })
  }

  onNameSubmit = (value, index) => {

  }

  onNameRemove = (index) => {
  }

  onFormerNameRemove = (index) => {
  }

  onLocalIDRemove = (index) => {
  }

  onHistoricalLinkRemove = (index) => {
  }

  onHierarchicalLinkRemove = (index) => {
  }

  onNameClick = (index) => {
    this.setState({
      nameModalOpen: true,
      alternativeNameValue: this.formApi.getValue('names')[0].alternative_names[index]
    });
  }

  toggleLocationModal = () => {
    this.setState({
      locationModalOpen: !this.state.locationModalOpen
    })
  }

  getAlternativeValues = formState => formState.values.names ? formState.values.names[0].alternative_names : null;

  getFormerValues = formState => null;

  getLocalIDValues = formState => null;

  getHistoricalLinkValues = formState => null;

  getHierarchicalLinkValues = formState => null;

  renderLocations = formState => {
    return (
      <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="country">Country</Label>
            <FormTextField
              field={'countries[0].country.name_english'}
              disabled
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
          <Label for="city">City</Label>
            <FormTextField
              field={'countries[0].city'}
              disabled
            />
          </FormGroup>
        </Col>
      </Row>
    )
    // if (this.formApi.getValue('countries')) {
    //   return this.formApi.getValue('countries').map((country, i) => {
    //     return (
    //       <Row key={i}>
    //         <Col md={6}>
    //           <FormGroup>
    //           <Label for="country">Country</Label>
    //             <FormTextField
    //               field={'countries[i].country.name_english'}
    //               disabled
    //             />
    //           </FormGroup>
    //         </Col>
    //         <Col md={6}>
    //           <FormGroup>
    //           <Label for="city">City</Label>
    //             <FormTextField
    //               field={'countries[i].city'}
    //               disabled
    //             />
    //           </FormGroup>
    //         </Col>
    //       </Row>
    //     )
    //   });
    // }
  }

  getCountry = formState => formState.values.countries ? formState.values.countries[0].country.name_english : null;

  onCountryClick = () => {
    this.setState({
      locationModalOpen: true,
      locationValue: this.formApi.getValue('countries')
    });
  }

  onCountryRemove = () => {

  }

  renderCountries = (value) => {
    const { city, country } = value;
    const { name_english } = country;

    return `${city} (${name_english})`
  }

  identifiersSelector = (identifierType, formState) => {
    let identifierField = '';
    const identifiers = this.formApi.getValue('identifiers');

    if (formState.values.identifiers) {
      identifierField = 'identifiers[0].identifier'
      formState.values.identifiers.forEach((identifier, i) => {
        if (identifierType === 'national_identifier' && identifier.resource !== 'local identifier') {
          identifierField = `identifiers[${i}].identifier`;
        } else if (identifierType === 'local_identifier' && identifier.resource === 'local identifier') {
          identifierField = `identifiers[${i}].identifier`;
        }
      });
    };
    return identifierField;
  }

  getQFeheaLevels = (formState) => {
    const { qFeheaLevels } = this.state;

    return formState.values.qf_ehea_levels && qFeheaLevels ?
      formState.values.qf_ehea_levels.map(level => qFeheaLevels.filter(l =>level.qf_ehea_level === l.id)[0]) :
      null;
  }

  renderAlternativeNames = value => value.name;

  renderFormerNames = value => null;

  renderLocalID = value => null;

  renderQFeheaLevels = value => value.level;

  renderHistoricalLinks = value => null;

  renderHierarchicalLink = value => null;

  nameOfficialDisabled = () => {
    const { formType } = this.state;

    return formType !== 'create';
  }

  disabled = (method) => {
    const { formType } = this.state;
    const disableMethods = {
      name_official_transliterated: () => this.nameTransliteratedDisabled(),
      name_english: () => this.nameEnglishDisabled(),
      acronym: () => this.nameAcronymDisabled()
    }
    let isDisabled = true;

    if (formType === 'edit') {
      isDisabled = disableMethods[method]();
    }

    return isDisabled;
  }

  nameTransliteratedDisabled = () => {
    return this.formApi.getValue('names[0].name_official_transliterated') ? true : false;
  }

  nameEnglishDisabled = () => {
    return this.formApi.getValue('names[0].name_english') ? true : false;
  }

  nameAcronymDisabled = () => {
    return this.formApi.getValue('names[0].acronym') ? true : false;
  }

  render() {
    const { readOnly, nameModalOpen, alternativeNameValue, locationModalOpen, locationValue } = this.state;
    const { backPath } = this.props;

    return (
      <div className="animated fadeIn">
        <Card>
        <CardHeader>
            <Row>
              <Col>{this.formTitle()}</Col>
            </Row>
          </CardHeader>
          <Form
            getApi={this.setFormApi}
          >
            {({ formState }) => (
              <React.Fragment>
                <CardBody>
                  <Row>
                    <Col md={6} className={style.borderLeft}>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_official" className={'required'}>Institution Name, Official</Label>
                            <FormTextField
                              field={'names[0].name_official'}
                              disabled={this.nameOfficialDisabled()}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_official_transliterated">Institution Name, Transliterated</Label>
                            <FormTextField
                              field={'names[0].name_official_transliterated'}
                              disabled={this.disabled('name_official_transliterated')}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="name_english">Institution Name, English</Label>
                            <FormTextField
                              field={'names[0].name_english'}
                              disabled={this.disabled('name_english')}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AlternativeNameForm
                            modalOpen={nameModalOpen}
                            onToggle={this.toggleNameModal}
                            onFormSubmit={this.onNameSubmit}
                            formValue={alternativeNameValue}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getAlternativeValues(formState)}
                            label={'Institution Name, Alternative'}
                            btnLabel={'Add Alternative Name'}
                            onRemove={this.onNameRemove}
                            renderDisplayValue={this.renderAlternativeNames}
                            onAddButtonClick={this.toggleNameModal}
                            onClick={this.onNameClick}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="acronym" className={'required'}>Institution Acronym</Label>
                            <FormTextField
                              field={'names[0].acronym'}
                              disabled={this.disabled('acronym')}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="website_link" className={'required'}>Institution Website</Label>
                            <FormTextField
                              field={'website_link'}
                              disabled={this.disabled('website_link')}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getFormerValues(formState)}
                            label={'Former Names'}
                            btnLabel={'Add'}
                            onRemove={this.onFormerNameRemove}
                            renderDisplayValue={this.renderFormerNames}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getLocalIDValues(formState)}
                            label={'Local ID'}
                            btnLabel={'Add'}
                            onRemove={this.onLocalIDRemove}
                            renderDisplayValue={this.renderLocalID}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
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
                            <FormTextField
                              field={'founding_date'}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="closing_date">Closing Year</Label>
                            <FormTextField
                              field={'closing_date'}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['level']}
                            values={this.getQFeheaLevels(formState)}
                            label={'QF-EHEA Levels'}
                            onRemove={this.onNameRemove}
                            renderDisplayValue={this.renderQFeheaLevels}
                            field={'alternative_names'}
                            disabled={readOnly}
                          />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="comment">Other comment(optional)</Label>
                            <FormTextField
                              field={'comment'}
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getHistoricalLinkValues(formState)}
                            label={'Historical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onHistoricalLinkRemove}
                            renderDisplayValue={this.renderHistoricalLinks}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getHierarchicalLinkValues(formState)}
                            label={'Hierarchical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onHierarchicalLinkRemove}
                            renderDisplayValue={this.renderHierarchicalLink}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </React.Fragment>
            )}
          </Form>
          <CardFooter>
            <Link to={{pathname: `${backPath}`}}>
              <Button
                size="sm"
                color="secondary"
              >
                Close
              </Button>
            </Link>
            <Button
              size="sm"
              color="secondary"
              className={style.editButton}
              onClick={this.editForm}
              disabled
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }
}

InstitutionForm.propTypes = {
  formType: PropTypes.string.isRequired,
  formID: PropTypes.number,
  backPath: PropTypes.string
}

export default InstitutionForm;
