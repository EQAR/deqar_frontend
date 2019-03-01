import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import report from "../../services/Report";
import {connect} from "react-redux";
import setMyReportsTable from "./actions/setMyReportsTable";
import agency from "../../services/Agency";
import country from "../../services/Country";
import list from "../../services/List";
import createTableAPIParams from "../../utils/createTableAPIParams";
import {dateRender, flagRender, uploadDateRender} from "../../utils/tableColumnRenderers";

class MyReportsTable extends Component {
  constructor(props) {
    super(props);

    this.columnConfig = [
      {
        field: 'date_created',
        label: 'Uploaded',
        render: uploadDateRender,
        width: 150,
        resizable: false,
        sortable: true,
        filterable: true,
        filterQueryParam: 'year_created',
      }, {
        field: 'institution_programme_primary',
        label: 'Institution : Programme',
        sortable: true,
        sortQueryParam: 'institution_programme_sort',
        filterable: true,
        filterQueryParam: 'query',
        style:{ 'white-space': 'unset'}
      }, {
        field: 'country',
        label: 'Country',
        width: 150,
        resizable: false,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'country',
        selectFilterValue: 'name_english',
        selectFilterLabel: 'name_english',
        selectFilterPopulate: country.select()
      }, {
        field: 'activity',
        label: 'Activity',
        width: 150,
        resizable: true,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'activity_type',
        selectFilterValue: 'type',
        selectFilterLabel: 'type',
        selectFilterPopulate: agency.selectActivityType(),
        style:{ 'white-space': 'unset'}
      }, {
        field: 'date',
        label: 'Date',
        render: dateRender,
        width: 200,
        sortable: true,
        sortQueryParam: 'valid_from',
        filterable: true,
        filterType: 'activeDate',
        filterQueryParam: 'year',
        style:{ 'white-space': 'unset'}
      }, {
        field: 'flag_level',
        label: 'Flag',
        render: flagRender,
        width: 150,
        sortable: true,
        filterable: true,
        filterType: 'select',
        filterQueryParam: 'flag',
        selectFilterValue: 'flag',
        selectFilterLabel: 'flag',
        selectFilterPopulate: list.selectFlags()
      }
    ];
  }

  onFetchData = (state) => {
    const params = createTableAPIParams(state, this.columnConfig);
    return report.getMyReports(params);
  };

  saveState = (state) => {
    this.props.setMyReportsTable(state);
  };

  render() {
    const {initialState} = this.props;

    return (
      <DataTable
        onFetchData={this.onFetchData}
        columnConfig={this.columnConfig}
        saveState={this.saveState}
        initialState={initialState}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMyReportsTable: state => {
      dispatch(setMyReportsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      pageSize: store.myReportsTable.pageSize,
      page: store.myReportsTable.page,
      sorted: store.myReportsTable.sorted,
      filtered: store.myReportsTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReportsTable);
