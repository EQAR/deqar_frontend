import React, {Component} from 'react';
import {Button, Col, Collapse, Row} from "reactstrap";
import {Scope} from "informed";
import style from "../../views/AgencyForm/AgencyForm.module.css";

class FormTextArrayField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  componentDidMount() {
    const {values} = this.props;
    if (values) {
      this.setState({
        count: values.length
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {values} = this.props;

    if (prevProps['values'] !== this.props.values) {
      if (values) {
        this.setState({
          count: values.length
        });
      }
    }
  }

  getCount() {
    const {count} = this.state;
    return Array.apply(null, {length: count}).map(Number.call, Number);
  }

  addRow = () => {
    const {values} = this.props;
    const {count} = this.state;
    const lastValue = values[values.length - 1];
    let skip = true;

    if(values.length === count) {
      Object.keys(lastValue).forEach((key) => {
        if (lastValue[key] !== '') {
          skip = false;
        }
      });

      if (!skip) {
        this.setState((prevState, props) => ({
          count: prevState['count'] + 1
        }))
      }
    }
  };

  render() {
    const {field, disabled} = this.props;
    const count = this.getCount();

    return(
      <React.Fragment>
        <Collapse isOpen={true}>
          {
            count.map((c, idx) => {
              const scopeName = `${field}[${idx}]`;
              return(
                <Scope scope={scopeName} key={idx}>
                  {this.props.children}
                </Scope>
              )
            })
          }
        </Collapse>
        {disabled ? "" :
          <Row>
            <Col md={12}>
              <div className="pull-right">
                <Button
                  type={'button'}
                  size="sm"
                  color="secondary"
                  onClick={this.addRow}
                  className={style.Button}
                >Add More...</Button>
              </div>
            </Col>
          </Row>
        }
      </React.Fragment>
    )
  }
}

export default FormTextArrayField;