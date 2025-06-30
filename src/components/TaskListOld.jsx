import React, { useCallback } from 'react'
import FolderImg from "../assets/folder-white.svg"
import TaskTile from './TaskTile'


export default function TaskListOld({
  // Accepted everything as a props
    tasks, 
    fetchAllTasks,
    showViewTaskScreen,   
    showCreateTaskScreen,
    showEditTaskScreen,
    setActiveTaskId,
    setTasks,
    changeTaskStatus,
    boardView,
    setBoardView,
  }) 
  
  {


    function to show setActiveTask
    const viewTask = useCallback(function(task){
      setActiveTask(task);
      showViewTaskScreen();
    }, [setActiveTask, showViewTaskScreen]
  );

  return 
  (
    <div className='task-list-screen content-section'>
      <div className="content-section-container">
        <div className="task-list-header-main">
            <p className='task-heading'>🔥 Task</p>
            <button className="add-task-btn cursor-pointer" onClick={showCreateTaskScreen}>
                <img src={FolderImg} alt="Add Task Icon" />
                Add New Task
            </button>
        </div>

        <div className="task-list-container">
            {/* -> METHOD-1 */}
            {/* <TaskTile /> */}     

            {/* -> METHOD-2 -> if u want to add same type of elements multiple time use map()method*/}
            {tasks.map((task) => (
              // <TaskTile taskObj = {task}/> 
              <TaskTile key={task._id + "-task-tile"} 
                        task={task} 
                        fetchAllTasks={fetchAllTasks} 
                        setActiveTask={setActiveTask} 
                        showEditTaskScreen={showEditTaskScreen}
                        onClick={() => viewTask(task)}               
                        />
            ))}
            
        </div>
      </div>
    </div>
  )
}
