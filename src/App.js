import React, { useState, useEffect, useRef } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addComment, addPosts } from './redux/actions';
import axios from 'axios';

import { Header, PostList, ScrollTop, CommentsDialog } from './components';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function App({ posts, addPostsToState, addCommentToPost }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const anchorRef = useRef(null);

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
  }, [posts, addPostsToState]);

  return (
    <div>
      <Header />
      <Toolbar ref={anchorRef} />
      <Container>
        <Box my={3} className={classes.container}>
          {posts.length === 0 || loading ? (
            <CircularProgress />
          ) : (
            <PostList
              posts={posts}
              onCommentsClickedAt={(post) => {
                setSelectedPost(post);
              }}
            />
          )}
        </Box>
      </Container>
      <ScrollTop anchor={anchorRef} />
      {selectedPost && (
        <CommentsDialog
          post={selectedPost}
          onAddComment={(comment, postId) => addCommentToPost(comment, postId)}
          onDialogClose={() => setSelectedPost(null)} 
        />
      )}
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
    addPostsToState: (posts) => dispatch(addPosts(posts)),
    addCommentToPost: (comment, postId) => dispatch(addComment(comment, postId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
