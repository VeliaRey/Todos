import React, { Component } from 'react'
// import ReactDOM from "react-dom";
import './App.css'

import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import TaskList from '../TaskList/TaskList'

class App extends Component {
	constructor() {
		super()
		this.state = {
			todoData: [],
			status: 'all',
		}
	}
	createTodoTask(label) {
		let maxId = 100
		return {
			label,
			id: maxId++,
			done: false,
			edit: false,
			createDate: new Date(),
		}
	}

	onDeletedTask = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id)

			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
			return {
				todoData: newArray,
			}
		})
	}

	onAddedTask = (text) => {
		const newItem = this.createTodoTask(text)

		this.setState(({ todoData }) => {
			const newArr = [...todoData, newItem]
			return {
				todoData: newArr,
			}
		})
	}

	onCheckedTask = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: todoData.map((el) => {
					if (el.id === id) {
						el.done = !el.done
					}
					return el
				}),
			}
		})
	}

	changeStatus = (value) => {
		this.setState(() => {
			return {
				status: value,
			}
		})
	}

	taskFilter = () => {
		const { status, todoData } = this.state

		if (status === 'Completed') {
			return todoData.filter((el) => el.done === true)
		} else if (status === 'Active') {
			return todoData.filter((el) => el.done === false)
		} else {
			return todoData
		}
	}

	clearCompleted = () => {
		this.setState(({ todoData }) => {
			const newArray = todoData.filter((el) => el.done === false)
			return {
				todoData: newArray,
			}
		})
	}

	editTask = (id) => {
		this.setState(({ todoData }) => {
			return {
				todoData: todoData.map((el) => {
					if (el.id === id) {
						el.edit = !el.edit
					}
					return el
				}),
			}
		})
	}

	editLabel = (label) => {
		this.setState(({ todoData }) => {
			return {
				todoData: todoData.map((el) => {
					if (el.edit) {
						el.label = label
					}
					return el
				}),
			}
		})
	}

	render() {
		const doneCount = this.state.todoData.filter((el) => !el.done).length
		console.log(this.state)

		return (
			<>
				<NewTaskForm onAddedTask={this.onAddedTask} />
				<TaskList
					todos={this.taskFilter()}
					onDeletedTask={this.onDeletedTask}
					onCheckedTask={this.onCheckedTask}
					editTask={this.editTask}
					editLabel={this.editLabel}
				/>
				<Footer doneCount={doneCount} changeStatus={this.changeStatus} clearCompleted={this.clearCompleted} />
			</>
		)
	}
}

export default App
