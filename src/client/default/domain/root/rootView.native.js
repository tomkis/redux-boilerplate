import React, { Component, PropTypes } from 'react';
import { TabBarIOS } from 'react-native';
import { view, forwardTo } from 'redux-elm';

import CounterView from '../counter/counterView.native';
import AsyncView from '../async/asyncView.native';
import * as Routes from './routes';

export default view(class RootView extends Component {

  static propTypes = {
    model: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
      selected: Routes.Counter
    };
  }

  componentWillMount() {
    this.props.dispatch({ type: 'UrlHasChanged', route: this.state.selected });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selected !== this.state.selected) {
      this.props.dispatch({ type: 'UrlHasChanged', route: this.state.selected });
    }
  }

  render() {
    const { model, dispatch } = this.props;

    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Counter"
          selected={this.state.selected === Routes.Counter}
          onPress={() => this.setState({ selected: Routes.Counter })}
        >
          <CounterView model={model.counter} dispatch={forwardTo(dispatch, 'Counter')} />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Async"
          selected={this.state.selected === Routes.Async}
          onPress={() => this.setState({ selected: Routes.Async })}
        >
          <AsyncView model={model.async} dispatch={forwardTo(dispatch, 'Async')} />
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});
