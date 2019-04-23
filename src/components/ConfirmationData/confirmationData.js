import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/confirmationData.scss';
import { Grid } from '@material-ui/core';

class ConfirmationData extends Component {

  state = {
    cpf:  this.props.user.ownerData.cpf.slice(0, 3) + '.' +
          this.props.user.ownerData.cpf.slice(3, 6) + '.' +
          this.props.user.ownerData.cpf.slice(6, 9) + '-' +
          this.props.user.ownerData.cpf.slice(9, 11),
  }

  componentDidMount() {
    this.props.onRef(this);
  }
 
  formatDate = (date) => {
    var month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return day + '/' + month + '/' + year;
  }

  submit = () => {
    this.props.goToNextForm();
  }

  render() {
    return (
      <Grid item xs={6}>
        <div className="confirmation-data">

          <h2 className="title">Confirmação&nbsp;<b>de dados</b><span className="endpoint"></span></h2>

          <Grid container spacing={24} className="owner-data confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">Dados do responsável da conta</h5>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.name}</span>
                    <span className="confirmation-field-label">Nome completo</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.state.cpf}</span>
                    <span className="confirmation-field-label">CPF</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.birthDate}</span>
                    <span className="confirmation-field-label">Data de nascimento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.telphone}</span>
                    <span className="confirmation-field-label">Telefone</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.motherName}</span>
                    <span className="confirmation-field-label">Nome completo da mãe</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

          </Grid>

          <Grid container spacing={24} className="owner-data confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">Dados do responsável da conta</h5>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.name}</span>
                    <span className="confirmation-field-label">Nome completo</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.state.cpf}</span>
                    <span className="confirmation-field-label">CPF</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.birthDate}</span>
                    <span className="confirmation-field-label">Data de nascimento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.telphone}</span>
                    <span className="confirmation-field-label">Telefone</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerData.motherName}</span>
                    <span className="confirmation-field-label">Nome completo da mãe</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

          </Grid>

        </div>
      </Grid>
    );
  }
}

export default ConfirmationData;
