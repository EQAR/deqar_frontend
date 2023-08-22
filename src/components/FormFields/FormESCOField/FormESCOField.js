import React, {useState, useEffect} from 'react';
import { asField } from 'informed';
import Select from 'react-select';
import { style } from './FormESCOFieldStyle';
import axios from 'axios';

const FormESCOField = asField(({ fieldState, fieldApi,...props }) => {
  var qs = require('qs');

  const [options, setOptions] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState(undefined);

  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, idField, disabled, placeholder, includeID,
    isMulti, givenValue, staticOptions, ...rest } = props;
  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';
  const customStyles = style(borderColor);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    if (search) {
      const url = process.env.REACT_APP_ESCO_API
      axios.get(url, {
        params: {
          text: search,
          selectedVersion: 'v1.0.9',
          full: false,
        },
        cancelToken: source.token
      }).then(results => {
        const data = results.data;
        if (data['total'] > 0) {
          const results = data['_embedded']['results']
          setOptions(results.map(r => {
            return {uri: r['uri'], title: r['title']}
          }));
          setOpenMenu(true);
        } else {
          setOptions([])
        }
      }).catch(error => {
        setOptions([])
      })

    }

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [search])

  const changeInputValue = (value, action) => {
    if (value.length > 2) {
      setSearch(value)
    } else {
      setOpenMenu(false)
      setOptions([])
      setSearch(undefined)
    }
  }

  const getLabel = (option) => {
    return `${option['title']} - ${option['uri']}`
  }

  const changeValue = value =>  {
    setError('');
    setValue(value);
    setTouched();
  };

  return (
    <React.Fragment>
      <Select
        styles={customStyles}
        ref={forwardedRef}
        defaultValue={value || initialValue || ''}
        value={givenValue || value || initialValue || ''}
        onInputChange={(value, action) => changeInputValue(value, action)}
        onChange={(value, action) => changeValue(value, action)}
        onBlur={() => setOpenMenu(false)}
        getOptionLabel={getLabel}
        getOptionValue={(option) => option['uri']}
        classNamePrefix="react-select"
        isDisabled={disabled}
        placeholder={disabled ? "" : placeholder}
        isClearable={true}
        options={options}
        menuIsOpen={openMenu}
      />
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

FormESCOField.defaultProps = {
  includeID: false
};

export default FormESCOField;
