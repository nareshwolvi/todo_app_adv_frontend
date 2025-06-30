async function changeStatusAPI(
    status,
    taskId,
    handleResponse,
    handleError,
    setLoading
) {
    setLoading(true);

    try {
        
         // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

        // Endpoint for fetching the data with id
        const endpoint = `/api/v2/task/${taskId}/status`;

        // Construct the full URL using URL endpoint
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = new URL(endpoint, baseUrl);

        const requestBody = JSON.stringify({ status});

        const response = await fetch(url, {
            method: "PUT",
            headers:{"Content-Type": "application/json",},
            body: requestBody,
        });

        const jsonData = await response.json();

        if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occured";
            throw new Error(errorMessage);
        
        }
        handleResponse(jsonData);
    } catch (error) {
        handleError(error);
    }
    finally{
        setLoading(false);
    }
    
}

export default changeStatusAPI;