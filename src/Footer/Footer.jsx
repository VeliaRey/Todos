import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

class Footer extends Component {
	static defaultProps = {
		changeStatus: () => {},
		clearCompleted: () => {},
	}

	static propTypes = {
		doneCount: PropTypes.number,
		changeStatus: PropTypes.func,
		clearCompleted: PropTypes.func,
	}

	render() {
		const { doneCount, changeStatus, clearCompleted, status } = this.props

		return (
			<footer className="footer">
				<span className="todo-count">{doneCount} items left</span>
				<TasksFilter changeStatus={changeStatus} status={status} />
				<button className="clear-completed" onClick={() => clearCompleted()}>
					Clear completed
				</button>
			</footer>
		)
	}
}

export default Footer
