import React, { useState } from 'react'
// import ReactDOM from "react-dom";
import './NewTaskForm.css'

const NewTaskForm = ({ onAddedTask }) => {
	const [label, setLabel] = useState('')
	const [min, setMin] = useState('')
	const [sec, setSec] = useState('')
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		label: '',
	// 		min: '',
	// 		sec: '',
	// 	}
	// }

	// render() {
	// const { onAddedTask } = this.props
	// const { label, min, sec } = this.state
	const addedTask = (event) => {
		event.stopPropagation()
		event.preventDefault()
		onAddedTask(label, min, sec)
		setLabel('')
		setMin('')
		setSec('')
		// this.setState({
		// 	label: '',
		// 	min: '',
		// 	sec: '',
		// })
	}

	const addedTaskLabel = (e) => {
		// this.setState({
		// 	label: e.target.value,
		// })
		setLabel(e.target.value)
	}

	const addedTaskMin = (e) => {
		// this.setState({
		// 	min: e.target.value,
		// })
		setMin(e.target.value)
	}

	const addedTaskSec = (e) => {
		// this.setState({
		// 	sec: e.target.value,
		// })
		setSec(e.target.value)
	}

	return (
		<header className="header">
			<h1>todos</h1>
			<form className="new-todo-form" onSubmit={addedTask}>
				<button type="submit" />
				<input className="new-todo" placeholder="Task" autoFocus onChange={addedTaskLabel} value={label} />
				<input className="new-todo-form__timer" placeholder="Min" autoFocus onChange={addedTaskMin} value={min} />
				<input className="new-todo-form__timer" placeholder="Sec" autoFocus onChange={addedTaskSec} value={sec} />
			</form>
		</header>
	)
	// }
}
export default NewTaskForm
