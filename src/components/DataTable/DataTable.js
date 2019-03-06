import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import ActiveDateFilter from "./components/ActiveDateFilter";
import SelectFilter from "./components/SelectFilter";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true,
      page: 0,
      pageSize: 10,
      sorted: [],
      filtered: [],
      expanded: {},
      resized: []
    }
  }

  componentDidMount() {
    const { initialState, columnConfig } = this.props;

    const { page, pageSize, sorted, filtered, expanded, resized } = initialState;
    this.setState({
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
      expanded: expanded,
      resized: resized,
    },
      () => this.fetchData(this.state)
    );

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
    this.setState({
      page: pageIndex
    },() => {
        this.fetchData(this.state);
        this.saveState(this.state);
    });
  };

  onPageSizeChange = (pageSize, pageIndex) => {
    this.setState({
        pageSize: pageSize
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    });
  };

  onSortedChange = (newSorted, column, shiftKey) => {
    this.setState({
        sorted: newSorted
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    });
  };

  onFilteredChange = (filtered, column) => {
    this.setState({
        page: 0,
        filtered: filtered
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    });
  };

  onResizedChange = (newResized, event) => {
    this.setState({
      resized: newResized
    },() => {
      this.saveState(this.state);
    });
  };

  onExpandedChange = (newExpanded, index, event) => {
    this.setState({
      expanded: newExpanded
    },() => {
      this.saveState(this.state);
    });
  };

  onCustomFilterChange = (value, fieldID) => {
    this.setState({
      page: 0,
      filtered: [
        ...this.state.filtered.filter(f => f.id !== fieldID),
        {id: fieldID, value: value}
      ]
    }, () => {
      this.fetchData(this.state);
      this.saveState(this.state);
    })
  };

  onCustomFilterRemove = (fieldID) => {
    this.setState({
      page: 0,
      filtered: [...this.state.filtered.filter(f => f.id !== fieldID)]
    }, () => {
      this.fetchData(this.state);
      this.saveState(this.state);
    });
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
      }
    });
  };

  getPagesNumber = (itemCount) => {
    return Math.floor(itemCount / this.state.pageSize);
  };

  makeHeader = () => {
    const {columnConfig} = this.props;
    const {filtered} = this.state;
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
    const { page, pageSize, sorted, filtered, resized, expanded, data, pages, loading } = this.state;
    const columns = this.makeHeader();

    return(
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
    )
  }
}

DataTable.propTypes = {
  columnConfig: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string,
    label: PropTypes.string,
    sortable: PropTypes.bool,
    filterable: PropTypes.bool,
    filterPlaceholder: PropTypes.string,
    width: PropTypes.number,
    minWidth: PropTypes.number,
    maxWidth: PropTypes.number,
    // Defines the param name which will be passed to the API call.
    filterQueryParam: PropTypes.string,
    // Indicates the type of the filter (if nothing, it should be text).
    filterType: PropTypes.oneOf(['select', 'activeDate']),
    // Defines which object property should be displayed in the select dropdown from the API response.
    selectFilterLabel: PropTypes.string,
    // Defines which object property should act as the selected value and to be passed to the filter API call.
    selectFilterValue: PropTypes.string,
    // Function which gives back a Promise object to populate the select filters.
    selectFilterPopulate: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    // Function which can be used to display the values in the field.
    render: PropTypes.func
  })),
  onFetchData: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  saveState: PropTypes.func,
  subComponent: PropTypes.func
};

export default DataTable;
