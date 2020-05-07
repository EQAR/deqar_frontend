import React, {useState, useEffect} from 'react';
import { asField } from 'informed';
import Select from 'react-select';
import { style } from './FormSelectFieldStyle';
import axios from 'axios';

const FormDependentSelectField = asField(({ fieldState, fieldApi, ...props }) => {
  const [options, setOptions] = useState([]);

  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;
  const { onChange, onBlur, initialValue, forwardedRef, labelField, valueField, disabled, placeholder, includeID,
    isMulti, givenValue, optionsID, optionsAPI,...rest } = props;
  const borderColor = fieldApi.getError() ? '#f86c6b' : '#e4e7ea';
  const customStyles = style(borderColor);

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    if (optionsAPI && optionsID !== 0) {
      const apiCall = optionsAPI(optionsID, {cancelToken: source.token})

      apiCall.then((response) => {
        if (!unmounted) {
          setOptions(response.data);
        }
      }).catch(function (error) {
        if (!axios.isCancel(error)) {
          throw error
        }
      })
    } else {
      setOptions([]);
    }

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [optionsID, optionsAPI]);

  const getLabel = (option) => {
    if (includeID) {
      if (includeID === 'back') {
        return (<React.Fragment>{option[labelField]} - ID {option['id']}</React.Fragment>)
      } else {
        return (<React.Fragment>{option['id']} - {option[labelField]}</React.Fragment>)
      }
    } else {
      return option[labelField]
    }
  };

  const getValue = () => {
    if (givenValue) {
      return givenValue[labelField]
    } else if (isMulti) {
      const val = value || initialValue || [];

      const vals =  val.map((v) => {
        if (v.hasOwnProperty(labelField)) {
          return v[labelField]
        } else {
          return ''
        }
      });
      return vals.join(', ');
    } else {
      const val = value || initialValue || [];

      if (val.hasOwnProperty(labelField)) {
        return val[labelField]
      } else {
        return ''
      }
    }
  };

  const changeValue = value =>  {
    setError('');
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <React.Fragment>
      {disabled ?
        <input
          readOnly={disabled}
          value={getValue()}
          {...rest}
          className={'form-control'}
        />
          :
        <Select
          {...rest}
          isMulti={isMulti}
          styles={customStyles}
          ref={forwardedRef}
          defaultValue={value || initialValue || ''}
          value={givenValue || value || initialValue || ''}
          onChange={(value, action) => changeValue(value, action)}
          onBlur={e => {
            setTouched();
            if (onBlur) {
              onBlur(e);
            }
          }}
          options={options}
          isDisabled={disabled}
          placeholder={disabled ? "" : placeholder}
          isClearable={true}
          getOptionLabel={getLabel}
          getOptionValue={(option) => option[valueField]}
        />
      }
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </React.Fragment>
  )
});

FormDependentSelectField.defaultProps = {
  includeID: false
};

export default FormDependentSelectField;
