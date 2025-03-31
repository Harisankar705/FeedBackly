import { ApiResponse, ISurvey } from "@/interfaces/interface";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
const SERVER_URL=import.meta.env.VITE_SERVER_URL
console.log("SERVERURL",SERVER_URL)
const api=axios.create({
    baseURL:SERVER_URL,
    timeout:10000,
    headers:{
        'Content-Type':"application/json"
    },
    withCredentials:true
})
api.interceptors.response.use(
    response=>response.data,error=>{
        console.log("API ERROR",error.message)
        const {handleAuthError}=useAuthStore.getState()
        if(error.response?.status===401 && handleAuthError)
        {
          handleAuthError(error)
        }
        return Promise.reject()
        
    }
)
export const surveyAPI={
    submitSurvey:async(data:ISurvey)=>{
        return await api.post('/survey',data)
},
adminLogin: async (email: string, password: string):Promise<ApiResponse> => {
    try {
        console.log("Attempting login...");
        const response = await api.post('/login', { email, password }, { withCredentials: true });
        console.log("Login response:", response);

        return response as ApiResponse
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
},
fetchSurvey:async()=>{
    return await api.get('/survey')
}
}