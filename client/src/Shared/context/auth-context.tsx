import { createContext,useContext } from "react";

export type AuthContextType = {
    isLogin:boolean,
    setIsLogin:Function,
    token : string,
    setToken : Function,
    userName : string,
    setUserName : Function,
    role:String,
    setRole:Function,
    userId:string,
    setUserId:Function,
}

export const AuthContext = createContext<AuthContextType>({
    isLogin:false,
    setIsLogin: ()=> null,
    token: "",
    setToken: ()=> null,
    userName: "",
    setUserName: ()=> null,
    role:"user",
    setRole: ()=> null,
    userId:"",
    setUserId:()=> null,
})


export const useAuthContext = () => useContext(AuthContext);