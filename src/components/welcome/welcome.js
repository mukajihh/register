import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/welcome.scss';
import { withRouter } from 'react-router-dom'
import { Grid, Fab } from '@material-ui/core';

class Welcome extends Component {

  goToForm = () => {
    this.props.history.push('/abrir-conta/responsavel-conta');
  }

  render() {
    return (
      <div className="welcome">
        <Grid container spacing={0}>
          <Grid item xs={4} className="side-image">
          </Grid>
          <Grid item xs={8} className="">
            <Grid container spacing={0} justify="center">
              <Grid item xs={3}></Grid>
              <Grid item xs={9} className="welcome-content">
                <h2 className="title">Parabéns&nbsp;<b>Murillo!</b></h2>
                <h2 className="title">Chegou a hora de abrir a sua conta Banky<span className="endpoint"></span></h2>
                <h2 className="subtitle">Para pagamento de despesas da sua empresa.</h2>

                <span className="list-title">Para facilitar o cadastro, vamos precisar que você tenha em mãos:</span>
                <ul className="list">
                  <li className="list-item">Contrato social da empresa</li>
                  <li className="list-item">Endereço da empresa</li>
                  <li className="list-item">Endereço de correspondência</li>
                  <li className="list-item">CPF do responsável da conta</li>
                </ul>
              </Grid>
              <Grid item xs={3} className='form'>
                <Fab
                  variant="extended"
                  className="button action"
                  onClick={this.goToForm}
                >
                  Continuar
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Welcome);
