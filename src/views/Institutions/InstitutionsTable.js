import React, { Component } from 'react';
import DataTable from "../../components/DataTable/DataTable";
import institution from "../../services/Institution";
import { connect } from "react-redux";
import setInstitutionsTable from "./actions/setInstitutionsTable";
import country from '../../services/Country';
import {
  Button,
  Col,
  Row
} from 'reactstrap';
import { Link } from 'react-router-dom'


class InstitutionsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryOptions: []
    }

    this.columnConfig = [
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
        minWidth: 150,
      },
      {
        field: 'countries',
        label: 'Country',
        sortable: true,
        filterable: true,
        selectable: true,
        minWidth: 100,
        maxWidth: 200
      },
      {
        render: this.buttonRender,
        width: 102
      }
    ];
  }

  componentDidMount() {
    country.getInstitutionCountries().then((response) => {
      this.setState({
        countryOptions: this.convertOptions(response.data)
      })
    });
  }

  buttonRender = (row) => {
    return (
      <Row>
        <Col xs="3">
          <Link to={{pathname: `/institution/view/${row.original.id}`}}>
            <Button
              size="sm"
              color="primary"
              id="add-button">View</Button>
          </Link>
        </Col>
        <Col xs={{size: 3, offset: 2 }}>
          <Link to={{pathname: `/institution/edit/${row.original.id}`}}>
            <Button
              size="sm"
              color="primary"
              id="add-button">Edit</Button>
          </Link>
        </Col>
      </Row>
    );
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
        columnConfig={this.columnConfig}
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
