import { useHttpClient } from "../hooks/httpHook";

export const useJobDescriptions = async () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    let url = "http://localhost:5000/api/jobs";
                   
   
    const response = await sendRequest(url);

     console.log(response)

                    
}