import axios from 'axios';
const Api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

// configuration for axios
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
};

// Creating test api
export const testApi = () => Api.get('/test');
// http://localhost:5000//test

//Auth Api for user
//  Creating register api
export const registerApi = data => Api.post('/api/auth/create', data);
// Create login api
export const loginApi = data => Api.post('/api/auth/login', data);

//Journal Api
// create journal API
export const createJournalApi = formData =>
  Api.post('/api/journal/create', formData, config);

// get journal api
export const getAllJournalsApi = () =>
  Api.get('/api/journal/getalljournal');

// get single journal api
export const getSingleJournalApi = id =>
  Api.get(`/api/journal/me/${id}`);

// get user journal api
export const getUserJournalApi = userid =>
  Api.get(`/api/journal/user/${userid}`);

//update journal 
export const updateJournalApi = (id, formData) =>
  Api.put(`/api/journal/me/${id}`, formData, config);

// delete journal
export const deleteJournalApi = id =>
  Api.delete(`/api/journal/me/${id}`, config);

//like journal
export const likeJournalApi = id =>
  Api.post(`/api/journal/${id}/like`, config);

//unlike journal
export const unlikeJournalApi = id =>
  Api.post(`/api/journal/${id}/unlike`, config);

//save journal
export const saveJournalApi = id =>
  Api.post(`/api/journal/${id}/save`, config);

//unsave journal
export const unsaveJournalApi = id =>
  Api.post(`/api/journal/${id}/unsave`, config);

//unsave journal
export const followUserApi = data =>
  Api.post('/api/user/follow', data, config);

//Forget password Apis
export const sendEmailApi = data =>
  Api.post('/api/user/resetpassword', data);

export const verifyCodeApi = data =>
  Api.post('/api/user/resetcode', data, config);

export const updatePasswordApi = data =>
  Api.post('/api/user/updatepassword', data);

//Update User APi
export const getSingleUserApi = data =>
  Api.post(`/api/user/getuser`, data);


export const updateUserProfileApi = formData =>
  Api.put(`/api/user/updateuser`, formData, config);

//Search APi
export const searchByJournalName = formData =>
  Api.post('/api/journal/searchjournal', formData);
