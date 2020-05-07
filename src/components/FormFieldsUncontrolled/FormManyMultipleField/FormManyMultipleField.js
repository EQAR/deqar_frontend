import React, {useState, useEffect} from 'react';
import {Scope} from "informed";
import {Button, Col} from "reactstrap";
import style from "./FormManyMultipleField.module.css";

const FormManyMultipleField = ({disabled, scopeName, data, extra=0, formApi, render, ...props}) => {
  const [count, setCount] = useState(extra);

  // componentDidMount
  useEffect(() => {
    setCount(data ? data.length + extra : extra);
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
      values[scopeName].splice(idx, 1);
      formApi.setValues(values);
    }
  };

  return (
    <React.Fragment>
      {
        [...Array(count)].map((c, idx) => {
          const scope = `${scopeName}[${idx}]`;
          return (
            <React.Fragment key={idx}>
              <Scope scope={scope}>
                {render({counter: idx+1})}
                {!disabled && (
                  <Col md={2}>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={(e) => onRemoveButtonClick(idx)}
                    >
                      <i className="fa fa-trash-o"> </i>
                    </Button>
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
            >Add More...</Button>
          </div>
        </Col>
      }
    </React.Fragment>

  )
};

export default FormManyMultipleField;
