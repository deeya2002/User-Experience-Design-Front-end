import axios from "axios";

const Api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
    headers :{
        "Content-Type" : "multipart/form-data"
    }
})

// configuration for axios
const config = {
    headers :{
        'authorization' : `Bearer ${localStorage.getItem('token')}`
    }
}

// Creating test api
export const testApi = () => Api.get("/test")
// http://localhost:5000//test

//  Creating register api
export const registerApi = (data) => Api.post("/api/user/create", data)

// Create login api
export const loginApi = (data) => Api.post("/api/user/login", data)

//Forget password Apis
export const sendEmailApi = data => Api.post ('/api/user/resetpassword', data);

export const verifyCodeApi = data =>
  Api.post ('/api/user/resetcode', data, config);

export const updatePasswordApi = data =>
  Api.post ('/api/user/updatepassword', data);

//Update User APi
export const getUserProfileApi = data =>
  Api.get (`/api/user/getuser`, data, config);

export const updateUserProfileApi = formData =>
  Api.put (`/api/user/updateuser`, formData, config);
