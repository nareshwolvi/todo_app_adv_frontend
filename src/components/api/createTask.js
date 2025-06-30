async function createTaskAPI(values, handleResponse, handleError, setLoading){

    setLoading(true);
    try {

        // Base URL for API end point -> our own API
        const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

        // Endpoint for fetching the data
        const endpoint = "api/v2/task";

        // Construct the full URL using URL endpoint
        
        // const url = new URL(baseUrl, endpoint) -> Using Constructor
        const url = new URL(endpoint, baseUrl);

        // values => convert values to json format
        const requestBody = JSON.stringify({
            title: values.taskTitle,
            description: values.taskDescription,
            due_date: values.taskDueDate?.toISOString(),

        });

        // Send fetch post request with the values
        const response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: requestBody,
        });

        // handle the data comming from fetch
        const jsonData = await response.json();
        
        if(!response.ok){
            const errorMessage = jsonData.message || "Unknown error occured";
            throw new Error(errorMessage);
        }

        // handle Response
        handleResponse(jsonData);

    }
    // handle error
     catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Unknown Error";

        handleError(new Error(errorMessage));
    }
    finally{
        setLoading(false);
    }
}

export default createTaskAPI;