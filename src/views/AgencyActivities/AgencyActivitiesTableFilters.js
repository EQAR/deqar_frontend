import React, {Component} from 'react';
import {Col, Collapse, FormGroup, Input, Row} from "reactstrap";
import SelectFilter from "../../components/DataTableFilters/SelectFilter";
import {connect} from "react-redux";
import agency from "../../services/Agency";

class AgencyActivitiesTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agency: undefined,
      activity_type: undefined,
      activity_id: '',
      agencyOptions: [],
      activityTypeOptions: []
    };
  }

  componentDidMount() {
    this.populateAgency();
    this.populateActivityType();
    this.setState({
      agency: this.getFilterValue('agency', 'select'),
      activity_type: this.getFilterValue('activity_type', 'select'),
      activity_id: this.getFilterValue('activity_id', 'text'),
    });
  }

  // Populate selects
  populateAgency = () => {
    agency.selectAllAgencies().then((response) => {
      const options = response.data.map(r => {
        return {label: r.acronym_primary, value: r.id}
      });
      this.setState({
        agencyOptions: options
      })
    })
  };

  populateActivityType = () => {
    agency.selectActivityType().then((response) => {
      const options = response.data.map(r => {
        return {label: r.type, value: r.id}
      });
      this.setState({
        activityTypeOptions: options
      })
    })
  };

  getFilterValue = (field, fieldType) => {
    const {filterState} = this.props;
    const {filtered} = filterState;
    const filter = filtered.filter(f => f.id === field);

    if(filter.length > 0) {
      if(fieldType === 'select') {
        return {value: filter[0].value, label: filter[0].value}
      } else {
        return filter[0].value;
      }
    }
  };

  onFilterChange = (value, field) => {
    this.setState({
      [field]: value
    }, () => this.onFilter());
  };

  onFilterRemove = (field) => {
    this.setState({
      [field]: ''
    }, () => this.onFilter());
  };

  onFilter = () => {
    let filtered = [];
    Object.keys(this.state).forEach((key) => {
      if(this.state[key]) {
        if (typeof this.state[key] === 'object') {
          filtered.push({id: key, value: this.state[key]['value']})
        } else {
          filtered.push({id: key, value: this.state[key]})
        }
      }
    });
    this.props.onFilter(filtered);
  };

  render() {
    const {filterState} = this.props;
    const {filterOpen} = filterState;
    const {agency, activity_type, activity_id, agencyOptions, activityTypeOptions} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={2}>
              <FormGroup>
                <Input
                  value={activity_id || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'activity_id')}
                  placeholder={'Filter by Activity ID'}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <SelectFilter
                  field={'agency'}
                  value={agency}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Agency'}
                  selectFilterOptions={agencyOptions}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <SelectFilter
                  field={'activity_type'}
                  value={activity_type}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Activity Type'}
                  selectFilterOptions={activityTypeOptions}
                />
              </FormGroup>
            </Col>
          </Row>
        </Collapse>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    filterState: {
      filterOpen: store.agencyActivitiesTable.filterOpen,
      filtered: store.agencyActivitiesTable.filtered
    }
  }
};

export default connect(mapStateToProps)(AgencyActivitiesTableFilters)