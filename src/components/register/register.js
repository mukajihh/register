import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/register.scss';
import { Switch, Route, withRouter } from 'react-router-dom'
import { Grid, Fab } from '@material-ui/core';
import EmployeData from '../employeData/employeData';
import FlowGuide from '../flowGuide/flowGuide';
import OwnerData from '../ownerData/ownerData';
import AccountData from '../accountData/accountData';
import EmployeAddress from '../employeAddress/employeAddress';
import DeliveryAddress from '../deliveryAddress/deliveryAddress';
import OwnerAddress from '../ownerAddress/ownerAddress';
import ConfirmationData from '../ConfirmationData/confirmationData';
import Processing from '../processing/processing';

class Register extends Component {

  steps = [
    'responsavel-conta',
    'endereco-responsavel',
    'dados-empresa',
    'endereco-empresa',
    'endereco-correspondencia',
    'dados-acesso',
    'confirmar-dados',
    'concluindo'
  ]

  state = {
    activeStep: 0,
  }

  componentWillMount() {
    this.updateActiveStep()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.updateActiveStep();
    }
  }

  updateActiveStep = () => {
    this.setState({
      activeStep: this.steps.findIndex((step) => {
        return step === this.props.match.params.step;
      })
    })
  }

  goToPrevForm = () => {
    const step = this.state.activeStep - 1;
    if (step >= 0) {
      this.props.history.push(`/abrir-conta/${this.steps[step]}`)
    }
  }

  goToNextForm = () => {
    const step = this.state.activeStep + 1;
    if (step <= 7) {
      this.props.history.push(`/abrir-conta/${this.steps[step]}`)
    }
  }

  render() {
    return (
      <div className="register">
        <Grid container spacing={0}>
          <Grid item xs={4} className="flow-guide-container">
            <FlowGuide activeStep={this.state.activeStep}/>
          </Grid>
          <Grid item xs={8} className="form-container">
            <Grid container spacing={0} className="form" justify="center">
              <Switch>
                <Route exact path='/abrir-conta/responsavel-conta' render={() => <OwnerData user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/endereco-responsavel' render={() => <OwnerAddress user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/dados-empresa' render={() => <EmployeData user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/endereco-empresa' render={() => <EmployeAddress user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/endereco-correspondencia' render={() => <DeliveryAddress user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/dados-acesso' render={() => <AccountData user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/confirmar-dados' render={() => <ConfirmationData user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
                <Route exact path='/abrir-conta/concluindo' render={() => <Processing user={this.props.user} onRef={ref => (this.child = ref)} goToNextForm={this.goToNextForm} />} />
              </Switch>

              {this.state.activeStep !== 7 &&
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
              }
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Register);
