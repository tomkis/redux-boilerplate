import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { connect } from 'react-redux';

import { barClicked } from '../actions/foobarActions.js';

class BarPage extends PureComponent {

  static propTypes = {
    barCounter: PropTypes.number.isRequired,
    barClicked: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <h1>Bar</h1>
        {this.props.barCounter}
        <br/><br/>
        <button onClick={this.props.barClicked}>Incr</button>
      </div>
    );
  }
}

export default connect(
  state => ({
    barCounter: state.app.get('barCounter'),
  }),
  dispatch => ({
    barClicked: () => dispatch(barClicked())
  })
)(BarPage);
