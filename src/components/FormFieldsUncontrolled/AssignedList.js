import React, {Component} from "react";
import {Button, FormGroup, Label, ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from 'prop-types';
import style from './AssignedList.module.css';
import {Text} from "informed";
import cx from 'classnames';

class AssignedList extends Component {
  renderDisplayValue = (value) => {
    const {valueFields} = this.props;
    for (const valueField of valueFields) {
      if (value[valueField]) {
        return value[valueField];
      }
    }
  };

  renderListItems = (values) => {
    const { disabled } = this.props;

    values = values ? values : [];
    const emptyBox = (
      <ListGroupItem className={cx(style.ListGroupItem,
        {
          [style.ListGroupItemHasError]: this.fieldHasError(),
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
                [style.ListGroupItemHasError]: this.fieldHasError(),
                [style.ListGroupItemDisabled]: disabled

              })}
            key={idx}
          >
            <span onClick={() => this.props.onClick(idx)} className={style.ListGroupItemName}>
              {this.renderDisplayValue(value)}
            </span>
            { disabled ? "" :
              <div className={style.removeButton + " pull-right"} onClick={() => {this.props.onRemove(idx)}}>
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

  displayErrors = (errors, field) => {
    if(errors) {
      if(field in errors) {
        return(<small className="help-block form-text text-danger">{errors[field]}</small>)
      } else {
        return null
      }
    }
  };

  fieldHasError = () => {
    const {field, errors} = this.props;
    if(errors) {
      return field in errors;
    } else {
      return false
    }
  };

  render() {
    const {values, errors, label, btnLabel, field, labelShowRequired, disabled} = this.props;

    return(
      <div>
        <Text field={field} hidden validate={this.props.validate} />
        {btnLabel && !disabled ?
          <Button
            type={'button'}
            size="sm"
            color="secondary"
            onClick={this.props.onAddButtonClick}
            className={style.Button}
          >{btnLabel}</Button> : null}
        <FormGroup>
          <Label className={labelShowRequired ? 'required' : ''}>{label}</Label>
          <ListGroup className={style.ListGroup}>
            {this.renderListItems(values)}
          </ListGroup>
          {this.displayErrors(errors, field)}

        </FormGroup>
      </div>
    )
  }
}

AssignedList.defaultValues = {
  labelShowRequired: false,
  disabled: false
};

AssignedList.propTypes = {
  errors: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
  values: PropTypes.array,
  valueFields: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func,
  onRemove: PropTypes.func.isRequired,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  labelShowRequired: PropTypes.bool,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool
};

export default AssignedList;
