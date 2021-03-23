import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { common } from '@material-ui/core/colors';
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

export const Header = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Posts
          </Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
