import React, { Component } from 'react'
// import ReactDOM from "react-dom";
import PropTypes from 'prop-types'
import './TasksFilter.css'

class TasksFilter extends Component {
  static defaultProps = {
    changeStatus: () => {},
  }

  static propTypes = {
    changeStatus: PropTypes.func,
  }

  render() {
    const { changeStatus } = this.props

    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={() => changeStatus('All')}>
            All
          </button>
        </li>
        <li>
          <button onClick={() => changeStatus('Active')}>Active </button>
        </li>
        <li>
          <button onClick={() => changeStatus('Completed')}>Completed</button>
        </li>
      </ul>
    )
  }
}

export default TasksFilter
