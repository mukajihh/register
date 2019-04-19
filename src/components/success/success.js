import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/success.scss';
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core';

class Success extends Component {

  goToForm = () => {
    this.props.history.push('/abrir-conta/responsavel-conta');
  }

  render() {
    return (
      <div className="success">
        <Grid container spacing={0}>
          <Grid item xs={4} className="side-image">
          </Grid>
          <Grid item xs={8} className="">
            <Grid container spacing={0} justify="center">
              <Grid item xs={3}></Grid>
              <Grid item xs={9} className="success-content">
                <h2 className="title">Agora você faz parte da<b> comunidade Banky</b><span className="endpoint"></span></h2>
                <h2 className="subtitle">O seu cartão Banky deverá chegar em <b>até 20 dias úteis</b></h2>
                <h2 className="subtitle">Agora todo o controle da sua conta será feito pelo aplicativo Banky.</h2>
                <h2 className="app">Procure por Banky no Google play ou Apple store.</h2>
                
              </Grid>

              <div className="ilustrations">
                <div className="cellphone">

                </div>
                <div className="card">
                
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withRouter(Success);
