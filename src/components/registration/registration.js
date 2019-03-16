import React, { Component } from 'react';
import FlowGuide from '../flowGuide/flowGuide';
import EmployeData from '../employeData/employeData'
import { Grid } from '@material-ui/core';

class Registration extends Component {
  render() {
    return (
      <Grid container spacing={0}>
        <Grid item xs={4} className="flow-guide-container">
          <FlowGuide />
        </Grid>
        <Grid item xs={8} className="form-container">
          <EmployeData />
        </Grid>
      </Grid>
    );
  }
}

export default Registration;
