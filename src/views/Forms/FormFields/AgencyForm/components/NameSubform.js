import React from 'react';
import {Col, FormGroup, Label, ModalBody, Row} from "reactstrap";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import {Checkbox, TextArea} from "informed";
import style from "./NameSubform.module.css";
import FormManyMultipleField from "../../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";

const NameSubform = ({formApi, formState, disabled}) => {
  return (
    <React.Fragment>
      <Row>
        <FormManyMultipleField
          scopeName={'agency_name_versions'}
          formApi={formApi}
          data={formState.values['agency_name_versions']}
          disabled={disabled}
          extra={0}
          render={({counter}) => (
            <React.Fragment>
              <Col md={10}>
                <FormGroup>
                  <Label for="name">Agency Name</Label>
                  <FormTextField
                    field={'name'}
                    placeholder={'Agency Name'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="name_is_primary">Primary</Label>
                  <Checkbox
                    field={'name_is_primary'}
                    className={style.Checkbox}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <FormTextField
                    field={'name_transliterated'}
                    placeholder={'Agency Name Transliteration'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={10}>
                <FormGroup>
                  <Label for="name">Agency Acronym</Label>
                  <FormTextField
                    field={'acronym'}
                    placeholder={'Enter agency acronym'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="acronym_is_primary">Primary</Label>
                  <Checkbox
                    field={'acronym_is_primary'}
                    className={style.Checkbox}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
              <Col md={10}>
                <FormGroup>
                  <FormTextField
                    field={'acronym_transliterated'}
                    placeholder={'Agency Acronym Transliteration'}
                    disabled={disabled}
                  />
                </FormGroup>
              </Col>
            </React.Fragment>
          )}
        />
      </Row>
      <Row>
        <Col md={12}>
          <FormGroup>
            <Label for="name_note">Name Note</Label>
            <TextArea
              field={'name_note'}
              placeholder={disabled ? "" : 'Enter note, as applicable'}
              className={'form-control'}
              disabled={disabled}
            />
          </FormGroup>
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default withPopupFormManager(NameSubform);
