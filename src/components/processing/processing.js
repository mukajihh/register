import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/processing.scss';
import { withRouter } from 'react-router-dom'
import { Grid } from '@material-ui/core';

class Processing extends Component {
  state = {
    points: '.'
  }

  componentDidMount() {    
    fetch('https://cquhs72382.execute-api.us-east-1.amazonaws.com/dev/banky/v1/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: '',
        tradingName: '',
        cnpj: '',
        stateInscription: '',
        dateOpening: '',
        phones: [{
          phone: ''
        }],
        address: {
          zipCode: '',
          street: '',
          number: '',
          complement: '',
          state: '',
          city: '',
          district: ''
        },
        partner: {
          name: '',
          cpf: '',
          birthday:  '',
          email:  '',
          password: '',
          phones: [{
            phone: ''
          }]
        }
      })
    }).then((value) => {
      console.log(value);
    }).catch((reason) => {
      console.log(reason);
    });

    setInterval(() => {
      if (this.state.points.length >= 3) {
        this.setState({
          points: '.'
        })
      } else {
        this.setState({
          points: this.state.points + '.'
        })
      }
    }, 700);
  }

  render() {
    return (
      <Grid item xs={8}>
        <div className="processing">
          <h2 className="title">Estamos abrindo a <b>sua conta</b> e solicitando o cartão Banky<span className="endpoint"></span></h2>

          <span className="processing-message">Processando{this.state.points}</span>

          <div className="ilustrations">
            <div className="cellphone">

            </div>
            <div className="card">
            
            </div>
          </div>
        </div>
      </Grid>
    );
  }
}

export default withRouter(Processing);
