import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateRequired, validateRequiredDate} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import FormDatePickerField from "../../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import list from "../../../../../services/List";
import FormFileUploader from "../../../../../components/FormFields/FormFileUploadField/FormFileUploader";

const DecisionSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label for="decision_date" className={'required'}>Date</Label>
            <FormDatePickerField
              field={'decision_date'}
              placeholderText={'YYYY-MM-DD'}
              disabled={disabled}
              validate={validateRequiredDate}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="decision_type" className={'required'}>Decision Type</Label>
            <FormSelectField
              field={'decision_type'}
              optionsAPI={list.selectDecisions}
              placeholder={'Please select'}
              labelField={'type'}
              valueField={'id'}
              disabled={disabled}
              validate={validateRequired}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormFileUploader
            label={'Decision File'}
            fileField={'decision_file'}
            nameField={'decision_file_name'}
            sizeField={'decision_file_size'}
            uploadField={'decision_file_upload'}
            api={formApi}
            state={formState.values}
            disabled={disabled}
          />
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <FormFileUploader
            label={'Decision File Extra'}
            fileField={'decision_file_extra'}
            nameField={'decision_file_extra_name'}
            sizeField={'decision_file_extra_size'}
            uploadField={'decision_file_extra_upload'}
            api={formApi}
            state={formState.values}
            disabled={disabled}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(DecisionSubform);

