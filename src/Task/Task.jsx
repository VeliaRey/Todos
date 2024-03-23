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
    const { label, onDeletedTask, done, onCheckedTask, editTask, edit, editLabel, createDate } = this.props
    const { newLabel } = this.state

    const handleClick = (e) => {
      e.stopPropagation()
      editTask()
    }

    const handleEdit = (event) => {
      event.preventDefault()
      editLabel(newLabel)
      editTask()
    }

    const handleChange = (e) => {
      this.setState(() => {
        return {
          newLabel: e.target.value,
        }
      })
    }
    // const currentDate = ;

    var result = formatDistanceToNow(createDate, { includeSeconds: true })

    return (
      <li className={done ? 'completed' : edit ? 'editing' : null}>
        <div className="view" onClick={onCheckedTask}>
          <input id={this.id} className="toggle" type="checkbox" checked={done} readOnly />
          <label>
            <span className="description">{label}</span>
            <span className="created">created {result} ago</span>
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
