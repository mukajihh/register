import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import { Switch, Route } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, Grid, Fab } from '@material-ui/core';
import EmployeData from '../employeData/employeData';
import FlowGuide from '../flowGuide/flowGuide';
import { ValidatorForm } from 'react-material-ui-form-validator';
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Nunito', 'sans-serif'].join(','),
    fontWeightLight: 400,
    fontWeightRegular: 600,
    fontWeightMedium: 700
  }
})

class App extends Component {

  state = {
    activeStep: 0
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  goToPrevForm = () => {
    const step = this.state.activeStep - 1;
    if (step >= 0) {
      this.setState({ activeStep: step });
    }
  }

  goToNextForm = () => {
    const step = this.state.activeStep + 1;
    if (step <= 6) {
      this.setState({ activeStep: step });
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <main>
            <Grid container spacing={0}>
              <Grid item xs={4} className="flow-guide-container">
                <FlowGuide activeStep={this.state.activeStep}/>
              </Grid>
              <Grid item xs={8} className="form-container">
                <Grid container spacing={0}>
                  
                  <ValidatorForm
                    className="form"
                    noValidate
                    onSubmit={this.handleSubmit}
                    instantValidate={false}
                  >
                    <Grid item xs={12}>
                      <Switch>
                        <Route exact path='/register' component={EmployeData} />
                      </Switch>
                    </Grid>

                    <Grid container spacing={24} justify="center">
                      <Grid item xs={4}>
                        <Fab
                          variant="extended"
                          className="button"
                          onClick={this.goToPrevForm}
                        >
                          Voltar  
                        </Fab>
                      </Grid>
                      <Grid item xs={4}>
                        <Fab
                          variant="extended"
                          className="button action"
                          onClick={this.goToNextForm}
                        >
                          Abrir Conta
                        </Fab>
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
