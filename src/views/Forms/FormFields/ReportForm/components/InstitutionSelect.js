import React, {useState} from "react";
import AsyncPaginate from 'react-select-async-paginate';
import institution from '../../../../../services/Institution';
import PropTypes from 'prop-types';

const InstitutionSelect = ({onChange, selectedValues, emptyAfterChange=true, ...props}) => {
  const [value, setValue] = useState('');

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
      '&:hover': {
        borderColor: 'none'
      },
      height: '36px',
      minHeight: '36px',
    }),
    singleValue: (provided, state) => ({
      ...provided,
      top: '46%',
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: '46%',
    }),
  };

  const onValueChange = (value) => {
    emptyAfterChange ? setValue('') : setValue(value);
    onChange(value);
  };

  return(
    <AsyncPaginate
      {...props}
      value={value}
      placeholder={'Enter institution name, ETER ID, city or country'}
      styles={customStyles}
      filterOption={() => true}
      loadOptions={institution.select}
      getOptionLabel={(option) => {return option.name_select_display}}
      getOptionValue={(option) => {return option.deqar_id[0]}}
      onChange={onValueChange}
    />
  )
};

InstitutionSelect.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default InstitutionSelect;
