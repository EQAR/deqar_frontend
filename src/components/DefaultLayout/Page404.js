import React from 'react';
import style from './Page404.module.css';
import cx from "classnames";

const Page404 = (props) => {
  return (
    <div className={cx(style.Page404, 'animated fadeIn')}>
      <h1>404</h1>
      <p>Ooops! The page that you are looking for doesn't exist.</p>
    </div>
  )
};

export default Page404