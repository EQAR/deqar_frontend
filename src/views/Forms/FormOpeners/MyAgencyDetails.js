import React from 'react';
import AgencyForm from "../FormFields/AgencyForm/AgencyForm";
import {connect} from "react-redux";
import agency from "../../../services/Agency";
import {decodeNameData} from "../FormFields/AgencyForm/normalizers/formDecoders";
import {encodeNameData} from "../FormFields/AgencyForm/normalizers/formEncoders";
import {updateFormNormalizer} from "../FormFields/AgencyForm/normalizers/updateFormNormalizer";

const MyAgency = ({userIsAdmin, match, agencies, ...props}) => {
  const {id, param} = match.params;

  return(
    <React.Fragment>
      <AgencyForm
        api={{
          read: agency.getMyAgency,
          update: agency.updateMyAgency,
        }}
        encoders={[encodeNameData]}
        decoders={[decodeNameData]}
        normalizers={{
          create: updateFormNormalizer,
          update: updateFormNormalizer
        }}
        module={'myAgency'}
        formTitle={param === 'view' ?
          `My Data » My Agency » View : Agency ID ${id}` :
          `My Data » My Agency » Edit : Agency ID ${id}`}
        formType={param ? param : 'view'}
        recordID={id}
        backPath={'/my-agencies/'}
        userIsAdmin={userIsAdmin}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin,
  }
};

export default connect(mapStateToProps)(MyAgency);
