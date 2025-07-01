async function fetchTaskAPI(handleResponse, handleError, options={}){
    try {
        
        // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
console.log("baseUrl ",baseUrl)
        // Endpoint for fetching the data
        const endpoint = "/api/v2/tasks";

        // Construct the full URL using URL endpoint
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = new URL(endpoint, baseUrl);
        console.log(url);
        

        // Append Sort option as query parameter if provided (FOR SORTING)
        if(options.sortOption){
            url.searchParams.append("sort_by", options.sortOption);
            url.searchParams.append("sort_type", "asc");   
        }

        // Append selected status as query parameters is provided (FOR STATUS)
        if(options.selectedStatus?.length){
            // Convert Array to json String
            const stringifiedArray = JSON.stringify(options.selectedStatus);
            url.searchParams.append("status", stringifiedArray);
        }

        // Append selected labels as query parameters is provided (FOR LABELS)
        if(options.selectedLabels?.length){
            // Convert Array to json String
            const stringifiedArray = JSON.stringify(options.selectedLabels);
            url.searchParams.append("labels", stringifiedArray);
        }


        // Send a GET request to the constructed URL
        const response = await fetch(url);

        // Extract jsonData from the Response
        const jsonData = await response.json();

        // Check if the response is not successfull
        if(!response.ok){
            const errorMessage = jsonData.message || "unknown error occured";
            // throw this error in catch block
            throw new Error(errorMessage);
        }

        // if successfull, Pass the fetched data to the handle Response function for further processing
        handleResponse(jsonData);

    } //handle error
    catch (error) {
        handleError(error);
    }
}

export default fetchTaskAPI;


