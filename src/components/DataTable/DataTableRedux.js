import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import ActiveDateFilter from "./components/ActiveDateFilter";
import SelectFilter from "./components/SelectFilter";
import {connect} from "react-redux";

class DataTableRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true,
      total: 0,
      facets: {}
    }
  }

  componentDidMount() {
    const { tableState, columnConfig } = this.props;
    this.fetchData(tableState);

    // Populate selectFilter values and defaults
    columnConfig.forEach((column) => {
      if('selectFilterPopulate' in column) {
        column['selectFilterPopulate'].then((response) => {
          const fieldName = column['field'] + 'SelectOptions';
          this.setState({
            [fieldName]: response.data
          });
        })
      }
    });

    this._ismounted = true;
  }

  // See - https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  componentWillUnmount() {
    this._ismounted = false;
  }

  saveState = (state) => {
    this.props.saveState(state);
  };

  onPageChange = (pageIndex) => {
    const {tableState} = this.props;
    tableState['page'] = pageIndex;
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onPageSizeChange = (pageSize, pageIndex) => {
    const {tableState} = this.props;
    tableState['page'] = 0;
    tableState['pageSize'] = pageSize;
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onSortedChange = (newSorted, column, shiftKey) => {
    const {tableState} = this.props;
    tableState['sorted'] = newSorted;
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onFilteredChange = (filtered, column) => {
    const {tableState} = this.props;
    tableState['page'] = 0;
    tableState['filtered'] = filtered;
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onResizedChange = (newResized, event) => {
    const {tableState} = this.props;
    tableState['resized'] = newResized;
    this.saveState(tableState);
  };

  onExpandedChange = (newExpanded, index, event) => {
    const {tableState} = this.props;
    tableState['expanded'] = newExpanded;
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onCustomFilterChange = (value, fieldID) => {
    const {tableState} = this.props;
    tableState['page'] = 0;
    tableState['filtered'] = [
      ...tableState.filtered.filter(f => f.id !== fieldID),
      {id: fieldID, value: value}
    ];
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  onCustomFilterRemove = (fieldID) => {
    const {tableState} = this.props;
    tableState['page'] = 0;
    tableState['filtered'] = [
      [...tableState.filtered.filter(f => f.id !== fieldID)]
    ];
    this.fetchData(tableState);
    this.saveState(tableState);
  };

  setTotal = (total) => {
    const {tableState} = this.props;
    tableState['total'] = total;
    this.saveState(tableState);
  };

  fetchData = (state) => {
    this.setState({ loading: true });
    this.props.onFetchData(state).then((response) => {
      if (this._ismounted) {
        this.setState({
          pages: this.getPagesNumber(response.data.count),
          data: response.data.results,
          loading: false
        });
        this.setTotal(response.data.count);
        if('facets' in response.data) {
          if('facet_fields' in response.data.facets) {
            this.setState({
              facets: response.data.facets['facet_fields']
            })
          }
        }
      }
    });
  };

  getPagesNumber = (itemCount) => {
    const {tableState} = this.props;
    const {pageSize} = tableState;
    return Math.floor(itemCount / pageSize) + 1;
  };

  makeHeader = () => {
    const {columnConfig, tableState} = this.props;
    const {filtered} = tableState;
    let header = [];

    columnConfig.forEach((column) => {
      let columnConfig = {};

      columnConfig['Header'] = column.label;
      columnConfig['sortable'] = column.sortable;
      columnConfig['filterable'] = column.filterable;
      columnConfig['resizable'] = column.resizable;
      columnConfig['accessor'] = column.field;
      columnConfig['width'] = column.width;
      columnConfig['minWidth'] = column.minWidth;
      columnConfig['maxWidth'] = column.maxWidth;

      if(column.filterType) {
        switch(column.filterType) {
          case 'select':
            const optionFieldName = column.field + 'SelectOptions';
            const selectFilterOptions = this.state[optionFieldName];

            columnConfig['Filter'] =
              <SelectFilter
                filtered={filtered}
                columnConfig={column}
                onFilterChange={this.onCustomFilterChange}
                onFilterRemove={this.onCustomFilterRemove}
                selectFilterOptions={selectFilterOptions}
              />;
            break;
          case 'activeDate':
            columnConfig['Filter'] =
              <ActiveDateFilter
                filtered={filtered}
                columnConfig={column}
                onFilterChange={this.onCustomFilterChange}
              />;
            break;
          default:
            columnConfig['Filter'] = ({filter, onChange}) => (
              <input type='text'
                     style={{width: '100%'}}
                     placeholder={column.filterPlaceholder}
                     value={filter ? filter.value : ''}
                     onChange={event => onChange(event.target.value)}
              />
            );
            break;
        }
      }

      if ('render' in column) {
        columnConfig['Cell'] = column.render;
      }

      if ('style' in column) {
        columnConfig['style'] = column.style;
      }

      header.push(columnConfig);
    });
    return header;
  };

  setOverFlow = () => {
    return {
      style: { overflow: 'visible' }
    };
  };

  render() {
    const { tableState, filterable } = this.props;
    const { page, pageSize, total, sorted, filtered, resized, expanded } = tableState;

    const { data, pages, loading, facets } = this.state;
    const columns = this.makeHeader();

    return(
      <React.Fragment>
        { filterable ?
          React.cloneElement(this.props.children, {
            onFilter: this.onFilteredChange,
            facets: facets,
            total: total,
          }) : null
        }
        <ReactTable
          manual
          data={data}
          pages={pages}
          page={page}
          onPageChange={this.onPageChange}
          pageSize={pageSize}
          onPageSizeChange={this.onPageSizeChange}
          sorted={sorted}
          onSortedChange={this.onSortedChange}
          filtered={filtered}
          onFilteredChange={this.onFilteredChange}
          resized={resized}
          onResizedChange={this.onResizedChange}
          expanded={expanded}
          onExpandedChange={this.onExpandedChange}
          loading={loading}
          columns={columns}
          className="-striped -highlight"
          getTheadFilterThProps={this.setOverFlow}
          SubComponent={this.props.subComponent}
          getTdProps={() => ({
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }
          })}
        />
      </React.Fragment>
    )
  }
}

DataTableRedux.propTypes = {
  columnConfig: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string,
    sortable: PropTypes.bool,
    width: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    render: PropTypes.func
  })),
  filterable: PropTypes.bool.isRequired,
  storeName: PropTypes.string.isRequired,
  onFetchData: PropTypes.func.isRequired,
  saveState: PropTypes.func,
  subComponent: PropTypes.func
};

const mapStateToProps = (store, ownProps) => {
  const {storeName} = ownProps;

  return {
    tableState: {
      page: store[storeName].page,
      pageSize: store[storeName].pageSize,
      total: store[storeName].total,
      sorted: store[storeName].sorted,
      filtered: store[storeName].filtered,
      expanded: store[storeName].expanded,
      resized: store[storeName].resized
    }
  }
};

export default connect(mapStateToProps)(DataTableRedux);
