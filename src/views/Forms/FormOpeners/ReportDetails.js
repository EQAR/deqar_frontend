import React from 'react';
import ReportForm from "../FormFields/ReportForm/ReportForm";
import {connect} from "react-redux";
import report from '../../../services/Report';
import {decodeProgrammeNameData, encodeProgrammeNameData} from "../FormFields/ReportForm/normalizers/programmeNameNormalizer";
import {createFormNormalizer} from "../FormFields/ReportForm/normalizers/createFormNormalizer";
import {updateFormNormalizer} from "../FormFields/ReportForm/normalizers/updateFormNormalizer";

const ReportDetails = ({...props}) => {
  const {id, param} = props.match.params;
  const {userIsAdmin} = props;

  return(
    <React.Fragment>
      <ReportForm
        api={{
          read: report.getReport,
          create: report.submitReport,
          update: report.updateReport,
        }}
        encoders={[encodeProgrammeNameData]}
        decoders={[decodeProgrammeNameData]}
        normalizers={{
          create: createFormNormalizer,
          update: updateFormNormalizer
        }}
        fileFields={['report_files']}
        module={'report'}
        formTitle={param === 'view' ?
          `Reference Data » Reports » View & Edit : DEQAR ID ${id}` :
          `Reference Data » Reports » Edit : DEQAR ID ${id}`}
        formType={param}
        recordID={id}
        userIsAdmin={userIsAdmin}
        backPath={'/reference/reports/'}
      />
    </React.Fragment>
  )
};

const mapStateToProps = (store) => {
  return {
    userIsAdmin: store.user.is_admin
  }
};

export default connect(mapStateToProps)(ReportDetails);
