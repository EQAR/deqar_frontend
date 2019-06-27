import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import ReportsTable from "./ReportsTable";
import style from "./Reports.module.css";
import toggleReportsTableFilter from "./actions/toggleReportsTableFilter";
import DataTableHeader from "../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

const Reports = (props) => {
  const onFilterClick = () => {
    props.toggleReportsTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card>
        <CardHeader>
          Reports
          <DataTableHeader
            storeName={'reportsTable'}
            filterText={'Number of reports'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.ReportsCardBody}>
          <ReportsTable/>
        </CardBody>
      </Card>
    </div>
  )
};

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
