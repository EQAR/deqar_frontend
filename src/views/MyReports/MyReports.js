import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "reactstrap";
import MyReportsTable from "./MyReportsTable";
import style from "./MyReports.module.css";
import {Link} from "react-router-dom";
import DataTableHeader from "../../components/DataTable/DataTableHeader";
import toggleMyReportsTableFilter from "./actions/toggleMyReportsTableFilter";
import {connect} from "react-redux";

const MyReports = (props) => {
  const onFilterClick = () => {
    props.toggleMyReportsTableFilter()
  };

  return(
    <div className="animated fadeIn">
      <Card className={style.MyReportsCard}>
        <CardHeader>
          My Data » My Reports
          <DataTableHeader
            storeName={'myReportsTable'}
            filterText={'Number of reports'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.MyReportsCardBody}>
          <MyReportsTable/>
        </CardBody>
        <CardFooter>
          <div className={'pull-right'}>
            <Link to={{pathname: '/submit-report'}}>
              <Button
                size="sm"
                color="primary"
              >Submit New Report</Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
};

const mapStateToProps = (store) => {
  return {}
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleMyReportsTableFilter: state => {
      dispatch(toggleMyReportsTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyReports);
