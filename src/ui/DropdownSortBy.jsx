import { useRef } from 'react';
import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ArrowDown from "../assets/arrow-down.svg"

export default function DropdownSortBy({value, onChange, options, placeholder}) {

    // States to manage menu visibility
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Reference to select Element
    const selectRef = useRef(null);


    // function to handle Toggle
    const toggleMenuDisplay = useCallback(() => setIsMenuOpen((isMenuOpen) => !isMenuOpen), []);

    // close the menu while clicking outside
    useEffect(() => {
        function handleClickOutside(e){
            // console.log(e);      
            // if(e.target !== "value-container") {  //-> TYPE-1
            //     setIsMenuOpen(false);
            // }   
            if(selectRef.current && !selectRef.current.contains(e.target)){  // TYPE-2 USING STATE VAR
                setIsMenuOpen(false);
            }    
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle for option Change
    const handleOptionChange = useCallback(
        function(option){
            onChange(option);
            setIsMenuOpen(false);
        }, [onChange]);

    // Memoized selected option
    const selectedOption = useMemo(() => options.find((option) => 
        option.value === value
    ), [options, value]);

  return (
    <div className='dropdown-container' ref={selectRef}>
      <div className="vale-container" onClick={toggleMenuDisplay}>
        {/* Display Selected value or Placehoder */}
        <span className={clsx("dropdown-value", !value && "dropdown-placeholder")}>
            {/* {placeholder} */}
            
            {selectedOption?.label ?? placeholder} {/* if u selectedOption then show label if not selected show placeholder */}
        </span>
        <img src={ArrowDown} alt="Dropdown Icon" />
      </div>

      {isMenuOpen && (
        <div className="menu-list">
            {options.map((option) =>{
                return (
                    <div className="menu-list-option" key={option.value + "-option"} onClick={() => handleOptionChange(option.value)}>
                        {option.label}
                    </div>
                )
            })}
        </div>
      )}

      {/* <div className="menu-list">
        <div className="menu-list-option">
            Due Date 
        </div>
      </div> */}
    </div>
  )
}
