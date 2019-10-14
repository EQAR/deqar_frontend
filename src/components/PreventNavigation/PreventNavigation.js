import React from 'react';
import { Prompt } from 'react-router-dom';


const PreventNavigation = ({formState, isSubmit}) => {
  const isBlocking = Object.keys(formState.touched).length > 0 && !isSubmit ? true : false;

  return (
    <Prompt
      when={isBlocking}
      message="Are you sure you want to leave? Changes that you made may not be saved."
    />
  )
}

export default PreventNavigation
