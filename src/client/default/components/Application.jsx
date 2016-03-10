import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PureComponent from 'react-pure-render/component';

class Application extends PureComponent {

  static propTypes = {
    children: PropTypes.object,
    go: PropTypes.func,
  }

  render() {
    return <div className="container">
      <nav>
        <a onClick={() => {this.props.go('/foo');}}>Foo</a>
        <a onClick={() => {this.props.go('/bar');}}>Bar</a>
      </nav>
      {this.props.children}
    </div>;
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    go: target => {
      dispatch(push(target));
    }
  })
)(Application);
