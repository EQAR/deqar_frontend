import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import ReportFlagsTable from "./ReportFlagsTable";
import style from "./ReportFlags.module.css";
import toggleReportFlagsTableFilter from "./actions/toggleReportFlagsTableFilter";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

const ReportTableFlags = (props) => {
  const onFilterClick = () => {
    props.toggleReportFlagsTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card className={style.ReportsCard}>
        <CardHeader>
          Flags » Reports
          <DataTableHeader
            storeName={'reportFlagsTable'}
            filterText={'Number of report flags'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.ReportsCardBody}>
          <ReportFlagsTable/>
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
    toggleReportFlagsTableFilter: state => {
      dispatch(toggleReportFlagsTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportTableFlags);
