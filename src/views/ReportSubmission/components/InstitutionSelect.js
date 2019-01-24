import React, {Component} from "react";
import AsyncPaginate from 'react-select-async-paginate';
import institution from '../../../services/Institution';
import PropTypes from 'prop-types';

class InstitutionSelect extends Component {
  onChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const customStyles = {
      container: (provided, state) => ({
        ...provided,
        '&:focus': {
          borderColor: 'none'
        }
      }),
      control: (provided, state) => ({
        ...provided,
        borderColor: '#e4e7ea',
        maxHeight: '35px',
        minHeight: '25px',
        '&:hover': {
          borderColor: 'none'
        }
      })
    };

    return(
      <AsyncPaginate
        placeholder={'Enter institution name, city or country'}
        styles={customStyles}
        loadOptions={institution.select}
        getOptionLabel={(option) => {return option.name_primary}}
        getOptionValue={(option) => {return option.id}}
        onChange={this.onChange}
      />
    )
  }
}

InstitutionSelect.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default InstitutionSelect;