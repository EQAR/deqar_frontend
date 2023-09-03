import React, { Component } from 'react';
import {Col, Collapse, Input, InputGroup, InputGroupAddon, InputGroupText, Label, Row} from "reactstrap";
import { connect } from "react-redux";
import SelectFilter from "../../../components/DataTableFilters/SelectFilter";
import FormGroup from "reactstrap/es/FormGroup";
import style from "../../../components/DataTableFilters/ActiveDateFilter.module.css";

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

  getAPFilterOptions = () => {
    return [
      {value: 'ap', label: 'Only APs'},
      {value: 'hei', label: 'Only HEI(s)'},
    ]
  }

  onFilterRemove = (field) => {
    this.onFilter('', field)
  };

  onFilter = (value, field) => {
    let { filterState: { filtered } } = this.props;

    // AP filter handling
    if (field === 'is_alternative_provider') {
      if (value === "") {
        filtered = filtered.filter(f => f.id !== 'alternative_provider');
      } else {
        switch (value['value']) {
          case 'hei':
            filtered.push({id: 'alternative_provider', value: 'hei'});
            break;
          case 'ap':
            filtered.push({id: 'alternative_provider', value: 'ap'});
            break;
          case 'all':
            filtered = filtered.filter(f => f.id !== 'alternative_provider');
            break;
        }
      }
    }

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
            <Col md={2}>
              <FormGroup>
                <Input
                  value={this.getValue('deqar_id')}
                  onChange={(e) => this.onFilter(e.target.value, 'deqar_id')}
                  placeholder={'DEQARINST ID'}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <Input
                  value={this.getValue('eter_id')}
                  onChange={(e) => this.onFilter(e.target.value, 'eter_id')}
                  placeholder={'ETER ID'}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <InputGroup>
                  <Input
                    value={this.getValue('query')}
                    onChange={(e) => this.onFilter(e.target.value, 'query')}
                    placeholder={'Filter by Institution'}
                  />
                </InputGroup>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <SelectFilter
                  field={'is_alternative_provider'}
                  value={this.getValue('is_alternative_provider')}
                  onFilter={this.onFilter}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'HEI / AP'}
                  selectFilterOptions={this.getAPFilterOptions()}
                  menuPlacement={'bottom'}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <SelectFilter
                  field={'country'}
                  value={this.getCountryValue()}
                  onFilter={this.onFilter}
                  onFilterRemove={this.onFilterRemove}
                  placeholder={'Filter by Country'}
                  selectFilterOptions={this.getSelectFilterOptions('country_facet')}
                  menuPlacement={'bottom'}
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
