import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import { Switch, Route, withRouter } from 'react-router-dom'
import { PrivateRoute } from '../../utils/PrivateRouter';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import Register from '../register/register';
import Welcome from '../welcome/welcome';
import Success from '../success/success';

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

    enableForm: false,

    user: {
      ownerData: {
        name: '',
        cpf: '',
        birthDate: '',
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
        employeCreateDate: '',
        fantasyName: '',
        socialName: '',
        stateInscription: '',
        constitutionalForm: '',
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

  enableForm = () => {
    this.setState({
      enableForm: true
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Header />
          <main>
            <Switch>
              <Route exact path='/:id' render={() => <Welcome user={this.state.user} enableForm={this.enableForm}/>} />
              <PrivateRoute exact redirect={!this.state.enableForm} path='/abrir-conta/sucesso' component={Success} user={this.state.user}/>
              <PrivateRoute exact redirect={!this.state.enableForm} path='/abrir-conta/:step' component={Register} user={this.state.user}/>
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(App);
