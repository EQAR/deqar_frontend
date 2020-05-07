import React from "react";
import { asField } from 'informed';
import {Button, FormGroup, Label, ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from 'prop-types';
import style from './FormAssignedList.module.css';
import {Text} from "informed";
import cx from 'classnames';


const FormAssignedList = asField(({ fieldState, fieldApi, columns, ...props }) => {
  const { value, error } = fieldState;
  const { setValue } = fieldApi;
  const { field, label, btnLabel, labelShowRequired, renderDisplayValue, onClick, disabled } = props;

  const fieldHasError = () => {
    return !!error;
  };

  const onRemove = (idx) => {
    value.splice(idx, 1);
    setValue(value);
  };

  const renderEmpty = () =>(
    <ListGroupItem className={cx(style.ListGroupItem,
      {
        [style.ListGroupItemHasError]: fieldHasError(),
        [style.ListGroupItemDisabled]: disabled
      })}>
      <span className={style.ListGroupItemName}> </span>
    </ListGroupItem>
  );

  const renderListItems = () => {
    if (value) {
      if (value.length > 0) {
        const banned = value.banned ? value.banned : false;
        return value.map((value, idx) => {
          return (
            <ListGroupItem
              className={cx(style.ListGroupItem,
                {
                  [style.ListGroupItemHasError]: fieldHasError(),
                  [style.ListGroupItemDisabled]: disabled

                })}
              key={idx}
            >
              <span
                onClick={() => onClick(idx)}
                className={field !== 'institutions' ? style.ListGroupItemName : undefined}>
                {renderDisplayValue(value)}
              </span>
              { disabled || banned ? "" :
                <div
                  className={style.removeButton + " pull-right"}
                  onClick={() => {onRemove(idx)}}>
                  <i className="fa fa-close"> </i>
                </div>
              }
            </ListGroupItem>
          )
        })
      } else {
        return renderEmpty();
      }
    } else {
      return renderEmpty();
    }
  };

  const displayErrors = () => {
    if (error) {
      return(<small name="scroll-to-element" className={cx('help-block form-text text-danger', style.ErrorText)}>{error}</small>)
    } else {
      return null;
    }
  };

  return(
    <div>
      <Text field={field} hidden validate={props.validate} />
      <FormGroup>
        {label ?
          <Label className={cx(labelShowRequired ? 'required' : '', style.Label)}>
            {label}
          </Label> : null}
        {btnLabel && !disabled ?
          <Button
            type={'button'}
            size="sm"
            color="secondary"
            onClick={props.onAddButtonClick}
            className={style.Button}
          >{btnLabel}</Button> : null}
        <ListGroup className={style.ListGroup}>
          {renderListItems()}
        </ListGroup>
        {displayErrors()}
      </FormGroup>
    </div>
  )
});

export default FormAssignedList;

FormAssignedList.defaultValues = {
  labelShowRequired: false,
  disabled: false
};

FormAssignedList.propTypes = {
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
  renderDisplayValue: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func,
  onClick: PropTypes.func,
  label: PropTypes.string,
  labelShowRequired: PropTypes.bool,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool
};

