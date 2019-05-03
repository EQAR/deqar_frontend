import React from 'react';
import moment from "moment";

export const flagRender = (row) => {
  let className = '';
  switch(row.value) {
    case 'none':
      className = 'badge badge-success';
      break;
    case 'low level':
      className = 'badge badge-warning';
      break;
    case 'high level':
      className = 'badge badge-danger';
      break;
    default:
      return null;
  }
  return(<div className={'text-center'}><span className={className}>{row.value}</span></div>);
};

export const arrayRenderer = (row) => {
  if(row.value) {
    return row.value.join('; ');
  } else {
    return null;
  }
};

export const dateRender = (row) => {
  let {valid_from, valid_to} = row.original;
  valid_from = moment(valid_from, moment.ISO_8601).format("YYYY-MM-DD");

  if(valid_to) {
    valid_to = moment(valid_to, moment.ISO_8601).format("YYYY-MM-DD");
    return (<div className={'text-center'}>{valid_from}<br/>{valid_to}</div>);
  } else {
    return (<div className={'text-center'}>{valid_from}</div>);
  }
};

export const uploadDateRender = (row) => {
  let {date_created} = row.original;
  const date = moment(date_created, moment.ISO_8601).format("YYYY-MM-DD");
  const time = moment(date_created, moment.ISO_8601).format("HH:mm");
  return (<div className={'text-center'}>{date}<br/>{time}</div>);
};