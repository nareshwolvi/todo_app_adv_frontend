import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import getLabelsAPI from './api/getLabel';
// import updateTaskAPI from './api/updateTask';
import updateLabelAPI from './api/updateLabel';
import BlueTag from "../assets/blue-tag-hollow.svg";
import Cross from "../assets/cross-icon.svg";

export default function LabelSelector({
    task, selectedLabels, setSelectedLabels, placeholder= "Type a label",
}) 
{

    const taskId = task._id;
    const [isOpen, setIsOpen] = useState(false);
    const [labels, setLabels] = useState([]); //All Labels
    const [searchInput, setSearchInput] = useState("");
    const [matchingLabels, setMatchingLabels] = useState([]); //Labels that mached the input

    const dropdownRef = useRef(null);
    const toggleSelector = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

    // A wrapper over `setMachingLabels` to ensure only unselected labels are displayed
    const handleSetMatchingLabels = useCallback(
        (matchingLabelsToSet) => {
            const filteredLabels = matchingLabelsToSet.filter(
                (label) => !selectedLabels.includes(label)
            );
            setMatchingLabels(filteredLabels);
        },
        [selectedLabels]
    );

    // Store all labels in state and display unselected one
    const handleGetLabelsResponse = useCallback((responseData) => {
        setLabels(responseData.labels);
        handleSetMatchingLabels(responseData.labels);
    }, [handleSetMatchingLabels]);

    const handleError = useCallback((errorMsg) => {
        console.error(errorMsg);
        alert(errorMsg);
        setIsOpen(false);
        }, []);

        // Initial useEffect
    useEffect(() => {
        // Handle closing the selector when clicked outside
        const handleOutsideClick = (event) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
                setIsOpen(false)
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);

        // Clean up function
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // Fetch all labels when selector opens
    useEffect(() => {
        if(isOpen) getLabelsAPI(handleGetLabelsResponse, handleError);
    }, [handleError, handleGetLabelsResponse, isOpen]);

    const handleUpdateResponse = useCallback(() => {
        // Fetch all labels again after updating labels of active task in backend, to make sure unselected labels are selected again
        // if linked to another task, otherwise they get erased from everywhere
        getLabelsAPI(handleGetLabelsResponse, handleError);
    }, [handleGetLabelsResponse, handleError]);


    // Effect fired when a label is created, selected or unselected
    useEffect(() => {
        updateLabelAPI(selectedLabels, taskId, handleUpdateResponse, handleError);

    }, [selectedLabels, taskId, handleUpdateResponse, handleError]);

    const handleInputChange = useCallback(
        (event) => {
            const inputValue = event.target.value;
            setSearchInput(inputValue);

            // Filter labels that contain search input
            const matching = labels.filter((label) => label.toLowerCase().include(inputValue.toLowerCase()));
            handleSetMatchingLabels(matching);
        },
        [handleSetMatchingLabels, labels]
    );

    // function to Select a Label
    const handleLabelSelect = useCallback((label) => {
        // Check if label already selected
        if(!selectedLabels.includes(label)){
            setSelectedLabels((prevSelectedLabels) => [...prevSelectedLabels, label]);
        }
        setSearchInput("");
        handleSetMatchingLabels([]);
    }, [handleSetMatchingLabels, selectedLabels, setSelectedLabels]);


    // function to Deselect a Label
    const handleLabelDeselect = useCallback((label) => {
        setSelectedLabels((prevSelectedLabels) => {
            prevSelectedLabels.filter((item) => item !== label)
        });
        setSearchInput("");
        handleSetMatchingLabels([]);
    }, [setSelectedLabels, handleSetMatchingLabels]);


    // function to Create a Label
    const handleCreateLabel = useCallback(() => {
        const newLabel = searchInput.trim();
        if(newLabel !== "" && !labels.includes(newLabel)){
            setLabels((prevLabels) => [...prevLabels, newLabel]);
            setSelectedLabels((prevSelectedLabels) => [...prevSelectedLabels, newLabel])
        }

        searchInput("");
        handleSetMatchingLabels([]);
    },[handleSetMatchingLabels, labels, searchInput, setSelectedLabels]);


    const isTyping = useMemo(
        () => Boolean(searchInput.trim().length),[searchInput]
    );

  return (
    <div className='label-selector-container' ref={dropdownRef}>
       <div className="view-task-info-box clickable flex" onClick={toggleSelector}>
            <img src={BlueTag} alt="label-icon" />
            <p className="label-12">Labels</p>
       </div>
       {isOpen && (
        <div className="label-selector label-12">
            <input  type="text" 
                    value={searchInput} 
                    onChange={handleInputChange} 
                    placeholder={placeholder}
            />
            <div className="labels-list-overflow">
                {/* Only show the selected labels when user is not typing */}
                {!isTyping && (
                    <ul className="selected-labels-list">
                        {selectedLabels.map((label) => (
                            <li key={`${label}-selected`} className='selected-label'>
                                <img src={BlueTag} width={13} height={13} alt="" />
                                {label}
                                <button onClick={() => handleLabelDeselect(label)}>
                                    <img src={Cross} alt="Deselect label button" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <ul className="matching-labels-list">
                    {matchingLabels.map((label) => (
                        <li key={`${label}-listed`} onClick={() => handleLabelSelect(label)} className='matching-label'>
                            <img src={BlueTag} width={13} height={13} />
                            {label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Only Show create button when user is typing and typed value doesn't exist */}
            {isTyping && !labels.includes(searchInput) && (
                <button onClick={handleCreateLabel} className='create-label-btn'>{" "} Create</button>
            )}
        </div>
       )}
    </div>
  );
}
