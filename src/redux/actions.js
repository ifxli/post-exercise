import { ADD_COMMENT, ADD_POSTS } from './actionTypes';

export const addPosts = (posts) => {
  return {
    type: ADD_POSTS,
    payload: {
      posts
    }
  } 
};

export const addComment = ({ comment, postId }) => ({
  type: ADD_COMMENT,
  payload: {
    comment,
    postId
  }
});
