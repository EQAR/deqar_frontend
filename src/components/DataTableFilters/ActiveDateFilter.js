import React from 'react'
import PropTypes from "prop-types";
import {InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import style from "./ActiveDateFilter.module.css";

const ActiveDateFilter = ({value, active, field, ...props}) => {
  const handleFilterChange = (e) => {
    if(e.target.value < 2200) {
      props.onFilter(e.target.value, field);
    }
  };

  const handleActiveDateChange = (event) => {
    props.onFilter(event.target.checked, 'active');
  };

  return(
    <InputGroup>
      <input
        type='number'
        min={1000}
        max={9999}
        value={value || ''}
        onChange={handleFilterChange}
        className={'form-control'}
        placeholder={'YYYY'}
      />
      <InputGroupAddon addonType="append">
        <InputGroupText className={style.filterInputGroup}>
          <input
            type={'checkbox'}
            onChange={handleActiveDateChange}
            checked={active || false}
          />
          <Label check className={style.activeFilter}>
            Current
          </Label>
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
};

ActiveDateFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string,
  active: PropTypes.bool,
  onFilter: PropTypes.func
};

export default ActiveDateFilter;