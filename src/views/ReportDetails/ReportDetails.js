import React, { Component } from 'react';


class ReportDetails extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        param: <strong>{this.props.match.params.param}</strong> reportID: <strong>{this.props.match.params.id}</strong>
      </div>
    )
  }
}

export default ReportDetails;
