async function updateLabelAPI(labels, taskId, handleResponse, handleError){
    try {

         // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

        // Endpoint for fetching the data with id
        const endpoint = `/api/v2/task/${taskId}/labels`;

        // Construct the full URL using URL endpoint
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = new URL(endpoint, baseUrl);

        // Construct a request body with the values provided
        const requestBody = JSON.stringify(labels);

        const response = await fetch(url, {
            method: "PUT",
            headers:{"Content-Type": "application/json",},
            body: requestBody,
            
        });

        const jsonData = await response.json();

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

export default updateLabelAPI;