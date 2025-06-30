import React, { useState } from 'react'
import Modal from '../ui/Modal'
import CheckedBlue from "../assets/blue-checked.svg"
import Cross from "../assets/cross-icon.svg"
import AlarmClock from "../assets/alarm-clock.svg"
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import moment from 'moment'
import DeleteTask from '../ui/DeleteTask'
import StatusDropdown from './StatusDropdown'
import TagIcon from "../assets/red-tag.svg"
import LabelSelector from "./LabelSelector"


export default function ViewTask({task, setActiveTaskId,fetchAllTasks,showEditTaskScreen, showTaskListScreen, changeTaskStatus}) {

    const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
    const [selectedLabels, setSelectedLabels] = useState(task.labels); // labels thar are linked to active task

    const handleEditTask = function(){
        // EditTask need 1 activeTask
        setActiveTaskId(task._id);
        showEditTaskScreen();
    }

    const openDeleteTaskPopup = () => setShowDeleteTaskPopup(true);
    const closeDeleteTaskPopup = () => setShowDeleteTaskPopup(false);


  return (
    <Modal isOpen={true}>
        <div className="flex justify-between view-task-header">
            <div className="flex">
                <span className='task-icon-wrapper'>
                    <img src={CheckedBlue} className='task-icon' alt='Task Icon' />
                </span>
                <h2 className="view-task-title">{task?.title}</h2>
            </div>
            <div className="flex">
                <StatusDropdown value={task.status}
                                taskId={task._id}
                                changeTaskStatus={changeTaskStatus}
                
                />
                <div className="close-modal-btn" onClick={showTaskListScreen}>
                    <img src={Cross} alt="Close Popup icon" />
                </div>
            </div>
        </div>

        
        <div className="flex">
            {/* LEFT SECTION */}
            <div className="view-task-left-section">
                <pre className="view-task-description">{task.description}</pre>
                {selectedLabels.length ? (
                    <span className='labels-icon-wrapper'>
                        <img src={TagIcon} alt="label icon" />
                        <span className='labels-row'>
                            {selectedLabels.map((label) => <span key={`${task._id}-${label}`}>{label}</span>)}
                        </span>
                    </span>
                ): null}
            </div>

            {/* RIGHT SECTION */}
            <div className="view-task-right-section">
                {task.due_date && (
                    <div className='view-task-info-box'>
                        <p className="label-14">Due Date</p>
                        <div className="flex-date-container">
                            <img src={AlarmClock} alt="Clock Icon" />
                            <p className="date-text">{moment(task.due_date).format("DD MM YYYY")}</p>
                        </div>
                    </div>
                    )}

            <LabelSelector  task={task}
                            selectedLabels={selectedLabels}
                            setSelectedLabels={setSelectedLabels}
            />

            <div className='view-task-info-box flex clickable' onClick={handleEditTask}>
                <img src={Edit} alt="Edit task button" width={16} height={16}/>
                <p className="label-12">Edit Task</p>
            </div>

            <div className='view-task-info-box flex clickable' onClick={openDeleteTaskPopup}>
                <img src={Delete} alt="Delete task button" width={16} height={16}/>
                <p className="label-12">Delete Task</p>
            </div>
            </div>
        </div>


        {/* need to Add Delete Component */}
        {showDeleteTaskPopup && (<DeleteTask isOpen={openDeleteTaskPopup} 
                                            onClose={closeDeleteTaskPopup} 
                                            task={task} 
                                            fetchAllTasks={fetchAllTasks} 
                                />)}
    </Modal>
  )
}
