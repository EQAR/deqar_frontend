import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import style from './DataTableHeader.module.css';

class DataTableHeader extends Component {
  onFilterClick = () => {
    this.props.onFilterClick();
  };

  render() {
    const {total, filtered, filterText, filterOpen} = this.props;
    const totalText = filtered.length > 0 ? `${filterText} (filtered): ${total}` : `${filterText} (total): ${total}`;

    return(
      <div className={'pull-right'}>
        <span className={'a'}>
          {totalText}
        </span>
        <span className={style.Separator}>|</span>
        <span className={style.FilterButton}
              onClick={this.onFilterClick}
        >
          {filterOpen ? 'Hide Table Filter' : 'Show Table Filter'}
        </span>
      </div>
    )
  }
}

DataTableHeader.propTypes = {
  storeName: PropTypes.string.isRequired,
  filterText: PropTypes.string.isRequired,
  onFilterClick: PropTypes.func.isRequired
};

const mapStateToProps = (store, ownProps) => {
  const {storeName} = ownProps;

  return {
    total: store[storeName].total,
    filtered: store[storeName].total,
    filterOpen: store[storeName].filterOpen
  }
};

export default connect(mapStateToProps)(DataTableHeader);