import React from 'react';
import {Col, Row} from "reactstrap";
import UserProfile from "./UserProfile";
import ChangeTokenForm from "./ChangeTokenForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

const MyProfile = (props) => {
  return (
    <div className="animated fadeIn">
      <Row>
        <Col md={6} xs={12}>
          <UserProfile />
          <ChangeTokenForm/>
        </Col>
        <Col md={6} xs={12}>
          <ChangePasswordForm/>
          <ChangeEmailForm/>
        </Col>
      </Row>
    </div>
  );
};

export default MyProfile;