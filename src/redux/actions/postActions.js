import { deleteDataApi, getDataApi, patchDataApi, postDataApi } from "../../apis/fetchDataApi";
import { imageupload } from "../../utils/imageupload";
import { createNotify, removeNotify } from "./notificationActions";

export const POST_TYPES = {
    CREATE_POST: "CREATE_POST",
    GET_POSTS: "GET_POSTS",
    UPDATE_POST: "UPDATE_POST",
    LOADING_POSTS: "LOADING_POSTS",
    GET_POST: "GET_POST",
    DELETE_POST: "DELETE_POST"
};

export const createPost = ({ postTitle, postDescription, postLocation, images, auth, socket }) => async (dispatch) => {
    let media = [];

    try {
        dispatch({ type: 'ALERT', payload: { loading: true } });

        if (images.length > 0) media = await imageupload(images);

        const res = await postDataApi('posts', { postTitle, postDescription, postLocation, images: media }, auth.token);
        dispatch({ type: POST_TYPES.CREATE_POST, payload: { ...res.data.newPost, user: auth.user } });
        dispatch({ type: 'ALERT', payload: { loading: false } });

        // Notify
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new Post',
            url: `/post/${res.data.newPost._id}`,
            recipients: res.data.newPost.user.friends,
            postTitle,
            image: media[0]?.secure_url,
        };
        dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const getPost = (token) => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POSTS, payload: true });
        const res = await getDataApi('posts', token);
        dispatch({ type: POST_TYPES.GET_POSTS, payload: res.data });
        dispatch({ type: POST_TYPES.LOADING_POSTS, payload: false });
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const updatePost = ({ postTitle, postDescription, postLocation, images, auth, status }) => async (dispatch) => {
    let media = [];
    const newImgUrl = images.filter(img => !img.secure_url);
    const oldImgUrl = images.filter(img => img.secure_url);

    if (
        status.postTitle === postTitle &&
        status.postDescription === postDescription &&
        status.postLocation === postLocation &&
        newImgUrl.length === 0 &&
        oldImgUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: 'ALERT', payload: { loading: true } });

        if (newImgUrl.length > 0) media = await imageupload(newImgUrl);

        const res = await patchDataApi(
            `post/${status._id}`,
            { postTitle, postDescription, postLocation, images: [...oldImgUrl, ...media] },
            auth.token
        );

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost });
        dispatch({ type: 'ALERT', payload: { success: res.data.msg, loading: false } });
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const likePost = ({ pos, auth, socket }) => async (dispatch) => {
    const newPost = { ...pos, likes: [...pos.likes, auth.user] };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit('likePost', newPost);

    try {
        const res = await patchDataApi(`post/${pos._id}/like`, null, auth.token);

        const msg = {
            id: auth.user._id,
            text: 'liked the Post',
            url: `/post/${pos._id}`,
            recipients: [pos.user._id],
            postTitle: pos.postTitle,
            image: pos.images[0]?.secure_url,
        };
        dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const unlikePost = ({ pos, auth, socket }) => async (dispatch) => {
    const newPost = { ...pos, likes: pos.likes.filter(like => like._id !== auth.user._id) };

    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    socket.emit('unlikePost', newPost);

    try {
        const res = await patchDataApi(`post/${pos._id}/unlike`, null, auth.token);

        const msg = {
            id: auth.user._id,
            text: 'unliked the Post',
            url: `/post/${pos._id}`,
            recipients: [pos.user._id],
        };
        dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const getPostSingle = ({ detailPost, auth, id }) => async (dispatch) => {
    if (detailPost.every(item => item._id !== id)) {
        try {
            const res = await getDataApi(`post/${id}`, auth.token);
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post });
        } catch (err) {
            dispatch({
                type: 'ALERT',
                payload: { error: err.response?.data?.msg || 'Something went wrong' },
            });
        }
    }
};

export const savePost = ({ pos, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: [...auth.user.saved, pos._id] };

    dispatch({ type: 'AUTH', payload: { ...auth, user: newUser } });

    try {
        await patchDataApi(`save/${pos._id}`, null, auth.token);
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const unsavePost = ({ pos, auth }) => async (dispatch) => {
    const newUser = { ...auth.user, saved: auth.user.saved.filter(id => id !== pos._id) };

    dispatch({ type: 'AUTH', payload: { ...auth, user: newUser } });

    try {
        await patchDataApi(`unsave/${pos._id}`, null, auth.token);
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};

export const deletePost = ({ pos, auth, socket }) => async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: pos });

    try {
        await deleteDataApi(`post/${pos._id}`, auth.token);

        // Notify
        const msg = {
            id: pos._id,
            text: 'deleted a Post',
            recipients: pos.user.friends,
            url: `/post/${pos._id}`,
        };
        dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Something went wrong' },
        });
    }
};
