import React from 'react';
import { Component } from 'react';
import * as bs from 'react-bootstrap';

export default class Loading extends Component {
  render() {
    return (
      <div>
        <div className="sk-three-bounce">
          <div className="sk-child sk-bounce1"></div>
          <div className="sk-child sk-bounce2"></div>
          <div className="sk-child sk-bounce3"></div>
        </div>
      </div>
    );
  }
}
