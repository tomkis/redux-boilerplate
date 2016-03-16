import React from 'react';
import PureComponent from 'react-pure-render/component';

export default class NotFound extends PureComponent {
  render() {
    return (
      <div>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </div>
    );
  }
}
