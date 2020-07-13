import React, {Component} from 'react';
import {Col, Collapse, FormGroup, Input, Label, Row} from "reactstrap";
import SelectFilter from "../../../components/DataTableFilters/SelectFilter";
import {connect} from "react-redux";
import country from "../../../services/Country";

class CountriesTableFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      ehea_is_member: undefined,
      external_QAA_is_permitted: undefined,
      european_approach_is_permitted: undefined,
      has_full_institution_list: undefined,
      ehea_key_commitment: undefined,
      booleanSelectOptions: [],
      permissionTypeOptions: []
    };
  }

  componentDidMount() {
    this.populateBooleanSelect();
    this.populatePermissionType();
    this.setState({
      search: this.getFilterValue('search', 'text'),
      ehea_is_member: this.getFilterValue('ehea_is_member', 'select'),
      external_QAA_is_permitted: this.getFilterValue('external_QAA_is_permitted', 'select'),
      european_approach_is_permitted: this.getFilterValue('european_approach_is_permitted', 'select'),
      has_full_institution_list: this.getFilterValue('has_full_institution_list', 'select'),
      ehea_key_commitment: this.getFilterValue('ehea_key_commitment', 'select')
    });
  }

  // Populate selects
  populateBooleanSelect = () => {
      this.setState({
        booleanSelectOptions: [
          {label: 'Member of EHEA', value: true},
          {label: 'Not a Member of EHEA', value: false}
        ]
      })
  };

  populatePermissionType = () => {
    country.getPermissionTypes().then((response) => {
      const options = response.data.map(r => {
        return {label: r.type, value: r.id}
      });
      this.setState({
        permissionTypeOptions: options
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
    const {search, ehea_is_member, external_QAA_is_permitted, european_approach_is_permitted,
      has_full_institution_list, ehea_key_commitment, booleanSelectOptions, permissionTypeOptions} = this.state;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={8}>
              <FormGroup>
                <Input
                  value={search || ""}
                  onChange={(e) => this.onFilterChange(e.target.value, 'search')}
                  placeholder={'Filter by Country Name / Alpha2 / Alpha3'}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <SelectFilter
                  field={'ehea_is_member'}
                  value={ehea_is_member}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by EHEA Membership'}
                  selectFilterOptions={booleanSelectOptions}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>External QAA is Permitted</Label>
                <SelectFilter
                  field={'external_QAA_is_permitted'}
                  value={external_QAA_is_permitted}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'- Select Permission -'}
                  selectFilterOptions={permissionTypeOptions}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>European Approach is Permitted</Label>
                <SelectFilter
                  field={'european_approach_is_permitted'}
                  value={european_approach_is_permitted}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'- Select Permission - '}
                  selectFilterOptions={permissionTypeOptions}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>EHEA Key Commitment</Label>
                <SelectFilter
                  field={'ehea_key_commitment'}
                  value={ehea_key_commitment}
                  onFilter={this.onFilterChange}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'- Select Permission -'}
                  selectFilterOptions={permissionTypeOptions}
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
      filterOpen: store.countriesTable.filterOpen,
      filtered: store.countriesTable.filtered
    }
  }
};

export default connect(mapStateToProps)(CountriesTableFilters)
