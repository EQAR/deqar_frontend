import React from 'react'
import style from "./SelectFilter.module.css";
import Select from "react-select";
import PropTypes from "prop-types";

const SelectFilter = (props) => {
  const handleSelectChange = (value, props) => {
    const { columnConfig } = props;
    const { filterQueryParam, selectFilterValue } = columnConfig;

    switch(props.action) {
      case 'select-option':
        const val = value[selectFilterValue];
        this.props.onFilterChange(val, filterQueryParam);
        break;
      case 'clear':
        this.props.onFilterRemove(filterQueryParam);
        break;
      default:
        break;
    }
  };

  const { filtered, columnConfig, selectFilterOptions } = props;
  const { selectFilterLabel, selectFilterValue, filterQueryParam } = columnConfig;

  let value = null;
  const filter = filtered.find(f => f.id === filterQueryParam);
  if(selectFilterOptions && filter) {
    value = selectFilterOptions.find(o => o[selectFilterValue] === filter.value);
  }

  const customStyles = {
    container: (provided) => ({
      ...provided,
      '&:focus': {
        borderColor: 'none'
      }
    }),
    control: (provided) => ({
      ...provided,
      borderColor: 'rgba(0,0,0,0.1)',
      boxShadow: null,
      maxHeight: '29px',
      minHeight: '25px',
      '&:hover': {
        borderColor: 'none'
      },
      '&:focus': {
        borderColor: 'none'
      }
    }),
    placeholder: (provided) => ({
      ...provided,
      top: '10px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      position: 'relative',
      top: '-3px'
    }),
    input: (provided) => ({
      ...provided,
      '&:focus': {
        borderColor: 'none'
      }
    }),
    singleValue: (provided) => ({
      ...provided,
      top: '10px'
    }),
    clearIndicator: (provided) => ({
      ...provided,
      display: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      textAlign: 'left'
    }),
  };

  return (
    <div className={style.selectFilter}>
      <Select
        styles={customStyles}
        options={selectFilterOptions}
        value={value}
        isClearable={true}
        getOptionLabel={(option) => {return option[selectFilterLabel]}}
        getOptionValue={(option) => {return option[selectFilterValue]}}
        onChange={handleSelectChange}
        classNamePrefix={'react-select'}
      />
    </div>
  )
};

SelectFilter.propTypes = {
  columnConfig: PropTypes.object,
  filtered: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  onFilterRemove: PropTypes.func.isRequired,
  selectFilterOptions: PropTypes.array
};

export default SelectFilter;