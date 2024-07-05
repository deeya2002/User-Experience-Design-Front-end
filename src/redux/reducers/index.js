import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import homePost from './postReducer';
import status from './statusReducer'
import detailPost from './detailPostReducer'
import socket from './socketReducer'
import notify from './notificationReducer'


export default combineReducers({
    auth,
    alert,
    profile,
homePost,
status,
detailPost,
socket,
notify
});