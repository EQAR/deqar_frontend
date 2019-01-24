import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import UserAvatar from 'react-user-avatar';
import {connect} from "react-redux";
import styles from './UserProfile.module.css';

class UserProfile extends React.Component {
  render() {
    const {username, email} = this.props;

    return (
      <Card>
        <CardHeader>
          <Row>
            <Col>My Profile</Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <div className={styles.brandCard + ' brand-card'}>
                <div className={styles.brandCardHeader + ' brand-card-header'}>
                  <UserAvatar size="80" name={'('+username+')'}/>
                </div>
                <div className="brand-card-body">
                  <div>
                    <div className={styles.brandText + ' text-value'}>{username}</div>
                    <div className="text-uppercase text-muted small">user</div>
                  </div>
                  <div>
                    <div className={styles.brandText + ' text-value'}>{email}</div>
                    <div className="text-uppercase text-muted small">email</div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    username: store.user.username,
    email: store.user.email
  }
};

export default connect(mapStateToProps)(UserProfile);
