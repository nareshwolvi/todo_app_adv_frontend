import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import changeStatusAPI from "./api/changeStatus";
import DropDown from "../assets/white-down-arrow.svg"
import clsx from 'clsx';

const options = [
    {   display: "Open", 
        value:"Open", 
        className:"status-open"
    },
    {   display: "In Progress", 
        value:"In-Progress", 
        className:"status-in-progress"
    },
    {   display: "Completed", 
        value:"Completed", 
        className:"status-completed"
    },

];

export default function StatusDropdown({
    value= options[0].value,
    taskId,
    changeTaskStatus,
}) {

    // State to manage loading state
    const [loading, setLoading] = useState(false);
    // State to manage the dropdown
    const [isOpen, setIsOpen] = useState(false);

    //Reference to dop down -> "useRef" helps to optimize the code
    const dropdownRef = useRef(null);

    // Memoized current status
    const currentStatus = useMemo(() => options.find((option) => option.value === value), [value]);

    // This useEffect hooks adds an eventListener to detect clicks outside of the dropdown
    // When a click occurs outside of the dropdown it closes the dropdown
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setIsOpen(false);
            }
        };

        // Add eventlistener for mousedown event on the entire document
        document.addEventListener("mousedown", handleOutsideClick);

        // Clean Up function to remove eventListener when the component unmounts or When the dependencies change
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Callback function to toggle dropdown visibility
    const toggleDropdown = useCallback(
        function(event){
            event.stopPropagation();
            setIsOpen(isOpen => !isOpen)
        }
    )

    const handleResponse = useCallback((responseData) => {
        const {task} = responseData;
        // Change status in local state updating database
        changeTaskStatus(task.status, task._id);
    }, [changeTaskStatus]);

    const handleError = useCallback((errorMsg) => {
        console.error(errorMsg);
        alert(errorMsg);
        
    },[]);


    const handleStatusChange = useCallback((newValue) => {
        if(newValue !== value){
            changeStatusAPI(newValue, taskId, handleResponse, handleError, setLoading);
        }
        setIsOpen(false);
    }, [handleError, handleResponse, taskId, value]);

    const handleOptionClick = useCallback((event, value) => {
        event.stopPropagation();
        handleStatusChange(value);
    }, [handleStatusChange]);

  return (
    <div className='status-dropdown' ref={dropdownRef}> 
      <button type='button' className={clsx("status-btn", currentStatus.className)} disabled={loading} onClick={toggleDropdown}>
        {currentStatus.display}
        {!loading && <img src={DropDown} alt='ToggleDropdown' />}
      </button>

      {isOpen && (
            <ul className='dropdown-menu'>
                {options.map((option) => {
                    const handleClick = (event) => {
                        handleOptionClick(event, option.value);
                        }
                        return(
                            <li className="dropdown-item" onClick={handleClick}>
                                {option.display}
                            </li>
                        );
                })}
            </ul>
        )}

      {/* <ul className="dropdown-menu">
        <li className="dropdown-item">Open</li>
        <li className="dropdown-item">In-Progress</li>
        <li className="dropdown-item">Completed</li>
      </ul> */}
    </div>
  );
}
