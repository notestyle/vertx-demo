import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';
import { SnackbarProvider, withSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import Home from './pages/Home';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  typography: {
    useNextVariants: true,
  },
});

class MyApp extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Home enqueueSnackbar={this.props.enqueueSnackbar} />
        </div>
      </MuiThemeProvider>
    );
  }
}

MyApp.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

const App = withSnackbar(MyApp);

function AppSnack() {
  return (
    <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <App />
    </SnackbarProvider>
  );
}

export default AppSnack;
