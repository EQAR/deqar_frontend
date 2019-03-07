import React, {Component} from 'react';
import {Row} from "reactstrap";
import stats from '../../services/Stats'
import Badge from "./Badge";

const badgesConfig = [
  {key: 'reports_total', className: 'primary', badgeText: 'Reports submitted'},
  {key: 'high_level_flags_total', className: 'danger', badgeText: 'High level flag'},
  {key: 'institutions_total', className: 'success', badgeText: 'Institutions covered'},
  {key: 'programmes_total', className: 'warning', badgeText: 'Programmes mentioned'}
];

class DashboardBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports_total: 0,
      high_level_flags_total: 0,
      institutions_total: 0,
      programmes_total: 0
    }
  }

  componentDidMount() {
    stats.getBadges().then((response) => {
      this.setState({
        reports_total: response.data.reports_total,
        high_level_flags_total: response.data.high_level_flags_total,
        institutions_total: response.data.institutions_total,
        programmes_total: response.data.programmes_total
      })
    })
  }

  render() {
    return(
      <Row>
        {badgesConfig.map((badgeConfig) => {
          return(
            <Badge
              key={badgeConfig['key']}
              style={badgeConfig['className']}
              badgeText={badgeConfig['badgeText']}
              total={this.state[badgeConfig['key']]}
            />
          )
        })}
      </Row>
    )
  }
}

export default DashboardBadge;

