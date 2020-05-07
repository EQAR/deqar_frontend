import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
} from "reactstrap";
import {Link} from "react-router-dom";

import InstitutionsTable from './InstitutionsTable';
import style from "./Institutions.module.css"
import toggleInstitutionsTableFilter from "./actions/toggleInstitutionsTableFilter";
import DataTableHeader from "../../../components/DataTable/DataTableHeader";
import {connect} from "react-redux";

const Institutions = (props) => {
  const { isAdmin } = props;

  const onFilterClick = () => {
    props.toggleInstitutionsTableFilter()
  };

  return (
    <div className="animated fadeIn">
      <Card className={style.InstitutionsCard}>
        <CardHeader>
          Reference Data » Institutions
          <DataTableHeader
            storeName={'institutionsTable'}
            filterText={'Number of institutions'}
            onFilterClick={onFilterClick}
          />
        </CardHeader>
        <CardBody className={style.InstitutionsCardBody}>
          <InstitutionsTable/>
        </CardBody>
        {isAdmin && (
          <CardFooter>
            <Button
              size="sm"
              color="primary"
              className={'pull-right'}
            >
              <Link
                to={{pathname: '/reference/institutions/create'}}
                className={style.Link}
              >
                Add New Institution
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {isAdmin: state.user.is_admin}
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleInstitutionsTableFilter: state => {
      dispatch(toggleInstitutionsTableFilter())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Institutions);
