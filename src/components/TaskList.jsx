// import React, { useCallback, useMemo, useState } from 'react'
// import FolderImg from "../assets/folder-white.svg"
// import TaskTile from './TaskTile'
// import clsx from 'clsx'
// import TaskListSidebar from './TaskListSidebar';
// import SearchTask from '../ui/SearchTask';

// export default function TaskList({
//   // Accepted everything as a props
//     tasks, 
//     fetchAllTasks,
//     showViewTaskScreen,   
//     showCreateTaskScreen,
//     showEditTaskScreen,
//     setActiveTaskId,
//     setTasks,
//     changeTaskStatus,
//     boardView,
//     setBoardView,
//     // showSearchResults,`
//   }) 
//   {

//     const [searchQuery, setSearchQuery] = useState("");
//     const [filteredTasks, setFilteredTask] = useState([]);

//     const handleViewTask = useCallback((taskId) => {
//         setActiveTaskId(taskId);
//         showViewTaskScreen();
//     }, [setActiveTaskId, showViewTaskScreen]);

//     // Check if user has searched anything or not
//     // Since we need the compute based on the search query, that's why we have written the SearchQuery on the common parent, 
//     // and we need the filterTask to show the output
//     const showSearchResults = useMemo(() => Boolean(searchQuery.trim().length), [searchQuery]) ;

//   return (
//         <div className='task-list-screen content-section'>
//             {/* left container sidebar */}
//             <div className="task-list-left-container">
//                 <p className="task-heading">🐦‍🔥 Task</p>
//                 {/* Task Side bar */}
//                 <TaskListSidebar
//                             boardView={boardView}
//                             setBoardView={setBoardView}
//                             setTasks={setTasks}
//                 />

//             </div>

//                 {/* right container for task-list */}
//                 <div className="task-list-right-container">
//                     {/* Header with search and add task button */}
//                     <div className="task-list-right-header">
//                         {/* search bar component */}
//                         <SearchTask placehoder="Search title and description" 
//                                     tasks={tasks} 
//                                     setFilteredTask={setFilteredTask}
//                                     searchQuery={searchQuery}
//                                     setSearchQuery={setSearchQuery}
                                    
//                                     />

//                         <button onClick={showCreateTaskScreen} className='add-task-btn cursor-pointer'><img src={FolderImg} alt="Add Task icon" />
//                             Add New Task
//                         </button>
//                     </div>


//                     {/* Task list Section */}
//                     <div className={clsx("task-list-right-section", boardView && "board-view")}>

//                         {(showSearchResults ? filteredTasks : tasks).map((task) => (
//                         <TaskTile   
//                                 // key={`${task._id}-${showSearchResults ? "result-title" : "task-tile"}`}
//                                 // key={`${task._id}-${"task-tile"}`}
//                                 task={task}
//                                 onClick={() => handleViewTask(task._id)}
//                                 fetchAllTasks={fetchAllTasks}
//                                 changeTaskStatus={changeTaskStatus}
//                                 setActiveTaskId={setActiveTaskId}
//                                 showEditTaskScreen={showEditTaskScreen}
//                                 boardView={boardView}
//                         />
//                         ))}
//                     </div>
//                 </div>
//         </div>
//   )
// }


// UPDATED
import React, { useState, useMemo, useCallback } from 'react'
import TaskTile from './TaskTile'
import clsx from 'clsx';
import FolderImg from "../assets/folder-white.svg"
import TaskListSidebar from './TaskListSidebar';
import SearchTask from '../ui/SearchTask';

export default function TaskList({
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
}) {

    const [searchQuery, setSearchQuery] = useState("");
    // const [filteredTasks, setFilteredTasks] = useState([]);

    const handleViewTask = useCallback((taskId) => {
        setActiveTaskId(taskId);
        showViewTaskScreen();
    }, [setActiveTaskId, showViewTaskScreen]);

    // Filter tasks based on search query
    const filteredTasksList = useMemo(() => {
        if (searchQuery.trim()) {
            return tasks.filter((task) => 
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return tasks;
    }, [searchQuery, tasks]);

    const showSearchResults = useMemo(() => Boolean(searchQuery.trim().length), [searchQuery]);

    return (
        <div className='task-list-screen content-section'>
            {/* Left container sidebar */}
            <div className="task-list-left-container">
                <p className="task-heading">🐦‍🔥 Task</p>
                <TaskListSidebar
                    boardView={boardView}
                    setBoardView={setBoardView}
                    setTasks={setTasks}
                />
            </div>

            {/* Right container for task-list */}
            <div className="task-list-right-container">
                {/* Header with search and add task button */}
                <div className="task-list-right-header">
                    <SearchTask 
                        placeholder="Search title and description" 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                    <button onClick={showCreateTaskScreen} className='add-task-btn cursor-pointer'>
                        <img src={FolderImg} alt="Add Task icon" />
                        Add New Task
                    </button>
                </div>

                {/* Task list Section */}
                <div className={clsx("task-list-right-section", boardView && "board-view")}>
                    {(showSearchResults ? filteredTasksList : tasks).map((task) => (
                        <TaskTile   
                            key={task._id}
                            task={task}
                            onClick={() => handleViewTask(task._id)}
                            fetchAllTasks={fetchAllTasks}
                            changeTaskStatus={changeTaskStatus}
                            setActiveTaskId={setActiveTaskId}
                            showEditTaskScreen={showEditTaskScreen}
                            boardView={boardView}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
