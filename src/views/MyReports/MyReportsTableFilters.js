import React, {Component} from 'react';
import {Col, Collapse, FormGroup, Input, Row} from "reactstrap";
import SelectFilter from "../../components/DataTableFilters/SelectFilter";
import ActiveDateFilter from "../../components/DataTableFilters/ActiveDateFilter";
import {connect} from "react-redux";

class MyReportsTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      id: '',
      country: undefined,
      agency: undefined,
      activity: undefined,
      flag: undefined,
      year: '',
      active: false
    };
  }

  componentDidMount() {
    this.setState({
      query: this.getFilterValue('query', 'text'),
      id: this.getFilterValue('id', 'text'),
      country: this.getFilterValue('country', 'select'),
      agency: this.getFilterValue('agency', 'select'),
      activity: this.getFilterValue('activity', 'select'),
      flag: this.getFilterValue('flag', 'select'),
      year: this.getFilterValue('year', 'text'),
      active: this.getFilterValue('active', 'boolean')
    });
  }

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

  getSelectFilterOptions = (field) => {
    const { facets } = this.props;
    if (field in facets) {
      const values = facets[field].filter(function(element, index, array) {
        return (index % 2 === 0);
      });
      return values.map(v => {
        return { value: v, label: v}
      });
    } else {
      return []
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
    const {query, id, country, agency, activity, flag, year, active} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input
                  value={query || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'query')}
                  placeholder={'Filter by Institution / Programme'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={id || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'id')}
                  placeholder={'Filter by Report ID'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <ActiveDateFilter
                  field={'year'}
                  value={year}
                  active={active}
                  placeholder={'Filter by Date'}
                  onFilter={this.onFilterChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'agency'}
                  value={agency}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Agency'}
                  selectFilterOptions={this.getSelectFilterOptions('agency')}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'country'}
                  value={country}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Country'}
                  selectFilterOptions={this.getSelectFilterOptions('country')}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'activity'}
                  value={activity}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Activity'}
                  selectFilterOptions={this.getSelectFilterOptions('activity')}
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
                  selectFilterOptions={this.getSelectFilterOptions('flag_level')}
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
      filterOpen: store.myReportsTable.filterOpen,
      filtered: store.myReportsTable.filtered
    }
  }
};

export default connect(mapStateToProps)(MyReportsTableFilters)