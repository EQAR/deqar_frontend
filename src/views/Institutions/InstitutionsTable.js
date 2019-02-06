import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import country from '../../services/Country';


const columnConfig = [
  {
    field: 'deqar_id',
    label: 'DEQARINST ID',
    sortable: true,
    filterable: true,
    minWidth: 80,
    maxWidth: 150
  },
  {
    field: 'eter_id',
    label: 'ETER ID',
    sortable: true,
    filterable: true,
    minWidth: 80,
    maxWidth: 150
  },
  {
    field: 'name_primary',
    label: 'Institution',
    sortable: true,
    filterable: true,
    minWidth: 200,
  },
  {
    field: 'countries',
    label: 'Country',
    sortable: true,
    filterable: true,
    selectable: true,
    minWidth: 150,
    maxWidth: 200
  }
];


class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryOptions: []
    }
  }

  componentDidMount() {
    country.select().then((response) => {
      this.setState({
        countryOptions: this.convertOptions(response.data)
      })
    });
  }

  convertOptions = (countries) => {
    return countries.map(country => ({value: country.id, label: country.name_english}));
  }

  onFetchData = (state) => {
    return institution.getInstitutions(state);
  };

  saveState = (state) => {
    this.props.setInstitutionsTable(state);
  };

  parseResult = (response) => {
    response.forEach(res => res.countries = res.countries.map(country => country.country));
    return response;
  }

  render() {
    const {initialState} = this.props;
    const countryOptions = this.state.countryOptions;

    return (
      <DataTable
        onFetchData={this.onFetchData}
        columnConfig={columnConfig}
        saveState={this.saveState}
        initialState={initialState}
        countryOptions={countryOptions}
        parseResult={this.parseResult}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setInstitutionsTable: state => {
      dispatch(setInstitutionsTable(state))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    initialState: {
      tableType: store.institutionsTable.tableType,
      pageSize: store.institutionsTable.pageSize,
      page: store.institutionsTable.page,
      sorted: store.institutionsTable.sorted,
      filtered: store.institutionsTable.filtered
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(InstitutionsTable);
