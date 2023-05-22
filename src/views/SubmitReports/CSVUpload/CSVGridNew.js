import React, {Component, useEffect, useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import LaddaButton, {EXPAND_RIGHT} from "@zumper/react-ladda";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import style from './CSVGrid.module.css';
import report from '../../../services/Report';
import {useList} from "react-use";

const CSVGridNew = ({csvData, csvHeader, afterIngest, onCellClick}) => {
  const [loading, setLoading] = useState(false)
  const [gridAPI, setGridAPI] = useState(undefined);
  const [gridData, gridDataFunctions] = useList([]);
  const [responseData, responseDataFunctions] = useList([])
  const [ingestStats, setIngestStats] = useState({total: 0, ingested: 0})

  useEffect(() => {
    const data = []
    csvData.forEach(function(value, idx){
      data.push({
        'row_number': idx + 1,
        ...value
      })
    });
    gridDataFunctions.set(data)
    setIngestStats({
      ...ingestStats,
      total: data.length
    })
  }, [csvData]);

  useEffect(() => {
    afterIngest(responseData)
    if (gridAPI) {
      console.log('redraw');
      gridAPI.redrawRows()
    }
  }, [responseData])

  const loadingToggle = () => {
    setLoading(!loading)
  };

  const getRowClass = params => {
    switch (params.data.ingest_status) {
      case "OK":
        return 'bg-success';
      case "NOT OK":
        return 'bg-danger';
      default:
        return "";
    }
  };

  const createColumns = () => {
    let columns = [{
      headerName: 'row',
      field: 'row_number',
      resizable: true
    }];
    if (!csvHeader.includes('ingest_status')) {
      columns.push({
        headerName: 'ingest_status',
        field: 'ingest_status',
        editable: true,
        resizable: true
      })
    }
    if (!csvHeader.includes('report_id')) {
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

  const onGridReady = (params) => {
    setGridAPI(params.api);
  };

  const onRowDataChanged = (params) => {
    let allColumnIds = [];
    const columnApi = params.columnApi;
    columnApi.getAllColumns().forEach(function(column) {
      allColumnIds.push(column.colId);
    });
    columnApi.autoSizeColumns(allColumnIds);
  };

  const handleCellClick = (params) => {
    if (params.rowIndex !== null) {
      const rowIndex = params.rowIndex;
      const columnName = params.column.colDef.headerName;
      onCellClick(rowIndex, columnName);
    }
  };

  const onButtonIngest = () => {
    loadingToggle();

    // Get CSV
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = createColumns().map(column => column['field'])

    const id = toast(`Ingesting (${ingestStats['ingested']} / ${ingestStats['total']})...`, {
      autoClose: false,
    })

    gridAPI.forEachNode((rowNode, index) => {
      if (rowNode.data.ingest_status !== 'OK') {
        // Assemble CSV Data
        const csvData = [
          header.join(','),
          header.map(fieldName => JSON.stringify(rowNode.data[fieldName], replacer)).join(',')
        ].join('\r\n')

        // Submit CSV line by line
        report.submitCSV(csvData).then((response) => {
          // Update toast message
          toast.update(id, {
            render: `Ingesting (${index + 1} / ${ingestStats['total']})...`,
            autoClose: true,
          })

          // Update responseData
          const responseData = response.data[0]
          responseDataFunctions.updateAt(index, responseData);

          // If successful write the report id in the CSV table.
          const rowData = rowNode.data;
          if (responseData.submission_status === 'success') {
            rowData['report_id'] = responseData.submitted_report['report_id'];
            rowData['ingest_status'] = 'OK'
          } else {
            rowData['ingest_status'] = 'NOT OK - ReIngest'
          }
          gridDataFunctions.updateAt(index, rowData);

          // Loading spinner off
          if (index + 1 === gridData.length) {
            setLoading(false)
          }
        }).catch((error) => {
          toast.update(id, {
            render: `Ingesting (${index + 1} / ${ingestStats['total']})... - Error!`,
            autoClose: true,
          })
          // Loading spinner off
          if (index + 1 === gridData.length) {
            setLoading(false)
          }
        });
      }
    });
  };

  return (
    <div className="animated fadeIn">
      <Card>
        <CardHeader>Uploaded CSV Data</CardHeader>
        <CardBody className="p-0">
          <div className={style.csvGrid + " ag-theme-balham"}>
            <AgGridReact
              onGridReady={onGridReady}
              suppressFieldDotNotation={true}
              columnDefs={createColumns()}
              rowData={gridData}
              onRowDataChanged={onRowDataChanged}
              onCellFocused={handleCellClick}
              getRowClass={getRowClass}
              animateRows
            >
            </AgGridReact>
          </div>
        </CardBody>
        <CardFooter>
          <LaddaButton
            className="btn btn-primary btn-ladda btn-sm"
            loading={loading}
            onClick={onButtonIngest}
            data-color="blue"
            data-style={EXPAND_RIGHT}>
            Ingest
          </LaddaButton>
        </CardFooter>
      </Card>
    </div>
  );
}

CSVGridNew.propTypes = {
  csvHeader: PropTypes.array.isRequired,
  csvData: PropTypes.array.isRequired,
  afterIngest: PropTypes.func.isRequired,
  ingestResponse: PropTypes.array.isRequired,
  onCellClick: PropTypes.func.isRequired
};

export default CSVGridNew;
