import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'
import './TaskList.css'

class TaskList extends Component {
	static defaultProps = {
		onCheckedTask: () => {},
		onDeletedTask: () => {},
		editTask: () => {},
	}

	static propTypes = {
		todos: PropTypes.arrayOf(PropTypes.object),
		onDeletedTask: PropTypes.func,
		onCheckedTask: PropTypes.func,
		editTask: PropTypes.func,
	}

	render() {
		const { todos, onDeletedTask, onCheckedTask, editTask, editLabel } = this.props
		const elements = todos.map((item) => {
			const { id, ...itemProps } = item

			return (
				<Task
					{...itemProps}
					key={id}
					onDeletedTask={() => onDeletedTask(id)}
					onCheckedTask={() => onCheckedTask(id)}
					editTask={() => editTask(id)}
					editLabel={editLabel}
				/>
			)
		})
		return (
			<section className="main">
				<ul className="todo-list">{elements}</ul>
			</section>
		)
	}
}

export default TaskList
