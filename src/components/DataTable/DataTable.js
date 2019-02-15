import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import style from './DataTable.module.css';
import Select from "react-select";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pages: null,
      loading: true,
      page: 0,
      pageSize: 20,
      sorted: [],
      filtered: [],
      expanded: {},
      resized: [],
      tableType: ''
    }
  }

  componentDidMount() {
    const { initialState } = this.props;
    const { page, pageSize, sorted, filtered, expanded, resized } = initialState;
    this.setState({
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
      expanded: expanded,
      resized: resized,
      selectedOption: null,
    },
      () => this.fetchData(this.state)
    );
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

  fetchData = (state) => {
    this.setState({ loading: true });
    this.props.onFetchData(state).then((response) => {
      if (this._ismounted) {
        this.setState({
          pages: this.getPagesNumber(response.data.count),
          data: this.props.parseResult(response.data.results),
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
    let header = [];
    columnConfig.forEach((column) => {
      let columnConfig = {};

      columnConfig['Header'] = column.label;
      columnConfig['sortable'] = column.sortable;
      columnConfig['filterable'] = column.filterable;
      columnConfig['accessor'] = column.field;
      columnConfig['width'] = column.width;
      columnConfig['width'] = column.width;
      columnConfig['minWidth'] = column.minWidth;
      columnConfig['maxWidth'] = column.maxWidth;
      columnConfig['Filter'] = column.selectFilter ?
          this.getSelect(column.filterParam, column.selectFilterLabel, column.selectFilterOptions) : null;

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

  getSelect = (filterParam, filterLabel, filterOptions) => {
    const customStyles = {
      container: (provided, state) => ({
        ...provided,
        '&:focus': {
          borderColor: 'none'
        }
      }),
      control: (provided, state) => ({
        ...provided,
        borderColor: 'rgba(0,0,0,0.1)',
        boxShadow: null,
        maxHeight: '29px',
        minHeight: '25px',
        '&:hover': {
          borderColor: 'none'
        },
        '&:focus': {
          borderColor: 'none'
        }
      }),
      input: (provided, state) => ({
        ...provided,
        '&:focus': {
          borderColor: 'none'
        }
      }),
      menu: (provided, state) => ({
        ...provided,
        textAlign: 'left'
      }),
    };

    return (
      <div className={style.selectFilter}>
        <Select
           styles={customStyles}
           options={filterOptions}
           isClearable={true}
           getOptionLabel={(option) => {return option[filterLabel]}}
           getOptionValue={(option) => {return option.id}}
           onChange={(value, props) => this.handleChange(filterParam, value, props)}
        />
      </div>
    )
  };

  handleChange = (filterParam, value, props) => {
    switch(props.action) {
      case 'select-option':
        this.setState({
          filtered: [...this.state.filtered.filter(f => f.id !== filterParam), {id: filterParam, value: value['id']}]
        }, () => {
          this.fetchData(this.state);
          this.saveState(this.state);
        });
        break;
      case 'clear':
        this.setState({
          filtered: [...this.state.filtered.filter(f => f.id !== filterParam)]
        }, () => {
          this.fetchData(this.state);
          this.saveState(this.state);
        });
        break;
      default:
        return null;
    }
  };

  setOverFlow = () => {
    return {
      style: { overflow: 'visible' }
    };
  };

  render() {
    const { page, pageSize, sorted, filtered, resized, expanded, data, pages, loading, filterable } = this.state;

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
        filterable={filterable}
        filtered={filtered}
        onFilteredChange={this.onFilteredChange}
        resized={resized}
        onResizedChange={this.onResizedChange}
        expanded={expanded}
        onExpandedChange={this.onExpandedChange}
        loading={loading}
        columns={this.makeHeader()}
        className="-striped -highlight"
        getTheadFilterThProps={this.setOverFlow}
        SubComponent={this.props.subComponent}
      />
    )
  }
}

DataTable.propTypes = {
  columnConfig: PropTypes.array.isRequired,
  countryOptions: PropTypes.array,
  onFetchData: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  saveState: PropTypes.func,
  parseResult: PropTypes.func,
  defaultPageSize: PropTypes.number
};

export default DataTable;
