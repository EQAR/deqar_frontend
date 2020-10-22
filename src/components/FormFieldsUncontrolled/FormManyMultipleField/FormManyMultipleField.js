import React, {useState, useEffect} from 'react';
import {Scope} from "informed";
import {Button, Col, Label} from "reactstrap";
import style from "./FormManyMultipleField.module.css";

const FormManyMultipleField = ({disabled, scopeName, data, formApi, render, deleteInRow=false, extra=1,
                                 label, required, addButtonText="Add More...", ...props}) => {
  const [count, setCount] = useState(1);

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
    } else {
      setCount(count-1);
    }
  };

  return (
    <React.Fragment>
      {
        label &&
          <Col sm={12}>
            <Label className={required ? 'required' : undefined}>{label}</Label>
          </Col>
      }
      {
        [...Array(count)].map((c, idx) => {
          const scope = `${scopeName}[${idx}]`;
          return (
            <React.Fragment key={idx}>
              <Scope scope={scope}>
                {render({counter: idx+1, scope: scope, data: data})}
                {!disabled && (
                  <Col sm={1}>
                    <div className="pull-right">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={(e) => onRemoveButtonClick(idx)}
                        className={style.DeleteButton}
                      >
                        <i className="fa fa-trash-o"> </i>
                      </Button>
                    </div>
                  </Col>
                )}
              </Scope>
            </React.Fragment>
          )
        })
      }
      {
        disabled ? "" :
        <Col md={12}>
          <div className="pull-right">
            <Button
              type={'button'}
              size="sm"
              color="secondary"
              onClick={onAddButtonClick}
              className={style.Button}
            >{addButtonText}</Button>
          </div>
        </Col>
      }
    </React.Fragment>

  )
};

export default FormManyMultipleField;
