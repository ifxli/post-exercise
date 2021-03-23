import React, { useState, useEffect, useRef } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { addPosts } from './redux/actions';
import axios from 'axios';

import { Header, PostList } from './components';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    if (props.anchor) {
      props.anchor.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

function App({ posts, addPostsToState }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
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
          {posts.length === 0 || loading
            ? (
              <CircularProgress />
            ) : (
              <PostList
                posts={posts}
                onCommentsClickedAt={(post) => {
                  console.log('comments clicked at index - ', post.id);
                }}
              />
            )
          }
        </Box>
      </Container>
      <ScrollTop anchor={anchorRef} >
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
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
