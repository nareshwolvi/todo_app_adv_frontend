// import React, { useCallback, useEffect, useRef } from 'react'
// import Search from "../assets/search.svg"

// export default function SearchTask({placehoder="Search title and description", 
//                                     tasks,
//                                     setFilteredTask,
//                                     searchQuery,
//                                     setSearchQuery,}) 
// {

//     const timeIdRef = useRef(null);

//     useEffect(() => {
//         // Perform Search Logic here and filter tasks based on Search Query
//         const filteredTask = tasks.filter((task) =>{
//             const case1 = task.title.toLowerCase().includes(searchQuery.toLowerCase());

//             const case2 = task.description.toLowerCase().includes(searchQuery.toLowerCase());

//             return case1 || case2;
//         });
//         setFilteredTask(filteredTask);
//     }, [setSearchQuery, setFilteredTask, tasks]);

//     // Debounce the Search input Change
//     const handleSearchInputChange = useCallback((event) => {
//         const query = event.target.value;

//         // Clear the previous timeout using the ref
//         clearTimeout(timeIdRef.current);

        
//         // Set a new timeout and update th ref
//         timeIdRef.current = setTimeout(() => {
//             setSearchQuery(query);
//         }, 300); 
//     }, [setSearchQuery]);

//   return (
//     <div className='search-box-container'>
//         <input  type="text" 
//                 placeholder={placehoder} 
//                 onChange={handleSearchInputChange}
//         />
//         <img src={Search} alt="Search Icon" />
      
//     </div>
//   )
// }

// UPDATED
import React, { useCallback, useRef } from 'react'
import Search from "../assets/search.svg"

export default function SearchTask({ placeholder = "Search title and description", 
                                    searchQuery, 
                                    setSearchQuery }) {

    const timeIdRef = useRef(null);

    // Debounce the Search input Change
    const handleSearchInputChange = useCallback((event) => {
        const query = event.target.value;

        // Clear the previous timeout using the ref
        clearTimeout(timeIdRef.current);

        // Set a new timeout and update the ref
        timeIdRef.current = setTimeout(() => {
            setSearchQuery(query); // Update search query with delay
        }, 300); 
    }, [setSearchQuery]);

  return (
    <div className='search-box-container'>
        <input 
            type="text" 
            placeholder={placeholder} 
            value={searchQuery}
            onChange={handleSearchInputChange}
        />
        <img src={Search} alt="Search Icon" />
    </div>
  );
}
