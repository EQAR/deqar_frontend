import React from 'react';
import { Prompt } from 'react-router-dom';


const PreventNavigation = ({formState, isSubmitted}) => {
  const isBlocked = Object.keys(formState.touched).length > 0 && !isSubmitted ? true : false;

  return (
    <Prompt
      when={isBlocked}
      message="Are you sure you want to leave? Changes that you made may not be saved."
    />
  )
};

export default PreventNavigation
