import React from 'react';
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import {Col, FormGroup, Label, Row} from "reactstrap";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import list from "../../../../../services/List";
import country from "../../../../../services/Country";
import {validateRequired, validateRequiredUnique, validateUnique} from "../../../../../utils/validators";
import FormManyMultipleField from "../../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";
import FormISCEDField from "../../../../../components/FormFields/FormISCEDField/FormISCEDField";
import FormManyESCOField from "../../../../../components/FormFields/FormManyESCOField/FormManyESCOField";


const ProgrammeSubform = ({formApi, formState, institutions, disabled}) => {

  const requiredIfDegreeOutcomeNotFull = () => {
    return formState.values['degree_outcome'] && formState.values['degree_outcome']['id'] === 2
  }

  const detectAllAP = () => {
    let all_aps = false;

    if (institutions) {
      if (institutions.length > 0) {
        const aps = institutions.filter(
          i => i.hasOwnProperty('alternative_provider') && i['alternative_provider']
        )
        all_aps = institutions.length === aps.length
      }
    }
    return all_aps;
  }

  const validateDegreeOutcomeData = (value, values) => {
    if (detectAllAP() && value['id'] === 1) {
      return 'Degree outcome should be \'2 / no full degree\' if all the ' +
        'organisations are alternative providers'
    }
  }

  const validateDegreeOutcome = (value, values) => {
    return validateRequired(value) || validateDegreeOutcomeData(value, values)
  }

  return (
    <Row>
      <Col md={6}>
        <FormGroup>
          <Label for="name_primary" className={'required'}>Programme name</Label>
          <FormTextField
            field={'name_primary'}
            placeholder={'Enter programme name for display'}
            disabled={disabled}
            validate={(value) => validateRequiredUnique(
              value,
              ['name_primary', 'alternative_names.name_alternative'],
              formState.values
            )}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="qualification_primary">Qualification name</Label>
          <FormTextField
            field={'qualification_primary'}
            placeholder={'Enter qualification name for display'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <FormManyMultipleField
        label={'Agency alternative names / qualifications'}
        deleteInRow={true}
        disabled={disabled}
        scopeName={'alternative_names'}
        formApi={formApi}
        data={formState.values['alternative_names']}
        addButtonText={'Add Alternative Programme Name'}
        extra={0}
        render={({counter}) => (
          <React.Fragment>
            <Col sm={6}>
              <FormGroup>
                <FormTextField
                  field={'name_alternative'}
                  placeholder={'Enter alternative programme name'}
                  validate={(value) => validateUnique(
                    value,
                    ['name_primary', 'alternative_names.name_alternative'],
                    formState.values
                  )}
                  disabled={disabled}
                />
              </FormGroup>
            </Col>
            <Col sm={5}>
              <FormGroup>
                <FormTextField
                  field={'qualification_alternative'}
                  placeholder={'Enter alternative qualification name'}
                  disabled={disabled}
                />
              </FormGroup>
            </Col>
          </React.Fragment>
        )}
      />
      <Col md={6}>
        <FormGroup>
          <Label for="qf_ehea_level" className={
            requiredIfDegreeOutcomeNotFull() ? 'required' : ''
          }>QF-EHEA level</Label>
          <FormSelectField
            field={'qf_ehea_level'}
            optionsAPI={list.selectQFEHEALevels}
            placeholder={'Please select'}
            labelField={'level'}
            valueField={'id'}
            includeID={'front'}
            idField={'code'}
            disabled={disabled}
            validate={
              requiredIfDegreeOutcomeNotFull() && validateRequired
            }/>
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="nqf_level">NQF level</Label>
          <FormTextField
            field={'nqf_level'}
            placeholder={'Enter programme NQF Level'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="countries">Countries (if different from institution countries)</Label>
          <FormSelectField
            field={'countries'}
            optionsAPI={country.select}
            placeholder={'Please select multiple, if necessary'}
            labelField={'name_english'}
            valueField={'id'}
            isMulti
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="degree_outcome" className={'required'}>Degree outcome</Label>
          <FormSelectField
            field={'degree_outcome'}
            optionsAPI={list.selectDegreeOutcomes}
            placeholder={'Select Degree Outcome'}
            labelField={'outcome'}
            valueField={'id'}
            includeID={'front'}
            disabled={disabled}
            validate={validateDegreeOutcome || validateRequired}
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="workload_ects" className={
            requiredIfDegreeOutcomeNotFull() ? 'required' : ''
          }>Workload expressed in ECTS</Label>
          <FormTextField
            field={'workload_ects'}
            placeholder={'Enter ECTS Credits'}
            disabled={disabled}
            validate={
              requiredIfDegreeOutcomeNotFull() && validateRequired
            }
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="assessment_certification" className={
            requiredIfDegreeOutcomeNotFull() ? 'required' : ''
          }>Assessment and certification</Label>
          <FormSelectField
            field={'assessment_certification'}
            optionsAPI={list.selectAssessments}
            placeholder={'Select assessment'}
            labelField={'assessment'}
            valueField={'id'}
            includeID={'front'}
            disabled={disabled}
            validate={
              requiredIfDegreeOutcomeNotFull() && validateRequired
            }
          />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label for="field_study">Field of study (ISCED-F)</Label>
          <FormISCEDField
            field={'field_study'}
            placeholder={'Select ISCED-F value...'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <FormManyESCOField
            label={'Learning outcomes'}
            data={formState.values['learning_outcomes']}
            scopeName={'learning_outcomes'}
            field={'learning_outcome'}
            disabled={disabled}
            formApi={formApi}
            placeholder={'Enter ESCO URL'}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="learning_outcome_description">Learning outcome description</Label>
          <FormTextArea
            field={'learning_outcome_description'}
            placeholder={'Enter learning outcome explanation'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
    </Row>
  )
};

export default withPopupFormManager(ProgrammeSubform)
