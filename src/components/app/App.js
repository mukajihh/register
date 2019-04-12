import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import { Switch, Route, withRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, Grid, Fab } from '@material-ui/core';
import EmployeData from '../employeData/employeData';
import FlowGuide from '../flowGuide/flowGuide';
import OwnerData from '../ownerData/ownerData';
import AccountData from '../accountData/accountData';
import EmployeAddress from '../employeAddress/employeAddress';
import DeliveryAddress from '../deliveryAddress/deliveryAddress';
import OwnerAddress from '../ownerAddress/ownerAddress';
import ConfirmationData from '../ConfirmationData/confirmationData';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600
  }
})

class App extends Component {

  state = {
    activeStep: 0,

    user: {
      ownerData: {
        name: '',
        cpf: '',
        birthDate: new Date().setFullYear(new Date().getFullYear() - 16),
        telphone: '',
        motherName: ''
      },
      ownerAddress: {
        cep: '',
        district: '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: ''
      },
      employeData: {
        cnpj: '',
        employeCreateDate: new Date().toISOString().split('T')[0],
        fantasyName: '',
        socialName: '',
        segment: ''
      },
      employeAddress: {
        cep: '',
        district: '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: ''
      },
      deliveryAddress: {
        cep: '',
        district: '',
        street: '',
        number: '',
        complement: '',
        city: '',
        state: ''
      },
      accountData: {
        email: '',
        celphone: '',
        password: ''
      }
    }
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  goToPrevForm = () => {
    const step = this.state.activeStep - 1;
    if (step >= 0) {
      this.props.history.push(`/step-${step+1}`)
      this.setState({ activeStep: step });
    }
  }

  goToNextForm = () => {
    const step = this.state.activeStep + 1;
    if (step <= 6) {
      this.props.history.push(`/step-${step+1}`)
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
                <Grid container spacing={0} className="form" justify="center">
                  <Grid item xs={6}>
                    <Switch>
                      <Route exact path='/step-1' render={() => <OwnerData user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-2' render={() => <OwnerAddress user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-3' render={() => <EmployeData user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-4' render={() => <EmployeAddress user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-5' render={() => <DeliveryAddress user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-6' render={() => <AccountData user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-7' render={() => <ConfirmationData onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                      <Route exact path='/step-8' render={() => <EmployeData onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                    </Switch>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid container spacing={0} justify="center">
                      <Grid item xs={6}>
                        <Grid container spacing={24} justify="center">
                        
                          <Grid item xs={6}>
                            <Fab
                              variant="extended"
                              className="button"
                              onClick={this.goToPrevForm}
                            >
                              Voltar  
                            </Fab>
                          </Grid>
                          <Grid item xs={6}>
                            <Fab
                              variant="extended"
                              className="button action"
                              onClick={() => this.child.submit()}
                            >
                              Continuar
                            </Fab>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
