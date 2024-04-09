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
			status: 'All',
		}
	}
	createTodoTask(label, min, sec) {
		return {
			label,
			id: Math.ceil(Math.random() * (1000000 - 100000) - 100000),
			done: false,
			edit: false,
			createDate: new Date(),
			min,
			sec,
			timerStart: false,
			timerID: null,
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

	onAddedTask = (text, min, sec) => {
		const newItem = this.createTodoTask(text, min, sec)

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

	onTimerStart = (id) => {
		const { timerStart, min, sec } = this.state.todoData.find((el) => el.id === id)
		if (Number(min) + Number(sec)) {
			if (!timerStart) {
				const timerID = setInterval(
					() =>
						this.setState((prevState) => {
							const newTodo = prevState.todoData.map((todoItem) => {
								if (todoItem.id === id) {
									let stop = todoItem.min + todoItem.sec
									stop -= 1

									if (stop === 0) {
										clearInterval(timerID)
									}

									let seconds = todoItem.sec - 1
									let minutes = todoItem.min

									if (minutes > 0 && seconds < 0) {
										minutes -= 1
										seconds = 59
									}

									if (minutes === 0 && seconds < 0) {
										seconds = 0
										this.onTimerStop(id)
									}

									return {
										...todoItem,
										sec: seconds,
										min: minutes,
									}
								}
								return todoItem
							})

							return {
								todoData: newTodo,
							}
						}),
					1000
				)

				this.setState(({ todoData }) => {
					const idx = todoData.findIndex((el) => el.id === id)
					const data = [...todoData]
					data[idx].timerID = timerID
					data[idx].timerStart = true

					return {
						todoData: data,
					}
				})
			}
		}
	}

	onTimerStop = (id) => {
		const { timerStart } = this.state.todoData.find((el) => el.id === id)
		if (timerStart) {
			const { timerID } = this.state.todoData.find((el) => el.id === id)
			this.setState(({ todoData }) => {
				const idx = todoData.findIndex((el) => el.id === id)
				const data = [...todoData]
				data[idx].timerStart = false

				return {
					todoData: data,
				}
			})
			clearInterval(timerID)
		}
	}

	render() {
		const doneCount = this.state.todoData.filter((el) => !el.done).length
		const { status } = this.state
		return (
			<>
				<NewTaskForm onAddedTask={this.onAddedTask} />
				<TaskList
					todos={this.taskFilter()}
					onDeletedTask={this.onDeletedTask}
					onCheckedTask={this.onCheckedTask}
					editTask={this.editTask}
					editLabel={this.editLabel}
					onTimerStart={this.onTimerStart}
					onTimerStop={this.onTimerStop}
				/>
				<Footer
					doneCount={doneCount}
					changeStatus={this.changeStatus}
					clearCompleted={this.clearCompleted}
					status={status}
				/>
			</>
		)
	}
}

export default App
