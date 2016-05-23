import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Template = ({ children }) => (
  <div className="container">
    <nav>
      <Link to="/counter">Counter</Link>
      <Link to="/async">Async</Link>
    </nav>
    {children}
  </div>
);

Template.propTypes = {
  children: PropTypes.node
};

export default Template;
