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

    const chartColors = [
      "rgb(6, 71, 52)",
      "#063647",
      "#383737",
      "#777777",
      "#5bc0de",
      "#337ab7"
    ];

    const chartComponents = [
      {x: "C", y: completed.length},
      {x: "F", y: failed.length},
      {x: "E", y: exception.length},
      {x: "U", y: unscheduled.length},
      {x: "P", y: pending.length},
      {x: "R", y: running.length}
    ];

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
          height={200}
          width={200}
					colorScale={chartColors}
					style={{
				    labels: {
				      fill: "white",
				      fontSize: 8
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
