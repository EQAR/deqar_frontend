import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

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
      resized: []
    };
  }

  componentDidMount() {
    const {initialState} = this.props;
    const {page, pageSize, sorted, filtered, expanded, resized} = initialState;
    this.setState({
      page: page,
      pageSize: pageSize,
      sorted: sorted,
      filtered: filtered,
      expanded: expanded,
      resized: resized
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
      if(this._ismounted) {
        this.setState({
          pages: response.data.count,
          data: response.data.results,
          loading: false
        })
      }
    });
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

  render() {
    const { page, pageSize, sorted, filtered, resized, expanded, data, pages, loading } = this.state;

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
        columns={this.makeHeader()}
        className="-striped -highlight"
        SubComponent={this.props.subComponent}
      />
    )
  }
}

DataTable.propTypes = {
  columnConfig: PropTypes.array.isRequired,
  onFetchData: PropTypes.func.isRequired,
  initialState: PropTypes.object,
  saveState: PropTypes.func,
  defaultPageSize: PropTypes.number
};

export default DataTable;