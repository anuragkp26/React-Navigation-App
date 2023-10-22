import axios from "axios";

//https://randomuser.me/api/?page=3&results=10&seed=abc



export const getUsers = async(page) => {
    const response = await axios.get(`https://randomuser.me/api/?page=${page}&results=10`)
    
    return response.data.results
}