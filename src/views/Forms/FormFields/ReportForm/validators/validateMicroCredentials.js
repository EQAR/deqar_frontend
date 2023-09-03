const validateMicroCredentials = (value, values) => {
  const programmes = values['programmes']

  if (programmes) {
    const noFullDegreeProgrammes = programmes.filter(
      i => i.hasOwnProperty('degree_outcome') && i['degree_outcome']['id'] === 2
    )
    if (noFullDegreeProgrammes.length > 0) {
      if (!value) {
        return 'If at least one programme has degree outcome set as \'2 - No full degree\', the ' +
               'report should have \'Micro credentials covered\' set as true.'
      }
    }
  }
}

export default validateMicroCredentials;