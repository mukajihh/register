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
    console.log(this.props);
    fetch('https://cquhs72382.execute-api.us-east-1.amazonaws.com/dev/banky/v1/register?sendemail=false', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        companyName: this.props.user.employeData.socialName,
        tradingName: this.props.user.employeData.fantasyName,
        cnpj: this.props.user.employeData.cnpj,
        stateInscription: this.props.user.employeData.stateInscription,
        dateOpening: '2005-12-20',
        cnae: this.props.user.employeData.segment,
        waysConstitution: this.props.user.employeData.constitutionalForm,
        phones: [{
          phone: this.props.user.ownerData.telphone
        }],
        address: {
          zipCode: this.props.user.employeAddress.cep,
          street: this.props.user.employeAddress.street,
          number: this.props.user.employeAddress.number,
          complement: this.props.user.employeAddress.complement,
          state: this.props.user.employeAddress.state,
          city: this.props.user.employeAddress.city,
          district: this.props.user.employeAddress.district
        },
        partner: {
          name: this.props.user.ownerData.name,
          cpf: this.props.user.ownerData.cpf,
          birthDay:  '1997-07-27',
          email:  this.props.user.accountData.email,
          password: this.props.user.accountData.password,
          phones: [{
            phone: this.props.user.accountData.celphone
          }]
        }
      })
    }).then(response => response.json()).then((value) => {
      // this.props.history.push('/abrir-conta/sucesso');
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
