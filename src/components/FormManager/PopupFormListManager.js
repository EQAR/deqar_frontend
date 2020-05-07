import React, {useState} from 'react';
import {Col, Row} from "reactstrap";
import FormAssignedList from "../FormFields/FormAssignedList/FormAssignedList";

const PopupFormListManager = ({disabled, label, btnLabel='Add', field, labelShowRequired=false, renderDisplayValue, columns=1, formApi, validate, ...props}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [formIndex, setFormIndex] = useState(undefined);
  const [formValue, setFormValue] = useState({});

  const onAddButtonClick = () => {
    setFormIndex(undefined);
    setFormValue({});
    setPopupOpen(true);
  };

  const onClick = (idx) => {
    setFormIndex(idx);
    setFormValue(formApi.getValue(field)[idx]);
    setPopupOpen(true);
  };

  const onSubmit = (values, index) => {
    let v = formApi.getValue(field);
    v = v ? v : [];
    if(index >= 0) {
      v[index] = values;
    } else {
      v.push(values);
    }
    formApi.setValue(field, v);
    setPopupOpen(false);
  };

  const onClose = () => {
    setPopupOpen(false);
  };

  const getLabel = () => {
    if (label) {
      return label
    } else {
      let lbl = field.charAt(0).toUpperCase() + field.slice(1);
      return lbl.replace('_', ' ');
    }
  };

  return(
    <React.Fragment>
      <Row>
        <Col md={12}>
          {
            React.cloneElement(props.children, {
              title: getLabel(),
              formIndex: formIndex,
              formValue: formValue,
              modalOpen: popupOpen,
              onSubmit: onSubmit,
              onClose: onClose,
              disabled: disabled,
            })
          }
        </Col>
        <Col md={12}>
          <FormAssignedList
            renderDisplayValue={renderDisplayValue}
            label={getLabel()}
            labelShowRequired={labelShowRequired}
            btnLabel={btnLabel}
            onAddButtonClick={onAddButtonClick}
            onClick={onClick}
            field={field}
            columns={columns}
            disabled={disabled}
            validate={validate}
          />
        </Col>
      </Row>
    </React.Fragment>
  )
};

export default PopupFormListManager;
