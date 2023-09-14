import {asField, BasicText} from "informed";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Autosuggest from 'react-autosuggest';
import style from './FormAutoSuggestField.module.css'
import {Input} from "reactstrap";


const FormAutoSuggestField = asField(({ fieldState, fieldApi, optionsAPI, valueKey, disabled, ...props }) => {
  const [options, setOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const { value } = fieldState;
  const { setValue, setTouched, setError } = fieldApi;

  useEffect(() => {
    let unmounted = false;
    let source = axios.CancelToken.source();

    if (optionsAPI) {
      const apiCall = optionsAPI({cancelToken: source.token});
      apiCall.then((response) => {
        if (!unmounted) {
          setOptions(response.data);
        }
      }).catch(function (error) {
        if (!axios.isCancel(error)) {
          throw error
        }
      });
    }

    return () => {
      unmounted = true;
      source.cancel();
    };
  }, [optionsAPI]);

  const getSuggestions = value => {
    if (value) {
      const inputValue = value.trim().toLowerCase();
      const inputLength = inputValue.length;

      return inputLength === 0 ? [] : options.filter(option =>
        option[valueKey].toLowerCase().slice(0, inputLength) === inputValue
      );
    } else {
      return []
    }
  };

  const getSuggestionValue = suggestion => suggestion[valueKey];

  const onChange = (event, { newValue }) => {
    setValue(newValue)
  };

  const inputProps = {
    placeholder: 'Type the source of the data...',
    value: value ? value : '',
    onChange: onChange
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value))
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  // Use your imagination to render suggestions.
  const renderSuggestion = suggestion => (
    <div>{suggestion[valueKey]}</div>
  );

  const renderInputComponent = inputProps => (
    <Input
      placeholder={disabled ? "" : "placeholder"}
      disabled={disabled}
      {...inputProps}
      className={fieldState.error ? ' form-control is-invalid' : ' form-control'}
    />
  );

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    return (
      <div className={style.SuggestionContainer} {...containerProps}>
        {children}
      </div>
    )
  }

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        renderSuggestionsContainer={renderSuggestionsContainer}
      />
      {fieldState.error ? (
        <small name="scroll-to-element" className="help-block form-text text-danger">{fieldState.error}</small>
      ) : null}
    </>
  )
})

export default FormAutoSuggestField;