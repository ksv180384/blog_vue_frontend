
import {loadPage, getData, putData, postData} from "@/services/service";

export const getPostsPage = async () => {
    return  await loadPage('/', {});
}

export const getPostsNext = async (params) => {
    return  await getData('/', params);
}

export const getPost = async (id) => {
    return  await getData(`/post/${id}`);
}

export const postUp = async (id) => {
    return await putData('post/up', { id: id })
}

export const postDown = async (id) => {
    return await putData('post/down', { id: id })
}

export const getCommentsBranch = async (commentId) => {
    return await getData(`/post/comments/branch/${commentId}`);
}

export const createPostComment = async (commentData) => {
    return await postData('/post/comment/create', commentData);
}

export const commentPostUp = async (id) => {
    return await putData('/post/comment/up', { id: id })
}

export const commentPostDown = async (id) => {
    return await putData('/post/comment/up', { id: id })
}