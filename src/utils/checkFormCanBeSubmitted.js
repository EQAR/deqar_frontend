export const checkFormCanBeSubmitted = (formState) => {
  if(Object.keys(formState.errors).length !== 0 || Object.keys(formState.touched).length === 0) {
    return true;
  }
};