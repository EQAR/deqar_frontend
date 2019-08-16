import React, {Component} from 'react';
import {Col, Collapse, Input, Row} from "reactstrap";
import {connect} from "react-redux";
import SelectFilter from "../../components/DataTableFilters/SelectFilter";
import FormGroup from "reactstrap/es/FormGroup";

class InstitutionsTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      country: undefined,
      eter_id: '',
      deqar_id: '',
      city: ''
    };
  }

  componentDidMount() {
    this.setFilters();
  }

  // shouldComponentUpdate(nextProps) {
  //   if (!this.state.query && nextProps.filterState.filtered.length > 0) {
  //     this.setFilters();
  //   }
  //   return true;
  // }

  setFilters = () => this.setState({
    query: this.getFilterValue('query', 'text'),
    country: this.getFilterValue('country', 'select'),
    eter_id: this.getFilterValue('eter_id', 'text'),
    deqar_id: this.getFilterValue('deqar_id', 'text'),
    city: this.getFilterValue('city', 'text')
  });

  getFilterValue = (field, fieldType) => {
    const {filterState} = this.props;
    const {filtered} = filterState;
    const filter = filtered.filter(f => f.id === field);

    if (filter.length > 0) {
      if (fieldType === 'select') {
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
      if (this.state[key]) {
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
    const {query, eter_id, deqar_id, country, city} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Input
                  value={eter_id || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'eter_id')}
                  placeholder={'ETER ID'}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Input
                  value={deqar_id || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'deqar_id')}
                  placeholder={'DEQARINST ID'}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <SelectFilter
                  field={'country'}
                  value={country}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Country'}
                  selectFilterOptions={this.getSelectFilterOptions('country_facet')}
                  menuPlacement={'top'}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Input
                  value={city || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'city')}
                  placeholder={'City'}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  value={query || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'query')}
                  placeholder={'Filter by Institution'}
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
      filterOpen: store.institutionsTable.filterOpen,
      filtered: store.institutionsTable.filtered
    }
  }
};

export default connect(mapStateToProps)(InstitutionsTableFilters)
