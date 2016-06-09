import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PreviousTasks from '../components/previousTasks';
import { Link } from 'react-router';

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
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group search-form">
          <input
            placeholder="Enter a task group ID"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange} />

          <Link className="input-group-btn" to={this.state.term}>
            <button type="submit" className="btn btn-secondary">Inspect</button>
          </Link>
        </form>
      </div>
		);

	}
}


export default connect(null, actions )(Search)
