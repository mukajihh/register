import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import { Switch, Route, withRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Register from '../register/register';

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
        birthDate: new Date(new Date().setFullYear(new Date().getFullYear() - 16)),
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

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <main>
            <Switch>
              {/* <Route exact path='/' render={() => <OwnerData user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} /> */}
              <Route exact path='/abrir-conta/:step' render={() => <Register user={this.state.user} />} />
              {/* <Route exact path='/sucesso' render={() => <EmployeData user={this.state.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} /> */}
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
