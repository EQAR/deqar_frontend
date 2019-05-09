import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
} from "reactstrap";
import InstitutionsTable from './InstitutionsTable';
import style from "./Institutions.module.css"
import toggleInstitutionsTableFilter from "./actions/toggleInstitutionsTableFilter";
import DataTableHeader from "../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

class Institutions extends Component {
  onFilterClick = () => {
    this.props.toggleInstitutionsTableFilter()
  };

  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardHeader>
            Institutions
            <DataTableHeader
              storeName={'institutionsTable'}
              filterText={'Number of institutions'}
              onFilterClick={this.onFilterClick}
            />
          </CardHeader>
          <CardBody className={style.InstitutionsCardBody}>
            <InstitutionsTable/>
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
    toggleInstitutionsTableFilter: state => {
      dispatch(toggleInstitutionsTableFilter())
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Institutions);
