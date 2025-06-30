import React from "react";
import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import DeleteTask from "../ui/DeleteTask";
import Loading from "../ui/Loading";
import fetchTaskAPI from "./api/fetchTasks";


export default function TaskMain(){

    // We Manage the current Screen/routing through state in a single page application 

    function fetchAllTasks()    {
        fetchTaskAPI(handleResponse, handleError);
    }

    function handleResponse(data){
        console.log("Data Fetched");
        console.log(data.tasks);
        
    }

    function handleError(errorMessage){
        alert(errorMessage)
    }

    return <div>
        {/* No task */}
        {/* <NoTask /> */}

        {/* Create Task */}
        {/* <CreateTask /> */}

        {/* Update Task */}
        {/* <EditTask /> */}

        {/* Get all Tasks */}
        {/* <TaskList /> */}

        {/* <ViewTask /> */}

        {/* Delete task*/}
        {/* <DeleteTask /> */}

        {/* <Loading /> */}

        <button onClick={fetchAllTasks}>Check Data</button>

    </div>
}