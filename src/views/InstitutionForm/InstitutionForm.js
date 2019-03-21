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
      editable: null,
      nameModalOpen: false,
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
      disableEdit: this.editableFields()
    });
    this.populate();
  }

  isReadOnly = (formType) => formType === 'view';

  populate = () => {
    const { formID, formType } = this.props;

    if (formType !== 'create') {
      institution.getInstitution(formID).then((response, error) => {
        this.formApi.setValues(response.data);
        this.setState({
          disableEdit: this.editableFields()
        });
      })
    }

    qfEHEALevel.select().then((response, error) => {
      this.setState({
        qFeheaLevels: response.data
      });
    })
  }

  editableFields = () => {
    return {
      name_official: true,
      name_official_transliterated: this.formApi.getValue('names[0].name_official_transliterated') ? true : false,
      name_english: this.formApi.getValue('names[0].name_english') ? true : false
    }
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  }

  formTitle() {
    const { formType } = this.props;
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

  onCountryClick = () => {
    this.setState({
      locationModalOpen: true,
      locationValue: this.formApi.getValue('countries')
    });
  }

  onCountryRemove = () => {

  }

  getAlternativeValues = (formState) => {
    return formState.values.names ? formState.values.names[0].alternative_names : null;
  }

  getCountry = (formState) => {
    return formState.values.countries ? formState.values.countries[0].country.name_english : null;
  }

  getQFeheaLevels = (formState) => {
    const { qFeheaLevels } = this.state;

    return formState.values.qf_ehea_levels && qFeheaLevels ?
      formState.values.qf_ehea_levels.map(level => qFeheaLevels.filter(l =>level.qf_ehea_level === l.id)[0]) :
      null;
  }

  isDisabled = (inputField) => {
    const { formType } = this.props;
    const { disableEdit, readOnly } = this.state;

    return formType === 'edit' && disableEdit ? disableEdit[inputField] : readOnly;
  }

  renderAlternativeNames = (value) => {

  }

  renderQFeheaLevels = (value) => {
    return value.level;
  }

  renderCountries = (value) => {
    const { city, country } = value;
    const { name_english } = country;

    return `${city} (${name_english})`
  }

  render() {
    const { readOnly, nameModalOpen, alternativeNameValue, locationModalOpen, locationValue } = this.state;
    const { formType, backPath } = this.props;

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
                              disabled={this.isDisabled("name_official")}
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
                              disabled={this.isDisabled("name_official_transliterated")}
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
                              disabled={this.isDisabled("name_english")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="acronym" className={'required'}>Institution Acronym</Label>
                            <FormTextField
                              field={'names[0].acronym'}
                              disabled={readOnly}
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
                            label={'Alternative Names'}
                            btnLabel={'Add Alternative Name'}
                            onRemove={this.onNameRemove}
                            renderDisplayValue={this.renderAlternativeNames}
                            onAddButtonClick={this.toggleNameModal}
                            onClick={this.onNameClick}
                            field={'alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <LocationForm
                            modalOpen={locationModalOpen}
                            onToggle={this.toggleLocationModal}
                            onFormSubmit={this.onNameSubmit}
                            formValue={locationValue}
                            disabled={readOnly}
                          />
                          <AssignedList
                            values={formState.values.countries}
                            errors={formState.errors}
                            label={'Geographic Location'}
                            labelShowRequired={true}
                            btnLabel={'Add'}
                            onAddButtonClick={this.toggleLocationModal}
                            onClick={this.onCountryClick}
                            onRemove={this.onCountryRemove}
                            renderDisplayValue={this.renderCountries}
                            field={'countries'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="deqar_id">DEQARINST ID</Label>
                            <FormTextField
                              field={'deqar_id'}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="eter_id">ETER ID</Label>
                            <FormTextField
                              field={'eter_id'}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                          <Col>
                            <FormGroup>
                            <Label for="deqar_id">National Identifier</Label>
                              <FormTextField
                                field={'identifiers[0].identifier'}
                                disabled={readOnly}
                              />
                            </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                          <Label for="deqar_id">Local Identifier</Label>
                            <FormTextField
                              field={'identifiers[1].identifier'}
                              disabled={readOnly}
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
                          <Label for="website_link" className={'required'}>Institution Website</Label>
                            <FormTextField
                              field={'website_link'}
                              disabled={readOnly}
                            />
                          </FormGroup>
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
                color="primary"
              >Close</Button>
            </Link>
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
