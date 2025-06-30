import React from 'react'
import UserIcon from "../assets/user-task.jpg";
import FolderWhite from "../assets/folder-white.svg";

export default function NoTask({showCreateTaskScreen}) {
  return (
    <div className='flex flex-col items-center justify-center content-section'>
      <div className="content-selection-container flex flex-col justify-center">
        <img src={UserIcon} alt="User with no pending tasks" loading='lazy'/>
        <br /> <br />
        <h1 className='no-task-primary-text'>Hurray!!, You're all done</h1>
        <p className="no-task-secondary-text">
          {" "} 
          There are no tasks added yet. Click button to add a new task
        </p>
        <button className="btn btn-green create-task-btn" onClick={showCreateTaskScreen}>
            <img src={FolderWhite} alt="Create task item" />
            Create New Task
        </button>   
      </div>
    </div>
  )
}
