import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchTasks(this.state.term);
  }

  onInputChange(event) {
    this.setState({term: event.target.value});
  }

  render() {
		return (
      <form onSubmit={this.onFormSubmit} className="input-group search-form">
        <input
          placeholder="Enter a task group ID"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange} />

        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
      </form>
		);

	}
}


export default connect(null, actions )(Search)
