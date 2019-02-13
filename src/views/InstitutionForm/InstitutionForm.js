import React, { Component } from 'react';


class Institutions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryOptions: []
    }
  }

  render() {
    return(
      <div className="animated fadeIn">
        param: <strong>{this.props.match.params.param}</strong> institutionId: <strong>{this.props.match.params.id}</strong>
      </div>
    )
  }
}

export default Institutions;
