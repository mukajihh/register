import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import { Switch, Route } from 'react-router-dom'
import Registration from '../registration/registration';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 600,
    fontWeightMedium: 700
  }
})

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route exact path='/' component={Registration} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
