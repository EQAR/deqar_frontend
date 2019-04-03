import React, { Component } from 'react'
import PropTypes from "prop-types";
import {InputGroup, InputGroupAddon, InputGroupText, Label} from "reactstrap";
import style from "./ActiveDateFilter.module.css";

class ActiveDateFilter extends Component {
  handleFilterChange = (e) => {
    const { field } = this.props;
    if(e.target.value < 2200) {
      this.props.onFilter(e.target.value, field);
    }
  };

  handleActiveDateChange = (event) => {
    this.props.onFilter(event.target.checked, 'active');
  };

  render() {
    const { field, onFilter, value, active, ...rest } = this.props;

    return(
      <InputGroup>
        <input
          type='number'
          min={1000}
          max={9999}
          value={value || ''}
          onChange={this.handleFilterChange}
          className={'form-control'}
          placeholder={'YYYY'}
        />
        <InputGroupAddon addonType="append">
          <InputGroupText className={style.filterInputGroup}>
            <input
              type={'checkbox'}
              onChange={this.handleActiveDateChange}
              checked={active || false}
            />
            <Label check className={style.activeFilter}>
              Active
            </Label>
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    )
  }
}

ActiveDateFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string,
  active: PropTypes.bool,
  onFilter: PropTypes.func
};

export default ActiveDateFilter;