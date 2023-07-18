import React, { Component } from 'react';
import {Col, Row} from "reactstrap";
import CSVInfo from "./CSVInfo";
import FileUpload from "./FileUpload";
import IngestInfo from "./IngestInfo";
import cx from 'classnames';
import style from './CSVUpload.module.css';
import CSVGridNew from "./CSVGridNew";

class CSVUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvHeader: [],
      csvData: [],
      ingestResponse: [],
      step: 1,
      clickedRowIndex: 0,
    }
  }

  saveCSVData = (header, data) => {
    this.setState({
      csvHeader: header,
      csvData: data,
      ingestResponse: [],
      step: 2,
      clickedRowIndex: 0,
    });
  };

  afterIngest = (response) => {
    this.setState({
      ingestResponse: response,
      step: 3
    });
  };

  onCellClick = (rowIndex, columnName) => {
    this.setState({
      clickedRowIndex: rowIndex,
    })
  };

  displayCSVGrid = () => {
    const {csvHeader, csvData, ingestResponse} = this.state;
    if(csvHeader.length > 0) {
      return (
        <Col md={12}>
          <CSVGridNew
            csvHeader={csvHeader}
            csvData={csvData}
            afterIngest={this.afterIngest}
            ingestResponse={ingestResponse}
            onCellClick={this.onCellClick}
          />
        </Col>
      )
    } else {
        return null;
    }
  };

  displayErrorInfo = () => {
    const {clickedRowIndex, ingestResponse} = this.state;
    if(ingestResponse.length > 0) {
      return (
        <Col md={12}>
          <IngestInfo
            clickedRowIndex={clickedRowIndex}
            ingestResponse={ingestResponse}
          />
        </Col>
      )
    }
  };

  render() {
    const {step} = this.state;

    return (
      <div className={cx(style.CSVUpload, 'animated fadeIn')}>
        <Row>
          <Col md={4} xs={12}>
            <FileUpload handleReadCSV={this.saveCSVData} />
          </Col>
          <Col md={8} xs={12}>
            <CSVInfo step={step} />
          </Col>
        </Row>
        <Row>
          {this.displayErrorInfo()}
          {this.displayCSVGrid()}
        </Row>
      </div>
    );
  }
}

export default CSVUpload;