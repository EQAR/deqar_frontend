import React, {Component} from 'react';
import {Button, Col, Collapse, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import PropTypes from 'prop-types';
import {Form, Scope} from 'informed';
import FormTextField from "../../../components/FormFields/FormTextField";
import {validateRequired} from "../../../utils/validators";
import country from '../../../services/Country';
import FormSelectField from "../../../components/FormFields/FormSelectField";
import qfEHEALevel from "../../../services/QFeheaLevel";
import style from "../../../components/FormFieldsUncontrolled/AssignedList.module.css";

class ProgrammePopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alternativeNameCount: 0,
      countryOptions: [],
      qfEHEALevelOptions: []
    }
  }

  componentDidMount() {
    this.populateCountries();
    this.populateQFeheaLevels();
  }

  setFormApi = (formApi) => {
    this.formApi = formApi;
  };

  // Submit the form
  submitForm = () => {
    this.formApi.submitForm();
  };

  // Populate selects
  populateCountries = () => {
    country.select().then((response) => {
      this.setState({
        countryOptions: response.data
      })
    })
  };

  populateQFeheaLevels = () => {
    qfEHEALevel.select().then((response) => {
      this.setState({
        qfEHEALevelOptions: response.data
      })
    })
  };

  renderAlternativeNames = () => {
    const {alternativeNameCount} = this.state;
    const count = Array.apply(null, {length: alternativeNameCount}).map(Number.call, Number)

    return count.map((c, idx) => {
      const scopeName = `alternative_names[${idx}]`;
      return(
        <React.Fragment key={idx}>
          <Scope scope={scopeName}>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="name_alternative">Alternative Programme Name # {c+1}</Label>
                  <FormTextField
                    field={'name_alternative'}
                    placeholder={'Enter alternative programme name'}
                    validate={validateRequired}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="qualification_alternative">Qualification Name # {c+1}</Label>
                  <FormTextField
                    field={'qualification_alternative'}
                    placeholder={'Enter alternative qualification name'}
                  />
                </FormGroup>
              </Col>
            </Row>
          </Scope>
        </React.Fragment>
      )
    });
  };

  // Events
  onAddButtonClick = () => {
    const {alternativeNameCount} = this.state;

    if(alternativeNameCount !== 0) {
      let altNames = this.formApi.getValue('alternative_names');
      altNames = altNames ? altNames : [{}];
      const lastAltName = altNames.slice(-1).pop();

      if('name_alternative' in lastAltName) {
        if (lastAltName.name_alternative.length > 0) {
          this.setState({alternativeNameCount: alternativeNameCount + 1})
        }
      }
    } else {
      this.setState({alternativeNameCount: alternativeNameCount + 1})
    }
  };

  onToggle = () => {
    this.setState({
      alternativeNameCount: 0
    });
    this.props.onToggle();
  };

  render() {
    const {modalOpen, title, submitButtonText} = this.props;
    const {countryOptions, qfEHEALevelOptions, alternativeNameCount} = this.state;

    return(
      <Modal isOpen={modalOpen} toggle={this.onToggle}>
        <Form
          getApi={this.setFormApi}
          onSubmit={this.props.onFormSubmit}
          id="file-popup-form"
        >
          {({ formState }) => (
            <React.Fragment>
              <ModalHeader toggle={this.onToggle}>{title}</ModalHeader>
              <ModalBody>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="name_primary" className={'required'}>Programme Name</Label>
                      <FormTextField
                        field={'name_primary'}
                        placeholder={'Enter programme name for display'}
                        validate={validateRequired}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="qualification_primary">Qualification Name</Label>
                      <FormTextField
                        field={'qualification_primary'}
                        placeholder={'Enter qualification name for display'}
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
                        className={style.Button}
                      >Add More...</Button>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="qf_ehea_level">QF-EHEA Level</Label>
                      <FormSelectField
                        field={'qf_ehea_level'}
                        options={qfEHEALevelOptions}
                        placeholder={'Please select'}
                        labelField={'level'}
                        valueField={'id'}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="nqf_level">NQF Level</Label>
                      <FormTextField
                        field={'nqf_level'}
                        placeholder={'Enter programme NQF Level'}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="countries">Countries (if different from institution countries)</Label>
                      <FormSelectField
                        field={'countries'}
                        options={countryOptions}
                        placeholder={'Please select multiple, if necessary'}
                        labelField={'name_english'}
                        valueField={'id'}
                        isMulti
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  type={'button'}
                  onClick={this.submitForm}
                >
                  {submitButtonText}
                </Button>{' '}
              </ModalFooter>
            </React.Fragment>
          )}
          </Form>
      </Modal>
    )
  }
}

ProgrammePopupForm.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  recordIndex: PropTypes.number,
  initialValue: PropTypes.object,
  title: PropTypes.string.isRequired,
  submitButtonText: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

export default ProgrammePopupForm;
