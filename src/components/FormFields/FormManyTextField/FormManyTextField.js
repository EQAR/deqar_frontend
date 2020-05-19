import React, {useState, useEffect} from 'react';
import {Scope, Text} from "informed";
import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import style from "./FormManyTextField.module.css";
import FormRemovableTextField from "./FormRemovableTextField";

const FormManyTextField = ({disabled, scopeName, data, field, label, required=false, formApi, validate, placeholder, ...props}) => {
  const extra = 1;
  const [count, setCount] = useState(extra);

  // componentDidMount
  useEffect(() => {
    setCount(data ? data.length : extra);
  }, [data]);

  const onAddButtonClick = () => {
    if (count === 0) {
      setCount(count+1);
    } else {
      if (data) {
        if (data.length === count) {
          setCount(count+1);
        }
      }
    }
  };

  const onRemoveButtonClick = (idx) => {
    let values = formApi.getState().values;
    if (values.hasOwnProperty(scopeName)) {
      if (idx === 0) {
        const obj = values[scopeName][idx];
        obj[field] = "";
      } else {
        values[scopeName].splice(idx, 1);
      }
      formApi.setValues(values);
    } else {
      setCount(count-1);
    }
  };

  return (
    <React.Fragment>
      <Label className={required ? 'required' : undefined}>{label}</Label>
      {
        [...Array(count)].map((c, idx) => {
          const scope = `${scopeName}[${idx}]`;
          return (
            <React.Fragment key={idx}>
              <Scope scope={scope}>
                <FormGroup row>
                  <Col md={12}>
                    <Text field={'id'} hidden />
                    <FormRemovableTextField
                      onRemoveButtonClick={() => onRemoveButtonClick(idx)}
                      field={field}
                      placeholder={placeholder}
                      disabled={disabled}
                      validate={validate}
                    />
                  </Col>
                </FormGroup>
              </Scope>
            </React.Fragment>
          )
        })
      }
      {
        disabled ? "" :
        <Row>
          <Col md={12}>
            <div className="pull-right">
              <Button
                type={'button'}
                size="sm"
                color="secondary"
                onClick={onAddButtonClick}
                className={style.Button}
              >Add More...</Button>
            </div>
          </Col>
        </Row>
      }
    </React.Fragment>

  )
};

export default FormManyTextField;
