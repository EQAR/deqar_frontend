import React, {Component} from 'react';
import {Col, Collapse, FormGroup, Input, Row} from "reactstrap";
import country from "../../services/Country";
import SelectFilter from "../../components/DataTableFilters/SelectFilter";
import ActiveDateFilter from "../../components/DataTableFilters/ActiveDateFilter";
import {connect} from "react-redux";

class AgenciesTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      country: undefined,
      year: '',
      active: false,
      countryOptions: []
    };
  }

  componentDidMount() {
    this.populateCountries();
    this.setState({
      query: this.getFilterValue('query', 'text'),
      country: this.getFilterValue('country', 'select'),
      year: this.getFilterValue('year', 'text'),
      active: this.getFilterValue('active', 'boolean')
    });
  }

  // Populate selects
  populateCountries = () => {
    country.select().then((response) => {
      const options = response.data.map(r => {
        return {label: r.name_english, value: r.id}
      });
      this.setState({
        countryOptions: options
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
    const {query, country, year, active, countryOptions} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Input
                  value={query || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'query')}
                  placeholder={'Filter by Agency Name / Acronym'}
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
                  selectFilterOptions={countryOptions}
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
        </Collapse>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    filterState: {
      filterOpen: store.agenciesTable.filterOpen,
      filtered: store.agenciesTable.filtered
    }
  }
};

export default connect(mapStateToProps)(AgenciesTableFilters)