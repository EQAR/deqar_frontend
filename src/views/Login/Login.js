import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row } from 'reactstrap';
import LoginAlert from "./LoginAlert";
import auth from "../../services/Auth";
import {connect} from "react-redux";
import setUser from "../../components/DefaultLayout/actions/setUser";
import user from "../../services/User";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      alertVisible: false
    }
  }

  setUsername = (event) => {
    this.setState({username: event.target.value});
  };

  setPassword = (event) => {
    this.setState({password: event.target.value});
  };

  closeAlert = () => {
    this.setState({alertVisible: false});
  };

  handleLogin = (event) => {
    const {username, password} = this.state;

    if (event.key === 'Enter' || event.key === undefined) {
      auth.authenticate(username, password).then((response) => {
        auth.saveToken(response.data.token);
      }).then(() => {
        user.getUser().then((response) => {
          this.props.setUser(response.data);
        });
      }).then(() => {
        this.props.history.push("/");
      }).catch((error) => {
        this.setState({
          alertVisible: true
        })
      });
    }
  };

  render() {
    const {alertVisible} = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <LoginAlert
                      visible={alertVisible}
                      onClose={this.closeAlert}
                    />
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"> </i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"
                             placeholder="Username"
                             autoComplete="username"
                             onKeyUp={this.handleLogin}
                             onChange={this.setUsername} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"> </i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password"
                             placeholder="Password"
                             autoComplete="current-password"
                             onKeyUp={this.handleLogin}
                             onChange={this.setPassword} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={this.handleLogin} color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to='/forgot-password'>
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <div>
                        <h2>Welcome to DEQAR</h2>
                        <p>DEQAR is a database that will enhance access to reports and decisions on higher education institutions/programmes externally reviewed against the ESG, by an EQAR-registered agency.</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: user => {
      dispatch(setUser(user))
    }
  }
};

const mapStateToProps = () => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
