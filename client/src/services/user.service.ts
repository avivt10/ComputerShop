import axios from "axios";
import config from "../config.json"
import { UserForm } from "../Shared/Types/UserForm";
import { UserType } from "../Shared/Types/UserType";

export const register = (userForm : UserForm) : Promise<UserType> => {
    return axios.post(`${config.apiUrl}/api/users/register`,userForm).then((res) => {
        return res.data}).catch((e)=>{
            alert("Register failed")
})}

export const login = (email:string, password: string) : Promise<UserType> => {
    return axios.post(`${config.apiUrl}/api/users/login`,{email,password}).then((res) => {
        return res.data}).catch((e)=>{
            alert("Login failed")
        }) 
        

}