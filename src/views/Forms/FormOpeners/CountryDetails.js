import React from 'react';
import {connect} from "react-redux";
import country from "../../../services/Country";
import CountryForm from "../FormFields/CountryForm/CountryForm";
import {updateFormNormalizer} from "../FormFields/CountryForm/normalizers/updateFormNormalizer";

const CountryDetails = ({userIsAdmin, ...props}) => {
  const {id, param} = props.match.params;

  const renderFormTitle = () => {
    switch (param) {
      case 'view':
        return `Reference Data » Countries » View : Country ID ${id}`;
      case 'edit':
        return `Reference Data » Countries » Edit : Country ID ${id}`;
      case 'create':
        return `Reference Data » Countries » Create`;
      default:
        break;
    }
  };

  return(
    <React.Fragment>
      <CountryForm
        api={{
          read: country.read,
          update: country.update,
          create: country.create
        }}
        decoders={[]}
        encoders = {[]}
        normalizers={{
          create: updateFormNormalizer,
          update: updateFormNormalizer
        }}
        module={'country'}
        formTitle={renderFormTitle()}
        formType={param}
        recordID={id}
        backPath={'/reference/countries/'}
        userIsAdmin={userIsAdmin}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin
  }
};

export default connect(mapStateToProps)(CountryDetails);
