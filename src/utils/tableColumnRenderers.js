import React from 'react';
import moment from "moment";
import style from './tableColumnRenderers.module.css';

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

export const dateRender = (row, valid_from_field, valid_to_field) => {
  let valid_from = row.original[valid_from_field];
  let valid_to = row.original[valid_to_field];
  valid_from = moment(valid_from, moment.ISO_8601).format("YYYY-MM-DD");

  if(valid_to) {
    valid_to = moment(valid_to, moment.ISO_8601).format("YYYY-MM-DD");
    return (
      <div className={style.DateColumn}>
        {valid_from}<br/>
        <span className={style.DateText}>to</span><br/>
        {valid_to}
      </div>);
  } else {
    return (
      <div className={style.DateColumn}>
        {valid_from}<br/>
        <span className={style.DateText}>to</span><br/>
        N/A
      </div>);
  }
};

export const createdAtRender = (row) => {
  let {created_at} = row.original;
  const date = moment(created_at, moment.ISO_8601).format("YYYY-MM-DD");
  const time = moment(created_at, moment.ISO_8601).format("HH:mm");
  return (<div className={'text-center'}>{date}<br/>{time}</div>);
};

export const uploadDateRender = (row) => {
  let {date_created} = row.original;
  const date = moment(date_created, moment.ISO_8601).format("YYYY-MM-DD");
  const time = moment(date_created, moment.ISO_8601).format("HH:mm");
  return (<div className={'text-center'}>{date}<br/>{time}</div>);
};
