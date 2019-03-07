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
    return (
      <div className="animated fadeIn">
        <Card>
          <CardHeader>Upload CSV</CardHeader>
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
