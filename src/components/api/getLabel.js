async function getLabelsAPI(handleResponse, handleError)
 {
    
    try {
         // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

        // Endpoint for fetching the data with id
        const endpoint = `/api/v2/labels`;
 
        // Construct the full URL using URL endpoint
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = new URL(endpoint, baseUrl);

        const response = await fetch(url);
        console.log(response);
        
        
        const jsonData = await response.json();
        console.log(jsonData);
        

        // Check if the response is not successful
        if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occured";
            throw new Error(errorMessage);
        }

        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
}

export default getLabelsAPI;