import React from "react";
import {Button, FormGroup, Label, ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from 'prop-types';
import style from './AssignedList.module.css';
import {Text} from "informed";
import cx from 'classnames';

const AssignedList = ({values, errors, label, btnLabel, field, labelShowRequired, disabled, ...props}) => {
  const renderListItems = (values) => {
    values = values ? values : [];
    const emptyBox = (
      <ListGroupItem className={cx(style.ListGroupItem,
        {
          [style.ListGroupItemHasError]: fieldHasError(),
          [style.ListGroupItemDisabled]: disabled
        })}>
        <span className={style.ListGroupItemName}> </span>
      </ListGroupItem>
    );

    if(values.length > 0) {
      return values.map((value, idx) => {
        return(
          <ListGroupItem
            className={cx(style.ListGroupItem,
              {
                [style.ListGroupItemHasError]: fieldHasError(),
                [style.ListGroupItemDisabled]: disabled

              })}
            key={idx}
          >
            <span onClick={() => props.onClick(idx)} className={style.ListGroupItemName}>
              {props.renderDisplayValue(value)}
            </span>
            { disabled ? "" :
              <div className={style.removeButton + " pull-right"} onClick={() => {props.onRemove(idx)}}>
                <i className="fa fa-close"> </i>
              </div>
            }
          </ListGroupItem>
        )
      });
    } else {
      return(emptyBox)
    }
  };

  const displayErrors = (errors, field) => {
    if(errors) {
      if(field in errors) {
        return(<small className={cx('help-block form-text text-danger', style.ErrorText)}>{errors[field]}</small>)
      } else {
        return null
      }
    }
  };

  const fieldHasError = () => {
    if(errors) {
      return field in errors;
    } else {
      return false
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
          {renderListItems(values)}
        </ListGroup>
        {displayErrors(errors, field)}

      </FormGroup>
    </div>
  )
};

AssignedList.defaultValues = {
  labelShowRequired: false,
  disabled: false
};

AssignedList.propTypes = {
  errors: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
  values: PropTypes.array,
  renderDisplayValue: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string,
  labelShowRequired: PropTypes.bool,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool
};

export default AssignedList;
