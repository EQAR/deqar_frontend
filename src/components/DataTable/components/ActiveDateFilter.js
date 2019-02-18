import React, { Component } from 'react'
import { Col, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import style from "./ActiveDateFilter.module.css";
import PropTypes from "prop-types";

class ActiveDateFilter extends Component {
  handleDateChange = (event) => {
    const { columnConfig } = this.props;
    const { filterQueryParam } = columnConfig;
    this.props.onFilterChange(event.target.value, filterQueryParam);
  };

  handleActiveDateChange = (event) => {
    this.props.onFilterChange(event.target.checked, 'active');
  };

  render() {
    const { filtered, columnConfig } = this.props;
    const { filterQueryParam } = columnConfig;

    const activeFilter = filtered.find(f => f.id === 'active');
    const activeFilterValue = activeFilter ? activeFilter['value'] : false;

    const dateFilter = filtered.find(f => f.id === filterQueryParam);
    const dateFilterValue = dateFilter ? dateFilter['value'] : '';

    return(
      <Row>
        <Col md="12">
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className={style.filterInputGroup}>
                <input
                  type={'checkbox'}
                  onChange={this.handleActiveDateChange}
                  checked={activeFilterValue}
                />
                <Label check className={style.activeFilter}>Active</Label>
              </InputGroupText>
            </InputGroupAddon>
            <input
              type="text"
              onChange={this.handleDateChange}
              className={style.dateYearFilter}
              value={dateFilterValue}
            />
          </InputGroup>
        </Col>
      </Row>
    )
  }
}

ActiveDateFilter.propTypes = {
  columnConfig: PropTypes.object,
  filtered: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired
};

export default ActiveDateFilter