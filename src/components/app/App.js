import React, { Component } from 'react';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import EmployeData from '../employeData/employeData'
import { Grid } from '@material-ui/core';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Grid container spacing={0}>
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={8}>
            <EmployeData />
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default App;
