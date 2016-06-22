import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions'
//
// class Nav extends Component {
//   <nav className="navbar navbar-full navbar-dark bg-inverse">
//     <a className="navbar-brand" href="/">{title}</a>
//     <div className="nav navbar-nav">
//       {routes.map(r => <Link className="nav-item nav-link" key={r.path} to={r.path}>{r.title}</Link>)}
//     </div>
//   </nav>
// );

class Nav extends Component {

	render() {

		return (
			<nav className="navbar navbar-inverse remove-border-radius">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <Link className="navbar-brand" to="/">Push-Inspector</Link>
			    </div>
			  </div>
			</nav>
		);
	}
}


export default connect(null, actions )(Nav)
