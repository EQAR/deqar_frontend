import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import FormTextArea from "../../../../../components/FormFields/FormTextArea/FormTextArea";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import {validateRequiredURL} from "../../../../../utils/validators";

const ReportLinkSubform = ({formApi, formState, disabled}) => {
  return (
    <Row>
      <Col md={12}>
        <FormGroup>
          <Label for="link" className={'required'}>URL</Label>
          <FormTextArea
            field={'link'}
            placeholder={'Enter URL'}
            validate={validateRequiredURL}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="link_display_name">URL Display Name</Label>
          <FormTextArea
            field={'link_display_name'}
            placeholder={'Enter name for display'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
    </Row>
  )
};

export default withPopupFormManager(ReportLinkSubform);
