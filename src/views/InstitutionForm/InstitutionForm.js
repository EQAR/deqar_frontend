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


class InstitutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false,
      openModal: null,
      formType: null,
      alternativeNameValue: null,
      qFeheaLevels: null,
      countries: null,
      infoBoxOpen: true
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

  // isReadOnly = (formType) => formType === 'view';

  isReadOnly = (formType) => false;

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
    });

    country.getInstitutionCountries().then((response, error) => {
      this.setState({
        countries: response.data
      });
    })
  }

  // convertQFeheaLevels = (response) => {
  //   return response.map(level => {
  //     return {
  //       qf_ehea_level: level.id,
  //       level: level.level
  //     }
  //   })
  // }

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

  toggleModal = (modal) => {
    this.setState({
      openModal: modal
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

  onQFEheaLevelsRemove = (index) => {
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

  getAlternativeValues = formState => formState.values.names ? formState.values.names[0].alternative_names : null;

  getFormerValues = formState => null;

  getLocalIDValues = formState => null;

  getHistoricalLinkValues = formState => null;

  getHierarchicalLinkValues = formState => null;

  renderLocations = formState => {
    const { countries } = this.state;

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
                  placeholder={'Select country...'}
                  labelField={'name_english'}
                  valueField={'id'}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
              <Label for="city">City</Label>
                <FormTextField
                  field={`countries[${i}].city`}
                />
              </FormGroup>
            </Col>
          </Row>
        )
      });
    }
  }

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

  getLabel = (option) => option.level;

  getValue = (option) => option.id;

  renderAlternativeNames = value => value.name;

  renderFormerNames = value => null;

  renderLocalID = value => null;

  renderQFEheaLevels = value => value.level;

  renderHistoricalLinks = value => null;

  renderHierarchicalLink = value => null;

  render() {
    const { readOnly, openModal, alternativeNameValue, infoBoxOpen, qFeheaLevels } = this.state;
    const { backPath } = this.props;
    // console.log(qFeheaLevels)
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
                              field={'names[0].name_official'}
                              disabled={false}
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
                              disabled={readOnly}
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
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <AlternativeNameForm
                            modalOpen={openModal === 'alternative-name'}
                            onToggle={() => this.toggleModal('')}
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
                            onAddButtonClick={() => this.toggleModal('alternative-name')}
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
                              disabled={readOnly}
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
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <FormerNameForm
                            modalOpen={openModal === 'former-name'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onNameSubmit}
                            formValue={alternativeNameValue}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getFormerValues(formState)}
                            label={'Former Names'}
                            btnLabel={'Add'}
                            onRemove={this.onFormerNameRemove}
                            onAddButtonClick={() => this.toggleModal('former-name')}
                            renderDisplayValue={this.renderFormerNames}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <LocalIdForm
                            modalOpen={openModal === 'local-id'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onNameSubmit}
                            formValue={alternativeNameValue}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getLocalIDValues(formState)}
                            label={'Local ID'}
                            btnLabel={'Add'}
                            onRemove={this.onLocalIDRemove}
                            onAddButtonClick={() => this.toggleModal('local-id')}
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
                            <FormDatePickerField
                              field={'founding_date'}
                              placeholderText={'YYYY-MM-DD'}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                          <Label for="closing_date">Closing Year</Label>
                            <FormDatePickerField
                              field={'closure_date'}
                              placeholderText={'YYYY-MM-DD'}
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
                                    disabled={readOnly}
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
                              disabled={readOnly}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <HistoricalLinkForm
                            modalOpen={openModal === 'historical-link'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onNameSubmit}
                            formValue={alternativeNameValue}
                            disabled={readOnly}
                          />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getHistoricalLinkValues(formState)}
                            label={'Historical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onHistoricalLinkRemove}
                            onAddButtonClick={() => this.toggleModal('historical-link')}
                            renderDisplayValue={this.renderHistoricalLinks}
                            field={'names[0].alternative_names'}
                            disabled={readOnly}
                            />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                        <HierarchicalLinkForm
                            modalOpen={openModal === 'hierarchical-link'}
                            onToggle={() => this.toggleModal('')}
                            onFormSubmit={this.onNameSubmit}
                            formValue={alternativeNameValue}
                            disabled={readOnly}
                            />
                          <AssignedList
                            errors={formState.errors}
                            valueFields={['name']}
                            values={this.getHierarchicalLinkValues(formState)}
                            label={'Hierarchical Link'}
                            btnLabel={'Add'}
                            onRemove={this.onHierarchicalLinkRemove}
                            onAddButtonClick={() => this.toggleModal('hierarchical-link')}
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
            </CardBody>
            <CardFooter className={style.infoFooter}>
              <Collapse isOpen={infoBoxOpen}>
                <InfoBox
                  formState={formState.values}
                  disabled={readOnly}
                  />
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

export default InstitutionForm;
