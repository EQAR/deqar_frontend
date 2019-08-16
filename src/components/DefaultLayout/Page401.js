import React from 'react';
import style from './Page401.module.css';
import cx from "classnames";

const Page401 = (props) => {
  return (
    <div className={cx(style.Page401, 'animated fadeIn')}>
      <h1>401</h1>
      <p>Ooops! You don't have the necessary rights to use this page.</p>
    </div>
  )
};

export default Page401