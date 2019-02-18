const createTableAPIParams = (tableState, tableColumnConfig) => {
  const {pageSize, page, sorted, filtered} = tableState;
  let params = {};

  // If there is a sortQueryParam, change the request parameter here
  let ordering = [];
  sorted.forEach((sort) => {
    const cc = tableColumnConfig.find(c => c.field === sort.id);
    if(cc && 'sortQueryParam' in cc) {
      ordering.push(sort.desc ? `-${cc['sortQueryParam']}` : cc['sortQueryParam'])
    } else {
      ordering.push(sort.desc ? `-${sort.id}` : sort.id)
    }
  });

  params = {
    limit: pageSize,
    offset: page * pageSize,
    ordering: ordering.join(', ')
  };

  // If there is a filterQueryParam, change the request parameter here
  filtered.forEach(f => {
    const cc = tableColumnConfig.find(c => c.field === f.id);
    if(cc && 'filterQueryParam' in cc) {
      params = {...params, ...{[cc['filterQueryParam']]: f.value}}
    } else {
      params = {...params, ...{[f.id]: f.value}}
    }
  });

  return params;
};

export default createTableAPIParams;
