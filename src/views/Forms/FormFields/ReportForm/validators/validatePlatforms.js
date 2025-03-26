
const validatePlatforms = (value, values) => {
  let institutions = values.institutions;
  let platforms = values.platforms;

  if (platforms) {
    const match = platforms.filter(p => institutions.some(i => p.id === i.id))
    if (match.length > 0) {
      return "You cannot select the same institution as platform!"
    }
  }
};

export default validatePlatforms;
