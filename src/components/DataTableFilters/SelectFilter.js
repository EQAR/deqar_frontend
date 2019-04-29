import React, { Component } from 'react'
import style from "./SelectFilter.module.css";
import Select from "react-select";
import PropTypes from "prop-types";

class SelectFilter extends Component {
  handleFilterChange = (value, props) => {
    const { field } = this.props;

    switch(props.action) {
      case 'select-option':
        this.props.onFilter(value, field);
        break;
      case 'clear':
        this.props.onFilterRemove(field);
        break;
      default:
        break;
    }
  };

  render() {
    const { selectFilterOptions, field, onFilter, ...rest } = this.props;

    const customStyles = {
      container: (provided) => ({
        ...provided,
        '&:focus': {
          borderColor: 'none'
        }
      }),
      control: (provided) => ({
        ...provided,
        maxHeight: '35px',
        minHeight: '25px',
        borderColor: 'rgba(0,0,0,0.1)',
        boxShadow: null,
        '&:hover': {
          borderColor: 'none'
        },
        '&:focus': {
          borderColor: 'none'
        }
      }),
      input: (provided) => ({
        ...provided,
        '&:focus': {
          borderColor: 'none'
        }
      }),
      placeholder: (provided) => ({
        ...provided,
        top: '45%'
      }),
      singleValue: (provided) => ({
        ...provided,
        top: '45%'
      }),
      menu: (provided) => ({
        ...provided,
        textAlign: 'left'
      }),
    };

    return (
      <div className={style.selectFilter}>
        <Select
          {...rest}
          styles={customStyles}
          options={selectFilterOptions}
          isClearable={true}
          classNamePrefix={'react-select'}
          onChange={this.handleFilterChange}
        />
      </div>
    )
  }
}

SelectFilter.propTypes = {
  field: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  onFilter: PropTypes.func,
  onFilterRemove: PropTypes.func,
  selectFilterOptions: PropTypes.array
};

export default SelectFilter;