// import axios from 'axios';

// export const getDataApi = async (url, token) => {
//     const res = await axios.get(`/api/${url}`, {
//         headers: { Authorization: token }
//     });
//     return res;
// };

// export const postDataApi = async (url, post, token) => {
//     const res = await axios.post(`/api/${url}`, post, {
//         headers: { Authorization: token }
//     });
//     return res;
// };

// export const putDataApi = async (url, post, token) => {
//     const res = await axios.put(`/api/${url}`, post, {
//         headers: { Authorization: token }
//     });
//     return res;
// };

// export const patchDataApi = async (url, post, token) => {
//     const res = await axios.patch(`/api/${url}`, post, {
//         headers: { Authorization: token }
//     });
//     return res;
// };

// export const deleteDataApi = async (url, token) => {
//     const res = await axios.delete(`/api/${url}`, {
//         headers: { Authorization: token }
//     });
//     return res;
// };
//localhost:5000/api/register

import axios from 'axios';

export const getDataApi = async (url, token) => {
  try {
    const res = await axios.get(`/api/${url}`, {
      headers: { Authorization: token }
    });
    return res;
  } catch (err) {
    throw err.response ? err.response : new Error(err);
  }
};

// export const postDataApi = async (url, post, token) => {
//   try {
//     const res = await axios.post(`/api/${url}`, post, {
//       headers: { Authorization: token }
//     });
//     return res;
//   } catch (err) {
//     throw err.response ? err.response : new Error(err);
//   }
// };

export const postDataApi = async (url, post, token) => {
  try {

    console.log("welcome", url, post)
    var res = await axios.post('http://localhost:5000/api/' + url, post, {
      headers: { Authorization: token ? `Bearer ${token}` : '' }
    });
    console.log(res)
    return res;
  } catch (err) {
    throw err.response ? err.response : new Error(err);
  }
};

export const putDataApi = async (url, post, token) => {
  try {
    const res = await axios.put(`/api/${url}`, post, {
      headers: { Authorization: token }
    });
    return res;
  } catch (err) {
    throw err.response ? err.response : new Error(err);
  }
};

export const patchDataApi = async (url, post, token) => {
  try {
    const res = await axios.patch(`/api/${url}`, post, {
      headers: { Authorization: token }
    });
    return res;
  } catch (err) {
    throw err.response ? err.response : new Error(err);
  }
};

export const deleteDataApi = async (url, token) => {
  try {
    const res = await axios.delete(`/api/${url}`, {
      headers: { Authorization: token }
    });
    return res;
  } catch (err) {
    throw err.response ? err.response : new Error(err);
  }
};
