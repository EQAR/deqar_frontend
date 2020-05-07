import React from 'react';
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import {Col, FormGroup, Label, Row} from "reactstrap";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import list from "../../../../../services/List";
import country from "../../../../../services/Country";
import {validateRequiredUnique} from "../../../../../utils/validators";
import FormManyMultipleField from "../../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";


const ProgrammeSubform = ({formApi, formState, disabled}) => {
  return (
    <Row>
      <Col md={12}>
        <FormGroup>
          <Label for="name_primary" className={'required'}>Programme Name</Label>
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
      <Col md={12}>
        <FormGroup>
          <Label for="qualification_primary">Qualification Name</Label>
          <FormTextField
            field={'qualification_primary'}
            placeholder={'Enter qualification name for display'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <FormManyMultipleField
        disabled={disabled}
        scopeName={'alternative_names'}
        formApi={formApi}
        data={formState.values['alternative_names']}
        render={({counter}) => (
          <React.Fragment>
            <Col md={12}>
              <FormGroup>
                <Label for="name_alternative">{`Alternative Programme Name / Qualification Name # ${counter}`}</Label>
                <FormTextField
                  field={'name_alternative'}
                  placeholder={'Enter alternative programme name'}
                  validate={(value) => validateRequiredUnique(
                    value,
                    ['name_primary', 'alternative_names.name_alternative'],
                    formState.values
                  )}
                  disabled={disabled}
                />
              </FormGroup>
            </Col>
            <Col md={10}>
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
      <Col md={12}>
        <FormGroup>
          <Label for="qf_ehea_level">QF-EHEA Level</Label>
          <FormSelectField
            field={'qf_ehea_level'}
            optionsAPI={list.selectQFEHEALevels}
            placeholder={'Please select'}
            labelField={'level'}
            valueField={'id'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="nqf_level">NQF Level</Label>
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
    </Row>
  )
};

export default withPopupFormManager(ProgrammeSubform)
