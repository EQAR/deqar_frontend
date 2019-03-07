import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";
import style from './ActionButtons.module.css';

class ActionButtons extends Component {
  render() {
    const { pathConfig, row } = this.props;

    return (
      <div className={'text-center'}>
        {pathConfig.map((config, idx) =>
          <React.Fragment key={idx}>
            <Link to={{pathname: `${config.path}/${row.original.id}`}}>
              <Button
                className={style.actionButton}
                size="sm"
                color="primary"
              >{config.buttonText}</Button>
            </Link>
          </React.Fragment>
        )}
      </div>
    )
  }
}

ActionButtons.propTypes = {
  pathConfig: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired
  })).isRequired,
  row: PropTypes.object.isRequired
};



export default ActionButtons;
