import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultFooter = (props) => {
  return (
    <React.Fragment>
      <span className="ml-auto">DEQAR Administration by <a href="http://www.eqar.eu" target={'_blank'}>EQAR</a></span>
    </React.Fragment>
  );
};

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
