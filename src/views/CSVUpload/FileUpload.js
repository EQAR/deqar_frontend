import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label
} from 'reactstrap';
import { CSVReader } from 'react-papaparse';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleReadCSV = (data) => {
    toast.success("CSV file was successfully read");
    this.props.handleReadCSV(data.meta.fields, data.data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    toast.error("There were problems reading the CSV file.");
  };

  handleImportOffer = () => {
    this.fileInput.current.click();
  };

  render() {
    const url = 'https://docs.deqar.eu/data_submission/#csv-upload';

    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Upload CSV
            <div className="card-header-actions">
              <a className="card-header-action btn btn-close" href={url} target={'blank'} title="Documentation">
                <i className="icon-question"> </i>
              </a>
            </div>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <div>
                  <Label>Select your CSV file</Label>
                </div>
                <div>
                  <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                    configOptions={{ header: true }}
                  />
                  <button onClick={this.handleImportOffer}>Choose CSV file</button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

FileUpload.propTypes = {
  handleReadCSV: PropTypes.func.isRequired
};

export default FileUpload;
