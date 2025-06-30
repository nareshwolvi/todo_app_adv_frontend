import React, { useCallback, useEffect, useState } from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import DeleteTask from "../ui/DeleteTask";
import Loading from "../ui/Loading";
import fetchTaskAPI from "./api/fetchTasks";
import { useMemo } from "react";

// This is Parent Component
export default function TaskMain(){

    // We Manage the current Screen/routing through state in a single page application 

    // States needed to change from one page to next page
    const [currComponent, setCurrComponent] = useState("loading");  //currComponent->it helps us to re-direct to the Component
    const [tasks, setTasks] = useState([]);  //tasks -> comming from fetchAPI
    const [activeTaskId, setActiveTaskId] = useState("");
    const [boardView, setBoardView] = useState(false);


    // Memoized derived Computation
    const activeTask = useMemo(() => tasks.find((task) => task._id === activeTaskId),[tasks, activeTaskId]);

    // This all functions below telling u what does the setCurrComponent() value will have

   const showNoTaskScreen = useCallback(function(){
    setCurrComponent("noTask");
   }, []);

   const showTaskListScreen = useCallback(function(){
    setCurrComponent("taskList");
   }, []);

   const showCreateTaskScreen = useCallback(function(){ 
    setCurrComponent("createTask");
   }, []);

   const showEditTaskScreen = useCallback(function(){
    setCurrComponent("editTask");
   }, []);

   const showViewTaskScreen = useCallback(function(){
    setCurrComponent("viewTask");
   },[]);

// handleResponse -> function surrounded by/wrote inside  useCallback() function with dependency array
   const handleResponse = useCallback(
    function(responseData){
    const extractedTasks = responseData.tasks;
    setTasks(extractedTasks);
    if(extractedTasks.length){
        showTaskListScreen();
    }
    else{
        showNoTaskScreen();
    }
   },[showTaskListScreen, showNoTaskScreen]);

// handleError
   const handleError = useCallback((errorMessage) => {
    alert(errorMessage);
    console.log(errorMessage);
   }, []);

// fetchAllTasks
//const fetchAllTasks = function(){fetchTaskAPI(handleResponse, handleError);};   //Method-1
// use useCallback                                                                //Method-2

const fetchAllTasks = useCallback(() =>{
    fetchTaskAPI(handleResponse, handleError); 
},[handleResponse, handleError]);


// INTIAL EFFECT(Side effects -> getting data from server) -> useEffect will have function-> {} and dependency array-> []
// this useEffect() is goi
    useEffect(() => {
        fetchAllTasks();
    }, [fetchAllTasks]);


// Write the function to change task Status
   const changeTaskStatus = useCallback(function(status, taskId){

    // tasks.map((task) => {
    //     if(task._id === taskId) return { ...task, status};
    // });

    // Update the tasks state using the setTask setter function
    setTasks((prevTasks) => { //prevTasks is (tasks)->from state variable(line 19)
        return prevTasks.map((task) => {
            if(task._id === taskId) return { ...task, status};
            return task;
        });
    });
   }, []);

    return(
    <>
    {currComponent === "loading" && <Loading />}

    <div id="contaier-div">
        {currComponent === "noTask" && (<NoTask showCreateTaskScreen={showCreateTaskScreen} />)}
        {currComponent === "taskList" && <TaskList  tasks={tasks} 
                                                    fetchAllTasks={fetchAllTasks} 
                                                    showViewTaskScreen={showViewTaskScreen}   
                                                    showCreateTaskScreen={showCreateTaskScreen}
                                                    showEditTaskScreen={showEditTaskScreen}
                                                    setActiveTaskId={setActiveTaskId}
                                                    setTasks={setTasks}
                                                    changeTaskStatus = {changeTaskStatus}
                                                    boardView= {boardView}
                                                    setBoardView={setBoardView}
                                                    
                                                    />}

        {currComponent === "createTask" && (<CreateTask showTaskListScreen={showTaskListScreen} 
                                                        fetchAllTasks={fetchAllTasks}/>)}

        {currComponent === "viewTask" && <ViewTask  task={activeTask}
                                                    setActiveTaskId={setActiveTaskId}
                                                    fetchAllTasks={fetchAllTasks}
                                                    showEditTaskScreen={showEditTaskScreen}
                                                    showTaskListScreen={showTaskListScreen}
                                                    changeTaskStatus={changeTaskStatus} 
                                                    
                                                    />}

        {currComponent === "editTask" && (<EditTask  task={activeTask} 
                                                    fetchAllTasks={fetchAllTasks} 
                                                    showTaskListScreen={showTaskListScreen} />)}
    </div>
    </>
     ) ;
}