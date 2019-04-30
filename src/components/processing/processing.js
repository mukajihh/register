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
    fetch('https://cquhs72382.execute-api.us-east-1.amazonaws.com/dev/banky/v1/register?sendemail=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: 'Banky TESTE',
        tradingName: 'Banky TESTE',
        cnpj: '72.905.221/0001-10',
        stateInscription: '295.662.824.360',
        dateOpening: '2005-12-20',
        phones: [{
          phone: '11987654321'
        }],
        address: {
          zipCode: '01001000',
          street: 'Praça da sé',
          number: '01',
          complement: 'central',
          state: 'SP',
          city: 'são paulo',
          district: 'Sé'
        },
        partner: {
          name: 'Nelson Lucas Heitor Moraes',
          cpf: '22222192803',
          birthDay:  '1997-07-27',
          email:  'nnelsonlucasheitormoraes@superig.com.br',
          password: 'BOdSgwjt7e',
          phones: [{
            phone: '11981097195'
          }]
        }
      })
    }).then(response => response.json()).then((value) => {
      this.props.history.push('/abrir-conta/sucesso');
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
