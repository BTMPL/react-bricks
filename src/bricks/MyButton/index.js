import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  className,
  children,
  onClick
}) => <button onClick={onClick} className={className}>{children}</button>

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button;