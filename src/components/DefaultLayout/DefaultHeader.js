import React, { Component } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import UserAvatar from 'react-user-avatar';
import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logoFull from '../../assets/img/brand/logo-full.png';
import logoBrand from '../../assets/img/brand/logo-brand.png';
import user from '../../services/User';
import setUser from "./actions/setUser";
import {connect} from "react-redux";
import styles from './DefaultHeader.module.css';
import {Link, withRouter} from "react-router-dom";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  componentDidMount() {
    user.getUser().then((response) => {
      this.props.setUser(response.data);
    });
  }

  render() {
    const {username} = this.props;

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logoFull, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: logoBrand, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <NavItem className={styles.navGreeting}>Welcome, {username}!</NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <UserAvatar
                size="40"
                name={'('+username+')'}
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>{username}</strong></DropdownItem>
              <DropdownItem onClick={() => this.props.history.push('my-profile')}>
                  <i className="fa fa-user"> </i> Profile
              </DropdownItem>
              <DropdownItem onClick={e => this.props.onLogout(e)}>
                <i className="fa fa-lock"> </i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => {
      dispatch(setUser(user))
    }
  }
};

const mapStateToProps = (store) => {
  return {
    username: store.user.username
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultHeader));
