import React, {useState, useEffect} from 'react';
import { asField } from 'informed';
import Select from 'react-select';
import { style } from './FormISCEDFieldStyle';
import axios from 'axios';

const FormISCEDField = asField(({ fieldState, fieldApi, ...props }) => {
  const [options, setOptions] = useState([]);

  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { disabled, givenValue, staticOptions, ...rest } = props;
  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';
  const customStyles = style(borderColor);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    const url = process.env.REACT_APP_ESCO_API
    axios.get(url, {
      params: {
        full: false,
        isInScheme: 'http://data.europa.eu/esco/concept-scheme/isced-f',
        limit: 300
      },
      cancelToken: source.token
    }).then(results => {
      const data = results.data;
      if (data['total'] > 0) {
        const results = data['_embedded']['results']
        setOptions(results.map(r => {
          return {id: r['uri'], title: r['title']}
        }));
      } else {
        setOptions([])
      }
    }).catch(error => {
      setOptions([])
    })

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [])

  const getLabel = (option) => {
    return `${option['title']} - ${option['id']}`
  }

  const changeValue = value =>  {
    setError('');
    setValue(value);
    setTouched();
  };

  return (
    <React.Fragment>
      {disabled ?
        <input
          readOnly={disabled}
          value={value}
          {...rest}
          className={'form-control'}
        /> :
        <Select
          {...rest}
          styles={customStyles}
          defaultValue={value || ''}
          value={value || ''}
          onChange={(value, action) => changeValue(value, action)}
          getOptionLabel={getLabel}
          getOptionValue={(option) => option['id']}
          classNamePrefix="react-select"
          isDisabled={disabled}
          isClearable={true}
          options={options}
        />
      }
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

export default FormISCEDField;
