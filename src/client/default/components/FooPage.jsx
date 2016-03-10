import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

import { fooRequested } from 'actions/foobarActions';


class FooPage extends PureComponent {

  static propTypes = {
    foo: PropTypes.string,
    loadFoo: PropTypes.func.isRequired,
  }

  render() {
    const attrs = {};
    if (this.props.foo) {
      attrs.disabled = 'disabled';
    } else {
      attrs.onClick = this.props.loadFoo;
    }
    return (
      <div>
        <h1>Foo</h1>
        <button {...attrs}>Load</button>
        <br/><br/>
        <div>
          {this.props.foo ? this.props.foo : "Foo is not loaded."}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    foo: state.app.get('foo'),
  }),
  dispatch => ({
    loadFoo: () => dispatch(fooRequested())
  })
)(FooPage);
