import React from 'react'
// import ReactDOM from "react-dom";
import './NewTaskForm.css'

const NewTaskForm = ({ onAddedTask }) => {
  const addedTask = (event) => {
    if (event.key === 'Enter' && event.target.value.length !== 0) {
      onAddedTask(event.target.value)
      event.target.value = ''
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyDown={addedTask} />
    </header>
  )
}

export default NewTaskForm
