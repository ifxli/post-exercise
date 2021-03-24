import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    marginBottom: 10
  },
  actionButton: {
    marginLeft: 'auto'
  }
});

export const PostCard = ({ post, onCommentsClicked }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} data-testid="post-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <br></br>
        <Typography variant="body2" component="p" data-testid="body-text">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className={classes.actionButton}
          size="small"
          onClick={() => onCommentsClicked(post)}
          role="comments-button"
        >
          {post.comments.length} comment(s)
        </Button>
      </CardActions>
    </Card>
  );
}