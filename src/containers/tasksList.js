import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Task from '../components/task';
import { VictoryPie, VictoryAnimation } from 'victory';


class TasksList extends Component {



	componentWillMount() {
		this.props.fetchTasks();
	}

	taskClicked(task) {
		this.props.setActiveTask(task);
	}

  renderTasks() {
		const tasks = this.props.tasks;
		return tasks.map((task) => {
      return (
          <tbody onClick={this.taskClicked.bind(this, task)} key={task.status.taskId}>
            <Task task={task} />
          </tbody>
      )
    });
  }

	renderPieChart() {
		console.log('pie', this.props.tasks);
		const tasks = this.props.tasks,
					completed = [],
					failed = [],
					exception = [],
					unscheduled = [],
					pending = [],
					running = [];

		let status;

		tasks.map((task) => {
			status = task.status.state;
			switch (status) {
				case "completed":
					completed.push(task);
					break;
				case "failed":
					failed.push(task);
					break;
				case "exception":
					exception.push(task);
					break;
				case "unscheduled":
					unscheduled.push(task);
					break;
				case "pending":
					pending.push(task);
					break;
				case "running":
					running.push(task);
					break;
			}

		})

		if(!!!completed.length && !!!failed.length && !!!exception.length) {
			return (
				<div>
					Waiting for data...
				</div>
			);
		}

		return (
			<div>
				<VictoryPie
					data={[
						{x: "C", y: completed.length},
				    {x: "F", y: failed.length},
				    {x: "E", y: exception.length},
						{x: "U", y: unscheduled.length},
						{x: "P", y: pending.length},
						{x: "R", y: running.length},
					]}
					events={[{
						target: "data",
						childName: "C",
						eventHandlers: {
			        onClick: (evt, props) => {
								return [
									{
                    target: "labels",
                    mutatio: () => {
                      return {
                        style: {fill: "yellow"},
                        text: "waddup"
                      };
                    }
                  },
									{
                    mutation: () => {
											this.props.fetchTasks("Pv3LWd1oTmWzoE1jftZVfg");
											return {
                        style: {fill: "red"}
                      };
                    }
                  }
                ];
			        }
			      }
			    }]}

					animate={{
						duration: 1000,
					}}

					colorScale={[
				    "rgb(6, 71, 52)",
				    "#063647",
				    "#383737",
						"#777777",
						"#5bc0de",
						"#337ab7"
				  ]}
					style={{
				    labels: {
				      fill: "white",
				      fontSize: 12
				    }
				  }}

				/>
			</div>
		)
	}

	render() {
		return (
			<div className="col-xs-6">
				<div>{this.renderPieChart()}</div>
				<table>
          <thead>
          <tr>
              <th>TaskId</th>
              <th>Name</th>
              <th>State</th>
              <th>Runs</th>
          </tr>
          </thead>
          {this.renderTasks()}
        </table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tasks: state.tasks
	}
}

export default connect(mapStateToProps, actions )(TasksList)
