import React, { Component } from "react";
import {Button, FormGroup, Label, ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from 'prop-types';
import style from './AssignedList.module.css';
import { Text } from "informed";
import cx from 'classnames';

class AssignedField extends Component {
  renderDisplayValue = (value) => {
    const {valueFields} = this.props;
    for (const valueField of valueFields) {
      if (value[valueField]) {
        return value[valueField];
      }
    }
  }

  displayErrors = (errors, field) => {
    if(errors) {
      if(field in errors) {
        return(<small className="help-block form-text text-danger">{errors[field]}</small>)
      } else {
        return null
      }
    }
  }

  fieldHasError = () => {
    const {field, errors} = this.props;
    if(errors) {
      return field in errors;
    } else {
      return false
    }
  }

  render() {
    const {values, errors, label, btnLabel, field, labelShowRequired, disabled} = this.props;
    console.log(this.props);

    console.log();

    return(
      <div>
        <Text field={field} hidden validate={this.props.validate} />
        <FormGroup>
          <Label className={labelShowRequired ? 'required' : ''}>{label}</Label>
          <ListGroup className={style.ListGroup}>
            {/* {this.renderListItems(values)} */}
          </ListGroup>
          {this.displayErrors(errors, field)}
          {btnLabel && !disabled ?
            <Button
              type={'button'}
              size="sm"
              color="secondary"
              onClick={this.props.onAddButtonClick}
              className={style.Button}
            >{btnLabel}</Button> : null}
        </FormGroup>
      </div>
    )
  }
}

AssignedField.defaultValues = {
  labelShowRequired: false,
  disabled: false
};

AssignedField.propTypes = {
  errors: PropTypes.object.isRequired,
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
  onAddButtonClick: PropTypes.func,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  labelShowRequired: PropTypes.bool,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool
};

export default AssignedField;
