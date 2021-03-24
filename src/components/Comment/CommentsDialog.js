import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Post } from './Post';
import { Comments } from './Comments';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose} data-testid="close-button">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden'
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  leftPanel: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column'
  },
}));

export default function CustomizedDialogs({ post, onDialogClose, onAddComment }) {
  const classes = useStyles();
  const [newComment, setNewComment] = useState('');

  const onCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={onDialogClose}
      aria-labelledby="customized-dialog-title"
      open={true}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={onDialogClose}
        data-testid="dialog-title"
      >
        Post Detail
      </DialogTitle>
      <DialogContent dividers>
        <Post className={classes.leftPanel} post={post} />
        <div className={classes.rightPanel}>
          <Comments comments={post.comments} />
          <DialogActions>
            <TextField
              margin="dense"
              id="comment"
              label="Comment Text"
              type="text"
              fullWidth
              value={newComment}
              onChange={onCommentChange}
              data-testid="comment-input"
            />
            <Button
              onClick={() => {
                if (newComment !== '') {
                  onAddComment(newComment, post.id);
                  setNewComment('');
                }
              }} 
              color="primary"
              data-testid="comment-button"
            >
              Comment
            </Button>
          </DialogActions>
        </div>
      </DialogContent>
    </Dialog>
  );
}
