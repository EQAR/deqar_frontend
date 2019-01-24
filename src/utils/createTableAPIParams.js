const createTableAPIParams = (tableState) => {
  const {pageSize, page, sorted} = tableState;

  let ordering = [];
  sorted.forEach((sort) => {
    ordering.push(sort.desc ? `-${sort.id}` : sort.id)
  });
  const order = ordering.join(',');

  return {
    limit: pageSize,
    offset: page * pageSize,
    ordering: order
  };
};

export default createTableAPIParams;