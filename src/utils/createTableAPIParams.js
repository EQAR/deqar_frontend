const createTableAPIParams = (tableState) => {
  const {pageSize, page, sorted, filtered} = tableState;
  let params = {};

  const order = sorted.map((sort) => sort.desc ? `-${sort.id}` : sort.id).join(',');

  params = {
    limit: pageSize,
    offset: page * pageSize,
    ordering: order
  }

  filtered.forEach(f => {
    if (f.value !== 'empty') {
      params = f.id === 'deqar_id' || f.id === 'eter_id' || (f.id === 'country' && f.value !== 'empty') ?
        {...params, ...{[f.id]: f.value}} :
        {...params, query: f.value}
      }
    });

    return params;
};

export default createTableAPIParams;
