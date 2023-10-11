import axios from "axios";
import { limitUsers, urlUsers } from "../config/Variables";

const seed = 'register'
export const getAllUsers = async () => {
   
 try {
    const response = await axios.get(`${urlUsers}?results=${limitUsers}&seed=${seed}`)
    const users = response.data.results
    return users
 } catch (error) {
    console.log(error);
 }   
}