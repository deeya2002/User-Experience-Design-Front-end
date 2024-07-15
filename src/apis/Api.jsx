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

// const token = getToken();
console.log('Token:', config);

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
export const likeJournalApi = data =>
  Api.post(`/api/journal/like`, data);

//unlike journal
export const unlikeJournalApi = data =>
  Api.post(`/api/journal/unlike`, data);

//save journal
export const saveJournalApi = data =>
  Api.post(`/api/journal/save`, data);

//unsave journal
export const unsaveJournalApi = data =>
  Api.post(`/api/journal/unsave`, data);

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


export const updateUserProfileApi = (userid, formData) =>
  Api.put(`/api/user/updateuser/${userid}`, formData, config);

//Search APi
export const searchByJournalName = formData =>
  Api.post('/api/journal/searchjournal', formData);

//Comments Api
export const createComment = formData =>
  Api.post('/api/comment/create_comment', formData, config);

// get comments API
export const getComments = id =>
  Api.get(`/api/comment/get_comments/${id}`);

export const deleteComment = id =>
  Api.delete(`/api/comment/delete_comment/${id}`, config);

// create feedback API
export const createFeedbackApi = formData =>
  Api.post('/api/feedback/createfeedback', formData, config);