import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/welcome.scss';
import { Grid, Fab } from '@material-ui/core';

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <Grid container spacing={0}>
          <Grid item xs={4} className="flow-guide-container">
          </Grid>
          <Grid item xs={8} className="form-container">
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
