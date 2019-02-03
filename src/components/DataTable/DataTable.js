import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

import style from './DataTable.module.css';

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
      tableType: '',
      countryOptions: [],
      country: null
    };
  }

  componentDidMount() {
    const { initialState } = this.props;
    const { page, pageSize, sorted, filtered, expanded, resized, tableType } = initialState;
    this.setState({
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
      expanded: expanded,
      resized: resized,
      tableType: tableType,
      selectedOption: null,
    },
      () => this.fetchData(this.state)
    );
    this._ismounted = true;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      countryOptions: nextProps.countryOptions
    })

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
    })
  };

  onPageSizeChange = (pageSize, pageIndex) => {
    this.setState({
        pageSize: pageSize
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    })
  };

  onSortedChange = (newSorted, column, shiftKey) => {
    this.setState({
        sorted: newSorted
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    })
  };

  onFilteredChange = (filtered, column) => {
    this.setState({
        filtered: filtered
      },() => {
      this.fetchData(this.state);
      this.saveState(this.state);
    })
  };

  onResizedChange = (newResized, event) => {
    this.setState({
      resized: newResized
    },() => {
      this.saveState(this.state);
    })
  };

  onExpandedChange = (newExpanded, index, event) => {
    this.setState({
      expanded: newExpanded
    },() => {
      this.saveState(this.state);
    })
  };

  fetchData = (state) => {
    this.setState({ loading: true });
    this.props.onFetchData(state).then((response) => {
      if (this._ismounted) {
        this.setState({
          pages: response.data.count,
          data: this.parseResult(response.data.results, state.tableType),
          loading: false
        })
      }
    });
  };

  parseResult = (response, tableType) => {
    if (tableType === 'institution') {
      response.forEach(res => res.countries = res.countries.map(country => country.country));
    }
    return response;
  }

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
      columnConfig['Filter'] = column.selectable ? this.getSelect : null;

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

  getSelect = (filter) => {
    return (
      <div className={style.selectFilter}>
        <select
          onChange={event => this.handleChange(event.target.value)}
          style={{ width: "100%", background: 'transparent', border: 'none'}}
          value={filter ? filter.value : "empty"}
        >
          <option value="empty">select a country</option>
          {this.state.countryOptions.map((country, index) => <option key={index} value={country.value}>{country.label}</option>)}
        </select>
      </div>
    )
  }

  handleChange = (selectedOption) => {
    this.setState({
      filtered: [...this.state.filtered.filter(f => f.id !== 'country'), {id: 'country', value: selectedOption}]
    }, () => {
      this.fetchData(this.state);
      this.saveState(this.state);
    })
  }

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
  defaultPageSize: PropTypes.number
};

export default DataTable;
