import React from 'react'
import { Col, InputGroup, InputGroupAddon, InputGroupText, Label, Row } from "reactstrap";
import style from "./ActiveDateFilter.module.css";
import PropTypes from "prop-types";

const ActiveDateFilter = (props) => {
  const handleDateChange = (event) => {
    const { columnConfig } = props;
    const { filterQueryParam } = columnConfig;
    props.onFilterChange(event.target.value, filterQueryParam);
  };

  const handleActiveDateChange = (event) => {
    props.onFilterChange(event.target.checked, 'active');
  };

  const { filtered, columnConfig } = props;
  const { filterQueryParam } = columnConfig;

  const activeFilter = filtered.find(f => f.id === 'active');
  const activeFilterValue = activeFilter ? activeFilter['value'] : false;

  const dateFilter = filtered.find(f => f.id === filterQueryParam);
  const dateFilterValue = dateFilter ? dateFilter['value'] : '';

  return(
    <Row>
      <Col md="12">
        <InputGroup>
          <input
            type="text"
            onChange={handleDateChange}
            className={style.dateYearFilter}
            value={dateFilterValue}
            placeholder={'YYYY'}
          />
          <InputGroupAddon addonType="append">
            <InputGroupText className={style.filterInputGroup}>
              <input
                type={'checkbox'}
                onChange={handleActiveDateChange}
                checked={activeFilterValue}
              />
              <Label check className={style.activeFilter}>
                <i className={'fa fa-clock-o'}> </i>
              </Label>
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </Row>
  )
};

ActiveDateFilter.propTypes = {
  columnConfig: PropTypes.object,
  filtered: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired
};

export default ActiveDateFilter