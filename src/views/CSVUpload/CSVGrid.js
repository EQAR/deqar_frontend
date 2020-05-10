import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import LaddaButton, {EXPAND_RIGHT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import style from './CSVGrid.module.css';
import report from '../../services/Report';

class CSVGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  loadingToggle = () => {
    this.setState({
      ...this.state,
      loading: !this.state.loading
    });
  };

  createData = () => {
    const {csvData} = this.props;
    csvData.forEach(function(value, idx){
      csvData[idx]['row_number'] = idx + 1;
    });
    return csvData;
  };

  setRowClass = (params) => {
    const {ingestResponse} = this.props;
    const rowIndex = params.node.rowIndex;
    const response = ingestResponse[rowIndex];

    // If there is already a response object.
    if(response) {
      switch (response.submission_status) {
        case "success":
          return 'bg-success';
        case "errors":
          return 'bg-danger';
        default:
          return "";
      }
    }
  };

  createColumns = () => {
    const {csvHeader} = this.props;
    let columns = [{
      headerName: 'row',
      field: 'row_number',
      resizable: true
    }];
    if(!csvHeader.includes('report_id')) {
      columns.push({
        headerName: 'report_id',
        field: 'report_id',
        resizable: true
      })
    }
    csvHeader.forEach((column) => {
      columns.push({
        headerName: column,
        field: column,
        editable: true,
        resizable: true
      })
    });
    return columns;
  };

  displayResults = (results) => {
    let res = [];
    this.props.afterIngest(results);
    this.gridAPI.forEachNode((node, idx) => {
      const data = results[idx];
      if(data.submission_status === 'success') {
        node.data['report_id'] = data.submitted_report['report_id'];
        res.push(node.data);
      } else {
        res.push(node.data);
      }
    });
    this.gridAPI.setRowData(res);
  };

  onGridReady = (params) => {
    this.gridAPI = params.api;
  };

  onRowDataChanged = (params) => {
    let allColumnIds = [];
    const columnApi = params.columnApi;
    columnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    columnApi.autoSizeColumns(allColumnIds);
  };

  onCellClick = (params) => {
    if(params.rowIndex !== null) {
      const rowIndex = params.rowIndex;
      const columnName = params.column.colDef.headerName;
      this.props.onCellClick(rowIndex, columnName);
    }
  };

  onButtonIngest = () => {
    const csvData = this.gridAPI.getDataAsCsv();
    this.loadingToggle();
    report.submitCSV(csvData).then((response) => {
      this.loadingToggle();
      this.displayResults(response.data);
      toast.success("CSV file is ingested.");
    }).catch((error) => {
      this.loadingToggle();
      toast.error("There was a problem with ingesting.");
    });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Uploaded CSV Data</CardHeader>
          <CardBody className="p-0">
            <div className={style.csvGrid + " ag-theme-balham"}>
              <AgGridReact
                onGridReady={this.onGridReady}
                suppressFieldDotNotation={true}
                columnDefs={this.createColumns()}
                rowData={this.createData()}
                onRowDataChanged={this.onRowDataChanged}
                onCellFocused={this.onCellClick}
                getRowClass={this.setRowClass}
                animateRows
              >
              </AgGridReact>
            </div>
          </CardBody>
          <CardFooter>
            <LaddaButton
              className="btn btn-primary btn-ladda btn-sm"
              loading={this.state.loading}
              onClick={this.onButtonIngest}
              data-color="blue"
              data-style={EXPAND_RIGHT}>
              Ingest
            </LaddaButton>
          </CardFooter>
        </Card>
      </div>
    );
  }
}

CSVGrid.propTypes = {
  csvHeader: PropTypes.array.isRequired,
  csvData: PropTypes.array.isRequired,
  afterIngest: PropTypes.func.isRequired,
  ingestResponse: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default CSVGrid;
