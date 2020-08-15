import React from "react";
import {Col, FormGroup, Label, Row} from "reactstrap";
import InstitutionSelect from "../../ReportForm/components/InstitutionSelect";
import FormAssignedList from "../../../../../components/FormFields/FormAssignedList/FormAssignedList";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import {validateDate, validateDateFrom, validateRequired} from "../../../../../utils/validators";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";

const HierarchicalLinkSubform = ({formApi, formState, disabled}) => {
  const relationShipTypes = [
    {
      relationship: 'Parent of',
      id: 'parent'
    },
    {
      relationship: 'Child of',
      id: 'child'
    }
  ];

  const onInstitutionSelected = (value) => {
    formApi.setValue('institution', [value])
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="relationship" className={'required'}>Relationship</Label>
            <FormSelectField
              field={'relationship'}
              staticOptions={relationShipTypes}
              placeholder={'Please select'}
              labelField={'relationship'}
              valueField={'id'}
              disabled={disabled}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      {!disabled &&
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="institution" className={'required'}>Institution</Label>
              <InstitutionSelect
                onChange={onInstitutionSelected}
              />
            </FormGroup>
          </Col>
        </Row>
      }
      <Row>
        <Col md={12}>
          { disabled ? <Label for="institution" className={'required'}>Institution</Label> : null}
          <FormAssignedList
            field={'institution'}
            validate={validateRequired}
            labelShowRequired={true}
            renderDisplayValue={(value) => (value['name_primary'])}
            onClick={() => {}}
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="valid_from">Valid From</Label>
            <FormDatePickerField
              field={'valid_from'}
              placeholderText={'YYYY-MM-DD'}
              validate={(value) => validateDateFrom(
                value,
                formState.values.valid_to,
                "Link valid from date should be earlier than valid to date!"
              )}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="valid_to">Valid To</Label>
            <FormDatePickerField
              field={'valid_to'}
              placeholderText={'YYYY-MM-DD'}
              validate={validateDate}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
            <Label for="relationship_note">Relationship Note</Label>
            <FormTextArea
              field={'relationship_note'}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(HierarchicalLinkSubform);
