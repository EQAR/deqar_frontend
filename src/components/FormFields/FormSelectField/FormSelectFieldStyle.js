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
      height: '35px',
      minHeight: '35px',
      border: state.isDisabled ? 'unset' : `1px solid ${borderColor}`,
      backgroundColor: state.isDisabled ? '#FCFCFC' : '#FFFFFF'
    }),
    singleValue: (provided, state) => ({
      ...provided,
      top: '46%',
      color: state.isDisabled ? '#5c6873' : "#5C685C",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      top: '46%',
    }),
    multiValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? '#5c6873' : "#5C685C",
    }),
    option: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
      overFlow: 'hidden',
      textOverFlow: 'ellipsis',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 999
    }),
    indicatorsContainer: (provided, state) => ({
      display: state.isDisabled ? 'none' : 'flex'
    })
  }
}
