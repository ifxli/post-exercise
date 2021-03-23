import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addPosts } from './redux/actions';
import axios from 'axios';

import { PostCard } from './components';

function App({ posts, addPostsToState }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPostsAndComments() {
      setLoading(true);

      let fetchPostsUrl = 'https://jsonplaceholder.typicode.com/posts';
      let fetchCommentsUrl = 'https://jsonplaceholder.typicode.com/comments';
      
      let promiseCalls = [axios(fetchPostsUrl), axios(fetchCommentsUrl)];
      Promise.all(promiseCalls)
        .then(function(responses) {
          return Promise.all(responses.map(function (response) {
            return response.data;
          }));
        })
        .then(function(data) {
          let posts = data[0];
          let comments = data[1];
          posts.forEach(post => {
            post.comments = comments.filter((comment) => comment.postId === post.id)
          });
          addPostsToState(posts);
        })
        .finally(function() {
          setLoading(false);
        })
    }
    if (posts.length === 0) {
      fetchPostsAndComments();
    }
  }, [posts]);

  return (
    <div>
      {posts.length === 0 || loading
        ? (
          <div>Loading...</div>)
        : (
          <PostCard
            post={posts[0]}
            onCommentsClicked={(post) => {
              console.log('show comments of post - ', post.id);
            }}
          />
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.postReducer.posts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPostsToState: (posts) => dispatch(addPosts(posts))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
