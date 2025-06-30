import React, { useCallback, useState } from 'react'
import UserIcon from "../assets/user-task.jpg";
import InputField from '../ui/InputField';
import TitleImg from "../assets/title-placeholder-img.svg"
import Memo from '../assets/memo.svg';
import Calender from "../assets/calendar.svg";
import clsx from 'clsx';
import createTaskAPI from './api/createTask.js';


export default function CreateTask({ showTaskListScreen, fetchAllTasks }) {

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDueDate, setTaskDueDate] = useState();

  //Loading State
  const [loading, setLoading] = useState(false);
  
  const handleTitleChange = function(e){
    setTaskTitle(e.target.value);
  };
  const handleDescriptionChange = function(e){
    setTaskDescription(e.target.value);
  };
  const handleDateChange = function(date){  //no need of event handler, because it is comming from 3rd party
    setTaskDueDate(date);
  };

  const validate = function(values){
    // destructuring
    const {taskTitle, taskDescription} = values;
    // check if atleast the first 2 fields related to our task have truthy values or not
    if(taskTitle && taskDescription ){
      // valid
      return true;
    }
    else{
      // invalide
      const errMessage = "Please fill out the title and description";
      console.error(errMessage);
      alert(errMessage);
      return false;
    }
  };

  // handleResponse is handling fetchAllTasks() -> everytime we don't need to fetchAllTask, so use useCallback()
  const handleResponse = useCallback(function(responseData){
    if(responseData.success){
      console.log("handled Successfully");
      fetchAllTasks(); //This will once again Run TaskMain.jsx file
    }
  }, [fetchAllTasks]);


  const handleError = function(errorMsg){
    alert(errorMsg);
    console.log(errorMsg);
  }

  const createNewTask = useCallback(function(values){
    createTaskAPI(values, handleResponse, handleError, setLoading);
  }, [handleResponse]);



  const handleAddTask = useCallback(function(){
    // created values
    const values = {taskTitle, taskDescription, taskDueDate}; //we have to send it as an object

    // validation -> to check whether we sending correct data (or) undefined data
    const isvalid = validate(values);
    if(isvalid){
          // create task
          createNewTask(values);
    }
  }, [createNewTask, taskTitle, taskDescription, taskDueDate]);

  return (
    <div className='content-section create-task-section'>
      <div className='create-task-card'>
        <img src={UserIcon} width={263}/>
        <h1 className='create-task-title-text'>Create new Task</h1>
        <InputField name="new-task-title" label="Title" type="text" inputImg={TitleImg} placeholder="Title" value={taskTitle} onChange={handleTitleChange}/>
        <InputField name="new-task-description" label="Description" type="textarea" inputImg={Memo} placeholder="Description" className="input-margin" value={taskDescription} onChange={handleDescriptionChange}/>
        <InputField name="new-task-due-date" label="Due Date" type="date" inputImg={Calender} placeholder="Due date" className="input-margin" value={taskDueDate} onChange={handleDateChange}/>
        <div className="add-edit-task-btns">
            <button className={clsx("btn", "add-task-btn", "cursor-pointer")} disabled={loading} onClick={handleAddTask}>
              {loading ? "Adding Task" : "Add Task"}
            </button>
            <button className='btn cancel-btn cursor-pointer' onClick={showTaskListScreen}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
