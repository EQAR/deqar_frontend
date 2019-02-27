import React, { Component } from "react";
import {
  Button,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import PropTypes from 'prop-types';
import style from './AssignedList.module.css';
import { Text } from "informed";
import cx from 'classnames';

class AssignedField extends Component {
  render() {
    const {value, label, btnLabel, field, labelShowRequired, disabled} = this.props;

    return(
      <div>
        <Text field={field} hidden validate={this.props.validate} />
        <FormGroup>
          <Label className={labelShowRequired ? 'required' : ''}>{label}</Label>
          <section onClick={() => console.log('sdsdfs')}>
            {value}
          </section>
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
  field: PropTypes.string.isRequired,
  value: PropTypes.string,
  validate: PropTypes.func,
  onAddButtonClick: PropTypes.func,
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  labelShowRequired: PropTypes.bool,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool
};

export default AssignedField;
