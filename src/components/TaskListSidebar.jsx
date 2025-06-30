import clsx from 'clsx'
import React, { useCallback, useEffect, useState } from 'react'
import List from "../assets/list-view.svg";
import Board from "../assets/board.svg";
import getLabelsAPI from "../components/api/getLabel.js"
import CheckBox from '../ui/CheckBox.jsx';
import fetchTaskAPI from "./api/fetchTasks.js";
import DropdownSortBy from "../ui/DropdownSortBy.jsx";

// Creating a database for Status Option
const statusOptions = [
    {
        display: "Open",
        value: "Open"
    },
    {
        display: "In-Progress",
        value: "In-Progress"
    },
    {
        display: "Completed",
        value: "Completed"
    },
];

const sortOptions = [
    {label: "Date Added", value: "added-on"},
    {label: "Due Date", value: "due_date"},
]

export default function TaskListSidebar({boardView, setBoardView, setTasks}) {
    // State to manage labels, selected labels, selected Status, sortOption
    const [labels, setLabels] = useState([]);
    const [selectedLabels, setselectedLabels] = useState([]);
    const [selectedStatus, setselectedStatus] = useState([]);
    const [sortOption, setSortOption] = useState("");

    // fetch all labels
    useEffect(() => {
        const handleResponse = (responseData) => {
            setLabels(responseData.labels);
        };

        const handleError = (errorMsg) =>{
            alert(errorMsg);
            console.error(errorMsg);
            
        };
        getLabelsAPI(handleResponse, handleError);
    }, []);


    // Callback functions to handle selection and de-selection of status and labels
    const selectStatus = useCallback(function(statusToAdd){
        setselectedStatus((prevStatus) => prevStatus.includes(statusToAdd) ? prevStatus : [...prevStatus, statusToAdd]);
    }, []);  

    const removeStatus = useCallback(function(statusToRemove){
        setselectedStatus((prevStatus) => prevStatus.filter((status) => status !== statusToRemove));
    }, []);  

    const selectLabel = useCallback(function(labelToAdd){
        setselectedLabels((prevLabels) => prevLabels.includes(labelToAdd) ? prevLabels : [...prevLabels, labelToAdd]);
    }, []);  

    const removeLabel = useCallback(function(labelToRemove){
        setselectedLabels((prevLabels) => prevLabels.filter((label) => label !== labelToRemove));
    }, []);  


    const handleStatusCheckbox = (event, value) => {
        if(event.target.checked){
            selectStatus(value);
        }
        else{
            removeStatus(value);
        }
    }

    const handleLabelCheckbox = (event, value) => {
        if(event.target.checked){
            selectLabel(value);
        }
        else{
            removeLabel(value);
        }
    }

    const handleResponse = useCallback((responseData) => {
        setTasks(responseData.tasks); 
    }, [setTasks]);

    const handleError = useCallback((errorMsg) => {
        alert(errorMsg);
        console.log(errorMsg);   
        
    }, []);


    useEffect(() => {
        const options = {
            sortOption,
            selectedStatus,
            selectedLabels,
        };
        fetchTaskAPI(handleResponse, handleError, options)
    }, [handleResponse, handleError,selectedStatus, selectedLabels, sortOption]);

    const enableBoardView = useCallback(() => setBoardView(true), [setBoardView]);
    const enableListView = useCallback(() => setBoardView(false), [setBoardView]);

  return (
    <aside className='task-list-left-section'>
        <div>
            <p className="left-section-label">View</p>
            <div className="view-toggle-container">
                {/* List view Toggle */}
                <div    onClick={enableListView}
                        className={clsx("view-toggle", !boardView && "active-toggle")}>
                    <img src={List} alt="List Icon" />
                    <p className='list-label'>List</p>
                </div>
                {/* Board view Toggle */}
                <div    onClick={enableBoardView} 
                        className={clsx("view-toggle", boardView && "active-toggle")}>
                    <img src={Board} alt="Board Icon" />
                    <p className='list-label'>Board</p>
                </div>
            </div>
        </div>

        {/* Task Status Section */}
        <div className="task-sidebar-child-section">
            <p className="left-section-label">Task Status</p>
            {/* Render Checkbox for each status option -> help us to select particular status */}
            {statusOptions.map((status) => {
                const handleClick = (event) => handleStatusCheckbox(event, status.value);
                return(
                    <CheckBox   key={status.value + "-checkbox"} 
                                label={status.display} 
                                onClick={handleClick}
                    />      
                );
            })}
        </div>

        {/* SortBy Section */}
        <div className="task-sidebar-child-section">
            <p className="left-section-label">Sort By</p>
            {/* Drop Down for Sorting Options */}
            <DropdownSortBy placeholder="Select" 
                            value={sortOption}
                            onChange={setSortOption}
                            options={sortOptions}
            />
        </div>

        {/* Label section */}
        <div className="task-sidebar-child-section">
            <p className="left-section-label">Label</p>
            {!labels.length && (<span className='no-label-Text'>No label created yet</span>)}
            
            {/* Render checkboxes for each label */}
            {labels.map((label) => {
                const handleClick = (event) => handleLabelCheckbox(event, label);
                return <CheckBox 
                            key={label}
                            label={label}
                            onClick={handleClick}
                        />;
            })}
        </div>
    </aside>
     ) 
}
