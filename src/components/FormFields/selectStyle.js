export const style = (borderColor) => {
  return {
    container: (provided) => ({
      ...provided,
      '&:focus': {
        borderColor: 'none'
      },
    }),
    control: (provided, state) => ({
      ...provided,
      '&:hover': {
        borderColor: 'none'
      },
      border: state.isDisabled ? 'unset' : `1px solid ${borderColor}`,
      backgroundColor: state.isDisabled ? '#FCFCFC' : '#FFFFFF'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#5c6873' : "#5C685C",
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#5c6873' : "#5C685C",
    }),
    option: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overFlow: 'hidden',
      textOverFlow: 'ellipsis'
    }),
    indicatorsContainer: (provided, state) => ({
      display: state.isDisabled ? 'none' : 'flex'
    })
  }
}
