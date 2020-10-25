import React, {Component} from 'react';
import {Col, Collapse, FormGroup, Input, Row} from "reactstrap";
import SelectFilter from "../../../components/DataTableFilters/SelectFilter";
import {connect} from "react-redux";
import agency from "../../../services/Agency";
import list from "../../../services/List";

class ReportFlagsTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      report: '',
      agency: undefined,
      agencyOptions: [],
      flag: undefined,
      flagOptions: [
        {value: 2, label: 'low level'},
        {value: 3, label: 'high level'}
      ],
    };
  }

  componentDidMount() {
    this.populateAgency();
    this.setState({
      search: this.getFilterValue('search', 'text'),
      report: this.getFilterValue('report', 'text'),
      flag: this.getFilterValue('flag', 'select'),
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
    const {search, report, agency, agencyOptions, flag, flagOptions} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={search || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'search')}
                  placeholder={'Filter by Flag Message'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'report__agency'}
                  value={agency}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Agency'}
                  selectFilterOptions={agencyOptions}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={report || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'report')}
                  placeholder={'Filter by Report ID'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'flag'}
                  value={flag}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Flag'}
                  selectFilterOptions={flagOptions}
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
      filterOpen: store.reportFlagsTable.filterOpen,
      filtered: store.reportFlagsTable.filtered
    }
  }
};

export default connect(mapStateToProps)(ReportFlagsTableFilters)
