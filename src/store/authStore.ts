    import { surveyAPI } from '@/api/surveyApi';
    import { AuthContextType } from '@/hooks/use-auth';
    import {create} from 'zustand'
    import {createJSONStorage, persist} from 'zustand/middleware'
    export interface ApiResponse{
        success?:boolean,
        user?:any,
        error?:string
    }
    export const useAuthStore=create<AuthContextType>()(
        persist((set)=>({
            user:null,
            isAuthenticated:false,
            isLoading:false,
            login:async(email,password)=>{
                console.log('in authstore',password)
            set({isLoading:true})
            try {
                const response=await surveyAPI.adminLogin(email,password)
                console.log("LOGIN RESPONES",response)
                if(response?.success)
                {
                    set({user:response.user,isAuthenticated:true})
                    return true
                }
            } catch (error) {
                console.error("Login failed!",error)
            }
            set({isLoading:false})
            return false
            },
            logout:async()=>{
                try {
                    await surveyAPI
                    set({user:null,isAuthenticated:false})
                } catch (error) {
                    console.error("Logout failed",error)
                }
            },
            handleAuthError:(error)=>{
                if(error.response.status===200)
                {
                    set({user:null,isAuthenticated:false})
                    console.warn("Session expired!Logging out!")
                }
            }
        }),{
            name:'auth-storage',
            storage :createJSONStorage(()=>sessionStorage)

        }
    )
    )