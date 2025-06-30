import React, { useCallback, useState } from 'react'
import EditTaskImg from "../assets/edit-task-logo.svg"
import InputField from '../ui/InputField'
import TitleImg from "../assets/title-placeholder-img.svg"
import Memo from "../assets/memo.svg"
import Calender from "../assets/calendar.svg"
import clsx from 'clsx'
import updateTaskAPI from './api/updateTask'

export default function EditTask({task, fetchAllTasks, showTaskListScreen}) {

  // pre-filled input values 


  // ?? -> if it is comming
  const [taskTitle, setTaskTitle] = useState(task.title ?? "" );
  const [taskDescription, setTaskDescription] = useState(task.description ?? "" );
  const [taskDueDate, setTaskDueDate] = useState(task.due_date ? new Date(task.due_date) : undefined );
  const [loading, setLoading] = useState(false);
  
  const handleTitleChange = function(e){
    setTaskTitle(e.target.value);
  }
  const handleDescriptionChange = function(e){
    setTaskDescription(e.target.value);
  }
  const handleDateChange = function(date){
    setTaskDueDate(date);
  }

  // Before Sending the data let's validate the values
  const validate = function(values){
    const {taskTitle, taskDescription} = values;
    if(taskTitle && taskDescription){
      return true;
    }
    else{
      const errorMsg = "Please fill out the title and description";
      console.log(errorMsg);
      alert(errorMsg);
      return false;
      
    }
  };


  const handleResponse = useCallback(function(responseData){
    if(responseData.success){
      console.log("data fetched successfully");
      fetchAllTasks();      
    }
  }, [fetchAllTasks]);


  const handleError = function(errorMsg){
      alert(errorMsg);
      console.log(errorMsg);
  };



  const editTask = useCallback(function(taskId, values){
      updateTaskAPI(values, taskId, handleResponse,handleError, setLoading);
    }, [handleResponse]);


    // this event handler will be used for calling updateTaskAPI/EditTask
    const handleEditTask = useCallback(function(){
      const values = {taskTitle, taskDescription, taskDueDate};
      const isValid = validate(values);
      if(isValid){
        editTask(task._id, values);
      }
    },[editTask, task._id, taskDescription, taskTitle, taskDueDate]);
  

  return (
    <div className='create-task-section'>
      <div className="create-task-card">
        <img src={EditTaskImg} alt="Edit task icon" width={263}/>
        <h1 className='create-task-title-text'>Edit Task</h1>

        {/* This page will Have Pre-defined Values */}
        <InputField name="edit-task-title" label="Title" type="text" inputImg={TitleImg} placeholder="Title" value={taskTitle} onChange={handleTitleChange} />

        <InputField name="edit-task-description" label="Description" type="textarea" inputImg={Memo} placeholder="Description" value={taskDescription} onChange={handleDescriptionChange} className="input-margin"/>
        
        <InputField name="edit-task-due-date" label="Due Date" value={taskDueDate} type="date" inputImg={Calender} placeholder="Due Date" className="input-margin" onChange={handleDateChange}/>

        <div className="add-edit-task-btns">
            <button className={clsx("btn", "edit-task-btn", loading ? "disabled-delete-btn" : "cursor-pointer")} disabled = {loading} onClick={handleEditTask}>Save</button>
            <button className='btn cancel-btn cursor-pointer' onClick={showTaskListScreen}>Cancel</button>
        </div>

      </div>
    </div>
  )
}
