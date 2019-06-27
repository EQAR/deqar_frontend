import React from "react";
import {
  FormGroup,
  Label
} from "reactstrap";
import PropTypes from 'prop-types';
import style from './AssignedField.module.css';
import { Text } from "informed";
import cx from 'classnames';

const AssignedField = ({value, label, field, labelShowRequired, disabled, ...props}) => {
  return(
    <div>
      <Text field={field} hidden validate={props.validate} />
      <FormGroup>
        <Label className={labelShowRequired ? 'required' : ''}>{label}</Label>
        <section className={cx(style.FieldValue, {[style.FieldDisabled]: disabled})}
                 onClick={props.onClick}>
          <span className={style.FieldParagraph}>{value}</span>
        </section>
      </FormGroup>
    </div>
  )
};

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
