import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Task.css'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

class Task extends Component {
	static defaultProps = {
		onCheckedTask: () => {},
		onDeletedTask: () => {},
	}

	static propTypes = {
		label: PropTypes.string,
		onDeletedTask: PropTypes.func,
		done: PropTypes.bool,
		onCheckedTask: PropTypes.func,
	}

	state = {
		newLabel: '',
	}

	render() {
		const {
			label,
			onDeletedTask,
			done,
			onCheckedTask,
			editTask,
			edit,
			editLabel,
			createDate,
			onTimerStart,
			onTimerStop,
			min,
			sec,
		} = this.props
		const { newLabel } = this.state

		const handleClick = (e) => {
			// e.stopPropagation()
			e.stopPropagation()
			editTask()
		}

		const handleEdit = (event) => {
			// event.stopPropagation()
			event.preventDefault()
			editLabel(newLabel)
			editTask()
		}

		const handleChange = (e) => {
			// e.stopPropagation()
			this.setState(() => {
				return {
					newLabel: e.target.value,
				}
			})
		}

		var result = formatDistanceToNow(createDate, { includeSeconds: true })

		return (
			<li className={done ? 'completed' : edit ? 'editing' : null}>
				<div className="view">
					<input id="check" className="toggle" type="checkbox" checked={done} readOnly onClick={onCheckedTask} />
					<label htmlFor="check">
						<span className="title">{label}</span>
						<span className="description">
							<button className="icon icon-play" onClick={onTimerStart}></button>
							<button className="icon icon-pause" onClick={onTimerStop}></button>
							<p className="time-task">
								{min < 10 ? `0${min}` : min}:{sec < 10 ? `0${sec}` : sec}
							</p>
						</span>
						<span className="description">created {result} ago</span>
						{/* <span className="created"></span> */}
					</label>
					<button className="icon icon-edit" onClick={handleClick}></button>
					<button className="icon icon-destroy" onClick={onDeletedTask}></button>
				</div>
				{edit && (
					<form onSubmit={handleEdit}>
						<input type="text" className="edit" defaultValue={label} onChange={handleChange} />
					</form>
				)}
			</li>
		)
	}
}

export default Task
