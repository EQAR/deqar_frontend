import React, { Component } from 'react';
import { Col, Collapse, Input, Row } from "reactstrap";
import { connect } from "react-redux";
import SelectFilter from "../../components/DataTableFilters/SelectFilter";
import FormGroup from "reactstrap/es/FormGroup";

class InstitutionsTableFilters extends Component {
  componentDidUpdate = (prevProps) => {
    if (this.props.filterState.filtered.length !== prevProps.filterState.filtered.length) {
      this.onFilter(this.props.filterState.filtered.value, this.props.filterState.filtered.id)
    }
  };

  getSelectFilterOptions = (field) => {
    const { facets } = this.props;

    if (field in facets) {
      const values = facets[field].filter((element) => typeof element === 'string')
      return values.map(v => {
        return { value: v, label: v}
      });
    } else {
      return [];
    }
  };

  onFilterRemove = (field) => {
    this.onFilter('', field)
  };

  onFilter = (value, field) => {
    let { filterState: { filtered } } = this.props;

    if (!value) {
      filtered = filtered.filter(f => f.id !== field);
    } else if (filtered.some(f => f.id === field)) {
      filtered.forEach(f => {
        if (f.id === field) {
          f.value = value;
        }
      })
    } else {
      field === 'country' ?
        filtered.push({id: field, value: value.value}) :
        filtered.push({id: field, value: value});
    }

    this.props.onFilter(filtered);
  }

  getValue = id => {
    const { filterState: { filtered } } = this.props;
    const filter = filtered.find(filter => filter.id === id);
    return filter ? filter.value : '';
  }

  getCountryValue = () => {
    const { filterState: { filtered } } = this.props;
    const filter = filtered.find(filter => filter.id === 'country');
    return filter ? { value: filter.value, label: filter.value } : '';
  }

  render() {
    const { filterState } = this.props;
    const { filterOpen } = filterState;

    return(
      <React.Fragment>
        <Collapse isOpen={filterOpen}>
          <Row form>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={this.getValue('eter_id')}
                  onChange={(e) => this.onFilter(e.target.value, 'eter_id')}
                  placeholder={'ETER ID'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={this.getValue('deqar_id')}
                  onChange={(e) => this.onFilter(e.target.value, 'deqar_id')}
                  placeholder={'DEQARINST ID'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <SelectFilter
                  field={'country'}
                  value={this.getCountryValue()}
                  onFilter={this.onFilter}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Country'}
                  selectFilterOptions={this.getSelectFilterOptions('country_facet')}
                  menuPlacement={'top'}
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Input
                  value={this.getValue('city')}
                  onChange={(e) => this.onFilter(e.target.value, 'city')}
                  placeholder={'City'}
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Input
                  value={this.getValue('query')}
                  onChange={(e) => this.onFilter(e.target.value, 'query')}
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
}

export default connect(mapStateToProps)(InstitutionsTableFilters)
