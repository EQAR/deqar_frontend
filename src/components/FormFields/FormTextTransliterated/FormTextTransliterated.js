import React, {useEffect, useState} from "react";
import {Col, Collapse, FormGroup, FormText, Label, Row} from "reactstrap";
import style from "../../../views/Forms/FormFields/InstitutionForm/InstitutionForm.module.css";
import FormTextField from "../FormTextField/FormTextField";
import {validateRequired, validateRoman} from "../../../utils/validators";
import cx from "classnames";

const FormTextTransliterated = ({field, label, scopeName, counter, transliterationField, formType, values, formApi,
                                 required=false, labelDisabled=false, repeat=false, readOnly, ...props}) => {
  const [showTransliteration, setShowTransliteration] = useState(false);

  useEffect(() => {
    if (values) {
      if (values.hasOwnProperty(transliterationField)) {
        if (values[transliterationField].length > 1) {
          setShowTransliteration(true);
        }
      }
    }
  }, [values]);

  const getFieldName = (field) => {
    let fieldName = field;

    if (scopeName) {
      fieldName = `${scopeName}.${field}`;
    }
    return fieldName;
  };

  const deleteTransliteration = () => {
    if (showTransliteration) {
      formApi.setValue(getFieldName(transliterationField), '');
    }
    setShowTransliteration(!showTransliteration);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <FormGroup className={formType === 'edit' ? style.noFormGroupMargin : ''}>
            {labelDisabled ? '' : <Label for={field} className={required ? 'required' : ''}>{label}</Label>}
            <FormTextField
              field={repeat ? field : getFieldName(field)}
              disabled={readOnly}
              validate={required ? validateRequired : ''}
            />
          </FormGroup>
        </Col>
      </Row>
      <Collapse isOpen={showTransliteration}>
        <Row>
          <Col>
            <FormGroup className={readOnly ? '' : cx(style.noFormGroupMargin, style.Transliteration)}>
              <FormTextField
                field={repeat ? transliterationField : getFieldName(transliterationField)}
                placeholder={'Enter transliterated form'}
                disabled={readOnly}
                validate={validateRoman}
              />
            </FormGroup>
          </Col>
        </Row>
      </Collapse>
      {formType !== 'edit' ? "" :
        <Row>
          <FormGroup>
            <Col md={12}>
              <FormText color="muted">
                    <span onClick={() => deleteTransliteration()} className={style.removeTransliteration}>
                      {showTransliteration ? 'Remove Transliteration' : 'Add Transliteration'}
                    </span>
              </FormText>
            </Col>
          </FormGroup>
        </Row>
      }
    </React.Fragment>
  )
};

export default FormTextTransliterated;
