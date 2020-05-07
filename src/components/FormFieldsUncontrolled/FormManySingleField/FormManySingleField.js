import React, {useState, useEffect} from 'react';
import {Scope} from "informed";
import {Button, Col, FormGroup, InputGroup, InputGroupAddon, Label, Row} from "reactstrap";
import style from "./FormManySingleField.module.css";

const FormManySingleField = ({disabled, scopeName, label, data, extra=0, required=false, formApi, render, ...props}) => {
  const [count, setCount] = useState(extra);

  // componentDidMount
  useEffect(() => {
    setCount(data ? data.length : extra);
  }, [data, extra]);

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
      values[scopeName].splice(idx, 1);
      formApi.setValues(values);
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
                    <InputGroup>
                      {props.children}
                      {!disabled && (
                        <InputGroupAddon addonType="append">
                          <Button
                            color="secondary"
                            onClick={(e) => onRemoveButtonClick(idx)}
                          >
                            <i className="fa fa-trash-o"> </i>
                          </Button>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
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

export default FormManySingleField;
