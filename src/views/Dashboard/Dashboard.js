import React, { Component } from 'react';
import ReportTable from "./ReportTable";
import {Card, CardBody} from "reactstrap";
import DashboardBadge from "./DashboardBadge";

class Dashboard extends Component {
  render() {
    return(
      <div className="animated fadeIn">
        <Card>
          <CardBody>
            <DashboardBadge/>
            <ReportTable/>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Dashboard;