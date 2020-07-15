import React, {useState} from 'react';
import {
  Col, Collapse,
  FormGroup, FormText,
  Label,
  Row
} from "reactstrap";
import style from './InstitutionForm.module.css';
import PropTypes from "prop-types";
import FormTextField from "../../../../components/FormFields/FormTextField/FormTextField";
import {withRouter} from "react-router-dom";
import withFormManager from "../../../../components/FormManager/FormManagerHOC";
import FormDatePickerField from "../../../../components/FormFields/FormDatePickerField/FormDatePickerField";
import FormSelectField from "../../../../components/FormFields/FormSelectField/FormSelectField";
import list from "../../../../services/List";
import cx from "classnames";
import {validateRequired, validateRoman} from "../../../../utils/validators";
import FormManyMultipleField
  from "../../../../components/FormFieldsUncontrolled/FormManyMultipleField/FormManyMultipleField";
import country from "../../../../services/Country";
import FormManyTextField from "../../../../components/FormFields/FormManyTextField/FormManyTextField";
import PopupFormListManager from "../../../../components/FormManager/PopupFormListManager";
import FormerNameSubform from "./components/FormerNameSubform";
import LocalIDSubform from "./components/LocalIDSubform";
import NationalIDSubform from "./components/NationalIDSubform";
import HierarchicalLinkSubform from "./components/HierarchicalLinkSubform";
import HistoricalLinkSubform from "./components/HistoricalLinkSubform";

const InstitutionForm = ({formType, formApi, formState, readOnly, module, ...props}) => {
  const [showTransliteration, setShowTransliteration] = useState(false);

  const deleteTransliteration = () => {
    if(showTransliteration) {
      formApi.setValue('names_actual[0].name_official_transliterated', '');
    }
    setShowTransliteration(!showTransliteration);
  };

  const renderFormerNames = (value) => {
    return value['name_official'];
  };

  const renderHistoricalLinks = (value) => {
    const { institution, relationship_type } = value;
    let institutionName;

    if (institution) {
      institutionName = institution[0].name_primary;
    }

    return `${relationship_type.relationship}: ${institutionName}`
  };

  const renderHierarchicalLinks = (value) => {
    const { institution, relationship } = value;
    let institutionName;

    if (institution) {
      institutionName = institution[0].name_primary;
    }

    return `${relationship.relationship}: ${institutionName}`
  };

  return(
    <Row>
      <Col md={6} className={style.FormLeft}>
        <Row>
          <Col md={12}>
            <FormGroup className={formType === 'edit' ? style.noFormGroupMargin : ''}>
              <Label for={'names_actual[0].name_official'} className={'required'}>Institution Name, Official</Label>
              <FormTextField
                field={'names_actual[0].name_official'}
                disabled={readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Collapse isOpen={showTransliteration}>
          <Row>
            <Col>
              <FormGroup className={cx(style.noFormGroupMargin, style.Transliteration)}>
                <Label for="name_official_transliterated">Institution Name, Transliterated</Label>
                <FormTextField
                  field={'names_actual[0].name_official_transliterated'}
                  placeholder={'Enter transliterated form'}
                  disabled={readOnly}
                  validate={validateRoman}
                />
              </FormGroup>
            </Col>
          </Row>
        </Collapse>
        {formType !== 'edit' ? "" :
          <Row>
            <FormGroup>
              <Col md={12}>
                <FormText color="muted">
                    <span onClick={deleteTransliteration} className={style.removeTransliteration}>
                      {showTransliteration ? 'Remove Transliteration' : 'Add Transliteration'}
                    </span>
                </FormText>
              </Col>
            </FormGroup>
          </Row>
        }
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for={'names_actual[0].name_english'}>Institution Name, English</Label>
              <FormTextField
                field={'names_actual[0].name_english'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <FormManyTextField
                label={'Alternative Institution Name'}
                data={formState.values['alternative_names']}
                scopeName={'names_actual[0].alternative_names'}
                field={'name'}
                addButtonText={'Add Alternative Name'}
                required={false}
                disabled={readOnly}
                formApi={formApi}
                placeholder={'Enter alternative institution name'}
                extra={0}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for={'names_actual[0].acronym'}>Institution Acronym</Label>
              <FormTextField
                field={'names_actual[0].acronym'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for={'website_link'} className={'required'}>Institution Website</Label>
              <FormTextField
                field={'website_link'}
                disabled={readOnly}
                validate={validateRequired}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'names'}
              label={'Former Names'}
              formApi={formApi}
              renderDisplayValue={renderFormerNames}
              labelShowRequired={false}
              btnLabel={'Add previous name set'}
              disabled={readOnly}
            >
              <FormerNameSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'identifiers_local'}
              label={'Local ID'}
              formApi={formApi}
              renderDisplayValue={value => (`${value.identifier} (${value.agency['acronym_primary']})`)}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <LocalIDSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'identifiers_national'}
              label={'National ID'}
              formApi={formApi}
              renderDisplayValue={value => (`${value.identifier} (National)`)}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <NationalIDSubform />
            </PopupFormListManager>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <Col md={12}>
            <Label for="country" className={'required'}>Countries</Label>
          </Col>
          <FormManyMultipleField
            addButtonText={'Add New Location'}
            disabled={readOnly}
            scopeName={'countries'}
            formApi={formApi}
            data={formState.values['countries']}
            render={({counter}) => (
              <React.Fragment>
                <Col md={6}>
                  <FormGroup>
                    <FormSelectField
                      field={'country'}
                      optionsAPI={country.select}
                      placeholder={'Please select'}
                      labelField={'name_english'}
                      valueField={'id'}
                      disabled={readOnly}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <FormTextField
                      field={'city'}
                      placeholder={'Enter city name'}
                      disabled={readOnly}
                    />
                  </FormGroup>
                </Col>
              </React.Fragment>
            )}
          />
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="founding_date" >Founding Date</Label>
              <FormDatePickerField
                field={'founding_date'}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="closing_date" >Closing Date</Label>
              <FormDatePickerField
                field={'closing_date'}
                placeholderText={'YYYY-MM-DD'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="qf_ehea_levels">QF-EHEA Levels</Label>
              <FormSelectField
                field={'qf_ehea_levels'}
                optionsAPI={list.selectQFEHEALevels}
                placeholder={'Please select'}
                labelField={'qf_ehea_level'}
                valueField={'id'}
                isMulti
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for={'other_comment'} >Other comment (optional)</Label>
              <FormTextField
                field={'other_comment'}
                disabled={readOnly}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'historical_links'}
              label={'Historical Links'}
              formApi={formApi}
              renderDisplayValue={renderHistoricalLinks}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <HistoricalLinkSubform />
            </PopupFormListManager>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <PopupFormListManager
              field={'hierarchical_links'}
              label={'Hierarchical Links'}
              formApi={formApi}
              renderDisplayValue={renderHierarchicalLinks}
              labelShowRequired={false}
              disabled={readOnly}
            >
              <HierarchicalLinkSubform />
            </PopupFormListManager>
          </Col>
        </Row>
      </Col>
    </Row>
  )
};

InstitutionForm.defaultProps = {
  userIsAdmin: false
};

InstitutionForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  formType: PropTypes.oneOf(['create', 'view', 'edit']),
  agencyID: PropTypes.string,
  backPath: PropTypes.string,
  userIsAdmin: PropTypes.bool,
};

export default withRouter(withFormManager(InstitutionForm))
