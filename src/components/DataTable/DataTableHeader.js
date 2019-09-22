import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import style from './DataTableHeader.module.css';

const DataTableHeader = ({total, filtered, filterText, filterOpen, ...props}) => {
  const onFilterClick = () => {
    props.onFilterClick();
  };

  const totalText = filtered.length > 0 ? `${filterText} (filtered): ${total}` : `${filterText} (total): ${total}`;

  return(
    <div className={'pull-right'}>
      <span className={'a'}>
        {totalText}
      </span>
      <span className={style.Separator}>|</span>
      <span className={style.FilterButton}
            onClick={onFilterClick}
      >
        {filterOpen ? 'Hide Table Filter' : 'Show Table Filter'}
      </span>
    </div>
  )
};

DataTableHeader.propTypes = {
  storeName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

const mapStateToProps = (store, ownProps) => {
  const {storeName} = ownProps;

  return {
    total: store[storeName].total,
    filtered: store[storeName].filtered,
    filterOpen: store[storeName].filterOpen
  }
};

export default connect(mapStateToProps)(DataTableHeader);