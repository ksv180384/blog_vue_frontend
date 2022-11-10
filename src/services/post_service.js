
import {loadPage, getData, putData, postData} from "@/services/service";

export const getPostsPage = async () => {
    return  await loadPage('/index', {});
}

export const getPostsNext = async (params) => {
    return  await getData('/index', params);
}

export const getTopPostsPage = async () => {
    return  await loadPage(`posts/top`);
}

export const getTopPostsNext = async (params) => {
    return  await getData('posts/top', params);
}

export const getMyPostsPage = async () => {
    return  await loadPage(`posts/my-posts`);
}

export const getMyPostsNext = async (params) => {
    return  await getData(`posts/my-posts`, params);
}

export const getPost = async (id) => {
    return  await loadPage(`/post/${id}`);
}

export const createPost = async (pData) => {
    return await postData('post/create', pData);
}

export const postUp = async (id) => {
    return await putData('post/up', { id: id });
}

export const postDown = async (id) => {
    return await putData('post/down', { id: id });
}

export const getCommentsBranch = async (commentId) => {
    return await getData(`post/comments/branch/${commentId}`);
}

export const createPostComment = async (commentData) => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'multipart/form-data',
    //     }
    // }
    return await postData('post/comment/create', commentData);
}

export const commentPostUp = async (id) => {
    return await putData('post/comment/up', { id: id });
}

export const commentPostDown = async (id) => {
    return await putData('post/comment/down', { id: id });
}