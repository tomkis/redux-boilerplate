import React, { Component, PropTypes } from 'react';
import { TabBarIOS } from 'react-native';
import { view, forwardTo } from 'redux-elm';

import CounterView from '../counter/counterView.native';
import AsyncView from '../async/asyncView.native';

export default view(class RootView extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      selected: 'counter'
    };
  }

  render() {
    const { model, dispatch } = this.props;

    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Counter"
          selected={this.state.selected === 'counter'}
          onPress={() => this.setState({ selected: 'counter' })}
        >
          <CounterView model={model.counter} dispatch={forwardTo(dispatch, 'Counter')} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Async"
          selected={this.state.selected === 'async'}
          onPress={() => this.setState({ selected: 'async' })}
        >
          <AsyncView model={model.async} dispatch={forwardTo(dispatch, 'Async')} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});
