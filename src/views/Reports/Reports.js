import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row
} from "reactstrap";
import ReportsTable from "./ReportsTable";
import style from "./Reports.module.css";
import toggleReportsTableFilter from "./actions/toggleReportsTableFilter";
import DataTableHeader from "../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

class Reports extends Component {
  onFilterClick = () => {
    this.props.toggleReportsTableFilter()
  };

  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Reports
            <DataTableHeader
              storeName={'reportsTable'}
              filterText={'Number of reports'}
              onFilterClick={this.onFilterClick}
            />
          </CardHeader>
          <CardBody className={style.ReportsCardBody}>
            <ReportsTable/>
          </CardBody>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleReportsTableFilter: state => {
      dispatch(toggleReportsTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
