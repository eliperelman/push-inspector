import React from 'react';
import { Component } from 'react';
import * as bs from 'react-bootstrap';
import taskcluster from 'taskcluster-client';

export default class TaskRun extends Component {

  constructor(props) {
    super(props);
    this.generateRows = this.generateRows.bind(this);
  }

  getArtifacts() {
    const { artifacts } = this.props;
    console.log('artifacts: ', artifacts);
    if(!!artifacts.length) {
      return artifacts.map((artifact,index) => {
        return (
          <li key={index}>{artifact.name}</li>
        )
      });
    }else{
      return <li>mp</li>
    }

  }

  generateRows() {
    const { task, status } = this.props;
    const runNumber = status.runs.length - 1;
    console.log('generating rows');
    const elemsToRender = {
      reasonCreated: status.runs[runNumber].reasonCreated,
      reasonResolved: status.runs[runNumber].reasonResolved,
      state: status.runs[runNumber].state,
      scheduled: status.runs[runNumber].scheduled,
      started: status.runs[runNumber].started
    }

    return Object.keys(elemsToRender).map(function(key) {
      return (
        <tr>
          <td><b>{key}</b></td>
          <td>{elemsToRender[key]}</td>
        </tr>
      );
    });
  }

  render() {
    const { task, status } = this.props;
    const runNumber = status.runs.length - 1;
    const rowComponents = this.generateRows();
    const artifactsComponent = this.getArtifacts();
    return (
      <div>
        <table className="run-table">
          <tbody>
            {rowComponents}

            <tr>
              <td>
                <b>Artifacts</b>
              </td>
              <td>
                <ul>{artifactsComponent}</ul>
              </td>
            </tr>
            
            </tbody>
        </table>

      </div>
    );
  }

}
