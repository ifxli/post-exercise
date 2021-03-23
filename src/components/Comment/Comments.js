import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 0,
    flex: 1,
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export const Comments = ({ comments }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {
        comments.map((comment, index) => (
          <div key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={comment.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.email}
                    </Typography>
                    <br></br>
                    {comment.body}
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < comments.length - 1 && <Divider variant="inset" component="li" />}
          </div>
        ))
      }
    </List>
  );
}
