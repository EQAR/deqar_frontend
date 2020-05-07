import React from 'react';
import {Col, FormGroup, Label, Row} from "reactstrap";
import {validateRequired} from "../../../../../utils/validators";
import withPopupFormManager from "../../../../../components/FormManager/PopupFormManagerHOC";
import FormTextField from "../../../../../components/FormFields/FormTextField/FormTextField";
import FormSelectField from "../../../../../components/FormFields/FormSelectField/FormSelectField";
import language from "../../../../../services/Language";
import validateOriginalLocation from "../validators/validateOriginalLocation";
import FormFileUploader from "../../../../../components/FormFields/FormFileUploadField/FormFileUploader";

const FileSubform = ({formApi, formState, disabled}) => {
  return (
    <Row>
      <Col md={12}>
        {!disabled &&
          <FormGroup>
            <Label for="original_location">File Original URL</Label>
            <FormTextField
              field={'original_location'}
              validate={validateOriginalLocation}
              placeholder={'Enter file location URL'}
              disabled={disabled}
            />
          </FormGroup>
        }
      </Col>
      <Col md={12}>
        <FormFileUploader
          api={formApi}
          state={formState.values}
          disabled={disabled}
        />
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="display_name">File Display Name</Label>
          <FormTextField
            field={'display_name'}
            placeholder={'Enter file name for display'}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <Label for="report_language" className={'required'}>File Languages</Label>
          <FormSelectField
            field={'report_language'}
            optionsAPI={language.select}
            placeholder={'Please select multiple, if necessary'}
            labelField={'language_name_en'}
            valueField={'iso_639_2'}
            isMulti
            validate={validateRequired}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
    </Row>
  )
};

export default withPopupFormManager(FileSubform);
