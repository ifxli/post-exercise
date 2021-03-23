import { ADD_COMMENT, ADD_POSTS } from "../actionTypes";

const initialState = {
  posts: []
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS:
      return {
        posts: action.payload.posts
      }
    case ADD_COMMENT:
      const { comment, postId } = action.payload;
      let tempPosts = [...state.posts];
      let post = tempPosts.find((post) => post.id === postId);
      post.comments.splice(0, 0, {
        name: 'Felix',
        email: 'fxlisoft@gmail.com',
        body: comment
      });
      return {
        posts: tempPosts
      }
    default:
      return state;
  }
};

export default postReducer;
