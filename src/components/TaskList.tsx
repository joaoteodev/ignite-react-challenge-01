import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [statusVerify, setStatusVerify] = useState('');
  const [inputStatus, setInputStatus] = useState(false);
  const [bounceStatus, setBounceStatus] = useState(false);

  function bouceInput() {
    setBounceStatus(true)

    setTimeout(() => setBounceStatus(false), 1000)
  }

  function handleInputTask(taskName: string) {
    setNewTaskTitle(taskName)
    setStatusVerify("")
  }

  function handleBlurTask() {
    if(!newTaskTitle.trim()) {
      setInputStatus(true)
      setStatusVerify("Please enter the task name")
      bouceInput()

    } else {
      setInputStatus(false)
      setStatusVerify("")
    }
  }

  function handleCreateNewTask() {
      if (!newTaskTitle.trim()) {
        setInputStatus(true)
        setStatusVerify("Please enter the task name")
        bouceInput()
      } else {
        setInputStatus(false)
        setStatusVerify("")
        setTasks(prevState => [...tasks, {id: Math.round(Math.random() * 1000), title: newTaskTitle, isComplete: false}])
        setNewTaskTitle('')
      }
  
  }

  function handleToggleTaskCompletion(id: number) {
    setTasks(tasks.map((task) => task.id === id ? {...task, isComplete: !task.isComplete} : task))
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <section className="task-list container">
      <header>
        <h2>My tasks</h2>

        <div className={`input-group ${inputStatus === true ? "input-error": ""}`}>
          <input 
            type="text" 
            placeholder="Add new task" 
            onChange={(e) => handleInputTask(e.target.value)}
            onKeyDownCapture={e => e.key === 'Enter' && handleCreateNewTask()}
            value={newTaskTitle}
            onBlur={handleBlurTask}
            className={bounceStatus == true ? "bounce" : ""}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        <p className="verify-status">{statusVerify}</p>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}