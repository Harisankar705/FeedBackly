import { ReactNode } from "react";

export interface ISurvey{
    name:string,
    gender:string,
    phonenumber:string,
    nationality:string,
    address:string,
    message:string,
    email:string
    createdAt?:string|Date

}
export interface IUser{
    email:string
    token:string
}
export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface AuthContextType {
  user: IUser|null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  handleAuthError?:(error:Error)=>void
}
export interface AuthProviderProps {
  children: ReactNode;
}
 export interface ApiResponse<T=unknown>{
        success?:boolean,
        user?:IUser,
        error?:string
}