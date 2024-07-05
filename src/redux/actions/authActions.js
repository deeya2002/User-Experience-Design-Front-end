
// import { postDataApi } from '../../apis/Api';
// import valid from '../../utils/valid';
// import { ALERT_TYPES } from './alertActions';

// export const TYPES = {
//     AUTH: 'AUTH'
// }

// export const login = (data) => async (dispatch) => {

//     try {
//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: {
//                 loading: true,
//             }
//         })
//         const res = await postDataApi('login', data)
//         localStorage.setItem('login', true);

//         dispatch({
//             type: 'AUTH',
//             payload: {
//                 token: res.data.access_token,
//                 user: res.data.user
//             }
//         })



//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: {
//                 success: res.data.msg
//             }
//         })
//     } catch (error) {

//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: {
//                 error: error.response.data.msg,
//             }
//         })
//     }
// }

// export const refreshToken = () => async (dispatch) => {
//     const login = localStorage.getItem('login')

//     if (login) {
//         dispatch({
//             type: 'ALERT',
//             payload: {
//                 loading: true
//             }
//         })

//         try {
//             const res = await postDataApi('refresh_token');
//             dispatch({
//                 type: 'AUTH',
//                 payload: {
//                     token: res.data.access_token,
//                     user: res.data.user
//                 }
//             })
//             dispatch({
//                 type: ALERT_TYPES.ALERT,
//                 payload: {
//                     success: res.data.msg
//                 }
//             })

//         } catch (error) {
//             console.log(error)
//             dispatch({
//                 type: 'ALERT',
//                 payload: {
//                     error: error.response.data.msg
//                 }
//             })

//         }
//     }
// }

// export const register = (data) => async (dispatch) => {
//     try {
//         const check = valid(data)
//         if (check.errLength > 0) {
//             dispatch({ type: 'ALERT', payload: check.errMsg })
//         }
//         dispatch({ type: "ALERT", payload: { loading: true } })

//         const res = await postDataApi('register', data)

//         console.log(res)
//         dispatch({
//             type: 'AUTH',
//             payload: {
//                 token: res.data.access_token,
//                 user: res.data.user
//             }
//         })


//         localStorage.setItem('login', true);
//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: {
//                 success: res.data.msg
//             }
//         })

//     } catch (error) {
//         console.log(error)
//         dispatch({
//             type: "ALERT",
//             payload: {
//                 error: error.res.data.msg
//             }
//         })
//     }
// }

// export const logout = () => async (dispatch) => {
//     try {
//         localStorage.removeItem('login');
//         await postDataApi('logout');
//         window.location.href = "/"

//     } catch (error) {
//         console.log(error)
//         dispatch({
//             type: "ALERT",
//             payload: {
//                 error: error.res.data.msg
//             }
//         })
//     }

// }


import { postDataApi } from '../../apis/fetchDataApi';
import valid from '../../utils/valid';
import { ALERT_TYPES } from './alertActions';

export const TYPES = {
    AUTH: 'AUTH'
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { loading: true }
        });
        const res = await postDataApi('login', data);
        localStorage.setItem('login', true);

        dispatch({
            type: TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        });

        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { success: res.data.msg }
        });
    } catch (error) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { error: error.response?.data?.msg }
        });
    }
}

export const refreshToken = () => async (dispatch) => {
    const login = localStorage.getItem('login');
    if (login) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { loading: true }
        });

        try {
            const res = await postDataApi('refresh_token');
            dispatch({
                type: TYPES.AUTH,
                payload: {
                    token: res.data.access_token,
                    user: res.data.user
                }
            });
            dispatch({
                type: ALERT_TYPES.ALERT,
                payload: { success: res.data.msg }
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: ALERT_TYPES.ALERT,
                payload: { error: error.response?.data?.msg }
            });
        }
    }
}

// export const register = (data) => async (dispatch) => {
//     try {
//         const check = valid(data);
//         if (check.errLength > 0) {
//             return dispatch({ type: ALERT_TYPES.ALERT, payload: check.errMsg });
//         }
//         dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

//         const res = await postDataApi('register', data);
//         dispatch({
//             type: TYPES.AUTH,
//             payload: {
//                 token: res.data.access_token,
//                 user: res.data.user
//             }
//         });

//         localStorage.setItem('login', true);
//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: { success: res.data.msg }
//         });
//     } catch (error) {
//         console.log(error);
//         dispatch({
//             type: ALERT_TYPES.ALERT,
//             payload: { error: error.response?.data?.msg }
//         });
//     }
// }
export const register = (data) => async (dispatch) => {
    try {
        const check = valid(data);
        if (check.errLength > 0) {
            return dispatch({ type: ALERT_TYPES.ALERT, payload: check.errMsg });
        }
        dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

        console.log('Registering with data:', data); // Log data to verify

        const res = await postDataApi('register', data);
        console.log('Response:', res); // Log response to verify

        // dispatch({
        //     type: TYPES.AUTH,
        //     payload: {
        //         token: res.data.access_token,
        //         user: res.data.user
        //     }
        // });

        localStorage.setItem('login', true);
        // dispatch({
        //     type: ALERT_TYPES.ALERT,
        //     payload: { success: res.data.msg }
        // });
    } catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { error: error.response?.data?.msg || 'An error occurred' }
        });
    }
}

export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem('login');
        await postDataApi('logout');
        window.location.href = "/login";
    } catch (error) {
        console.log(error);
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: { error: error.response?.data?.msg }
        });
    }
}
