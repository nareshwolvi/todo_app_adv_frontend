import React, { useCallback, useState } from 'react'
import CheckedBlue from "../assets/blue-checked.svg"
import AlarmClock from '../assets/alarm-clock.svg'
import Edit from "../assets/edit.svg"
import Delete from "../assets/delete.svg"
import moment from 'moment'
import DeleteTask from '../ui/DeleteTask'
import TagIcon from "../assets/red-tag.svg"
import StatusDropdown from './StatusDropdown'

export default function TaskTile({
            task,
            onClick,
            fetchAllTasks,
            changeTaskStatus,
            setActiveTaskId,
            showEditTaskScreen,
            boardView,
}) {

    const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

    const handleEditTask = useCallback(function (event){

        //event.stopPropagation(); -> without this bubbling is happening
        //In this case, parent element that is task-tile-container have an onCkick property and 
        // also child element(edit-container) onClick Property. Because of the event bubbling, when we click on the edit button, 
        // it open the viewTaskScreen. Which can be stopped using e.stopPropagation
        event.stopPropagation();
        setActiveTaskId(task._id);
        showEditTaskScreen();
    }, [setActiveTaskId, showEditTaskScreen, task._id]);


    function handleDeleteTask(event){
        event.stopPropagation();
        setShowDeleteTaskPopup(true);
    } 

    function closeDeleteTaskPopup(){
        setShowDeleteTaskPopup(false);
    }
    
  return (
    <>
        {/* <div className="task-tile-container cursor-pointer" 
            // this onClick is to view the task(Enlarged Screen)
             onClick={onClick}>
            <span className='task-icon-wrapper'>
                <img src={CheckedBlue} alt="Task icon"  className="task-icon"/>
            </span>
            <div className="task-text-wrapper">
                <p className="task-primary-text">{task?.title}</p>
                <p className="task-secondary-text">{task?.description}</p>
            </div>
            <div className="action-items-container">
                {
                    task?.due_date &&(
                        <div className="flex date-container">
                            <img src={AlarmClock} alt="clock-icon" />
                            <p className="date-text">
                                {moment(task.due_date).format("DD/MMM/YYYY")}
                            </p>
                        </div>
                    )
                }
                <div className="edit-container cursor-pointer" onClick={handleEditTask}>
                    <img src={Edit} alt="Edit task icon" />
                </div>

                <div className="delete-container cursor-pointer" >
                    <img src={Delete} alt="Delete task icon" onClick={handleDeleteTask} />
                </div>
            </div>
        </div> */}

        <div className="task-tile-container" onClick={onClick}>
            <div>
                <div className="flex">
                    <span className="task-icon-wrapper">
                        <img src={CheckedBlue} alt="Task Icon" />
                    </span>
                    <div className='task-text-wrapper'>
                        <p className="task-primary-text">{task?.title}</p>
                        <p className="task-secondary-text">{task?.description}</p>
                    </div>
                </div>
                {!boardView && task.labels.length ? (
                    <span className='labels-icon-wrapper'>
                        <img src={TagIcon} alt="Label icon" />
                        <span className="labels-row">
                            {task.labels.map((label) => (<span key={`${task._id}-${label}`}>{label} {" "}</span>))}
                        </span>
                    </span>
                ) : null}
            </div>

            
            <div className="status-action-items">

                {/* Status DropDown */}
                <StatusDropdown
                            value={task.status}
                            taskId={task._id}
                            changeTaskStatus={changeTaskStatus}
                
                />

                <div className="action-items-container">
                    {task.due_date && (
                        <div className="flex date-container">
                            <img src={AlarmClock} alt="clock-icon" />
                            <p className="date-text">
                                {moment(task.due_date).format("DD MM YYYY")}
                            </p>
                        </div>
                    )}
                    
                    {/* Edit Task */}
                    <div className="edit-container cursor-pointer" onClick={handleEditTask}>
                        <img src={Edit} alt="Edit Task Icon" />
                    </div>

                    {/* Delete Task */}
                    <div className="delete-container cursor-pointer" onClick={handleDeleteTask}>
                        <img src={Delete} alt="Delete Task Icon" />
                    </div>
                </div>
            </div>
            {boardView && task.labels.length ? (
                    <span className='labels-icon-wrapper'>
                        <img src={TagIcon} alt="Label icon" />
                        <span className="labels-row">
                            {task.labels.map((label) => (<span key={`${task._id}-${label}`}>{label}</span>))}
                        </span>
                    </span>
                ) : null}
        </div>
        

        <DeleteTask isOpen={showDeleteTaskPopup} 
                    onClose={closeDeleteTaskPopup} 
                    task={task} 
                    fetchAllTasks={fetchAllTasks} />
    </>
  )
}
