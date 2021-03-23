import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { common } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: common.black,
    },
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    marginLeft: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

export const Header = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
