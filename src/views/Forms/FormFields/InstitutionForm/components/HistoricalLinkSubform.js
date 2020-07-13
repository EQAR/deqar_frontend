import React from "react";
import {Col, FormGroup, Label, ModalBody, Row} from "reactstrap";
import InstitutionSelect from "../../ReportForm/components/InstitutionSelect";
import FormAssignedList from "../../../../../components/FormFields/FormAssignedList/FormAssignedList";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import {validateDate, validateRequired} from "../../../../../utils/validators";
import institution from "../../../../../services/Institution";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";

const HistoricalLinkSubform = ({formApi, formState, disabled}) => {
  const onInstitutionSelected = (value) => {
    formApi.setValue('institution', [value])
  };

  return (
    <React.Fragment>
      <Row>
        <Col>
          <FormGroup>
            <Label for="relationship_type" className={'required'}>Relationship</Label>
            <FormSelectField
              field={'relationship_type'}
              optionsAPI={institution.getHistoricalRelationTypes}
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
            <Label for="founding_date">Date</Label>
            <FormDatePickerField
              field={'relationship_date'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={validateDate}
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

export default withPopupFormManager(HistoricalLinkSubform);
