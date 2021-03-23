import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PostCard } from './PostCard';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export const PostList = ({ posts, onCommentsClickedAt }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {posts.map((post, index) => (
        <PostCard
          post={post}
          onCommentsClicked={onCommentsClickedAt}
          key={index}
        />
      ))}
    </div>
  );
}
