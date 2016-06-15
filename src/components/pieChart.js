import React from 'react';
import { Component } from 'react';
import { VictoryPie, VictoryAnimation } from 'victory';

export default class PieChart extends Component {

  makePieChart() {
    if(!!!this.props.tasks) {
      return (
          <div>
            Fetching data...
          </div>
      )
    }

    //  Construct pie chart with data
    let		completed = [],
					failed = [],
					exception = [],
					unscheduled = [],
					pending = [],
					running = [],
          tasks = this.props.tasks,
          status;

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
		});



    //  Construct Pie Components
    let chartComponents = [],
        chartColors = [];
    if(completed.length) {
      chartComponents.push({x: 'C', y: completed.length});
      chartColors.push("#5cb85c");
    }
    if(failed.length) {
      chartComponents.push({x: 'F', y: failed.length})
      chartColors.push("#d9534f");
    }
    if(exception.length) {
      chartComponents.push({x: 'E', y: exception.length})
      chartColors.push("#7d32h7");
    }
    if(unscheduled.length) {
      chartComponents.push({x: 'U', y: unscheduled.length})
      chartColors.push("#777777");
    }
    if(running.length) {
      chartComponents.push({x: 'R', y: running.length})
      chartColors.push("#337ab7");
    }
    if(pending.length) {
      chartComponents.push({x: 'P', y: pending.length})
      chartColors.push("#5bc0de");
    }

		return (
			<div>
				<VictoryPie
          data={chartComponents}
					events={[{
						target: "data",
						eventHandlers: {
			        onClick: (evt, props) => {
								return [
									{
                    target: "labels",
                    mutation: (elem) => {
											this.props.onSliceClick(elem);
											return elem;
                    }
                  }
                ];
			        }
			      }
			    }]}

					animate={{
						duration: 1000,
					}}
          height={150}
          width={150}
					colorScale={chartColors}
					style={{
				    labels: {
				      fill: "white",
				      fontSize: 6,
				    }
				  }}

				/>
			</div>
		)

    return (

      <div>

        <VictoryPie />
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.makePieChart()}
      </div>
    );
  }

}
