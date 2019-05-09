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

  formatPhone = (phone) => {
    if (phone.length === 10) {
      return '(' + this.props.user.ownerData.telphone.slice(0, 2) +
             ') ' + this.props.user.ownerData.telphone.slice(2, 6) +
             '-' + this.props.user.ownerData.telphone.slice(6, 10);
    } else {
      return '(' + this.props.user.ownerData.telphone.slice(0, 2) +
             ') ' + this.props.user.ownerData.telphone.slice(2, 7) +
             '-' + this.props.user.ownerData.telphone.slice(7, 11);
    }
  }
 
  formatDate = (date) => {
    var month = date.slice(2, 4),
        day = date.slice(0, 2),
        year = date.slice(4, 8);

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
                    <span className="confirmation-field-value">{this.formatDate(this.props.user.ownerData.birthDate)}</span>
                    <span className="confirmation-field-label">Data de nascimento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.formatPhone(this.props.user.ownerData.telphone)}</span>
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

          <Grid container spacing={24} className="owner-address confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">Endereço do responsável da conta</h5>
              <Grid container spacing={16}>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.cep}</span>
                    <span className="confirmation-field-label">CEP</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.number}</span>
                    <span className="confirmation-field-label">Número</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.complement}</span>
                    <span className="confirmation-field-label">Complemento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.cep}</span>
                    <span className="confirmation-field-label">Rua</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.number}</span>
                    <span className="confirmation-field-label">Bairro</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={9}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.city}</span>
                    <span className="confirmation-field-label">Cidade</span>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.ownerAddress.state}</span>
                    <span className="confirmation-field-label">Estado</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={24} className="employe-data confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">dados da empresa</h5>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeData.fantasyName}</span>
                    <span className="confirmation-field-label">Nome fantasia</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeData.cnpj}</span>
                    <span className="confirmation-field-label">CNPJ</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.formatDate(this.props.user.employeData.employeCreateDate)}</span>
                    <span className="confirmation-field-label">Data da abertura da empresa</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeData.stateInscription}</span>
                    <span className="confirmation-field-label">Inscrição estadual</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeData.socialName}</span>
                    <span className="confirmation-field-label">Nome Razão Social</span>
                  </div>
                </Grid>
              </Grid>

            </Grid>
          </Grid>

          <Grid container spacing={24} className="employe-address confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">Endereço da empresa</h5>
              <Grid container spacing={16}>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.cep}</span>
                    <span className="confirmation-field-label">CEP</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.number}</span>
                    <span className="confirmation-field-label">Número</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.complement}</span>
                    <span className="confirmation-field-label">Complemento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.cep}</span>
                    <span className="confirmation-field-label">Rua</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.number}</span>
                    <span className="confirmation-field-label">Bairro</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={9}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.city}</span>
                    <span className="confirmation-field-label">Cidade</span>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.employeAddress.state}</span>
                    <span className="confirmation-field-label">Estado</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container spacing={24} className="delivery-address confirmation-container">

            <Grid item xs={12} className="confirmation-section">
              <h5 className="confirmation-section-title">Endereço de correspondencia</h5>
              <Grid container spacing={16}>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.cep}</span>
                    <span className="confirmation-field-label">CEP</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.number}</span>
                    <span className="confirmation-field-label">Número</span>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.complement}</span>
                    <span className="confirmation-field-label">Complemento</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.cep}</span>
                    <span className="confirmation-field-label">Rua</span>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.number}</span>
                    <span className="confirmation-field-label">Bairro</span>
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={16}>
                <Grid item xs={9}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.city}</span>
                    <span className="confirmation-field-label">Cidade</span>
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div className="confirmation-field">
                    <span className="confirmation-field-value">{this.props.user.deliveryAddress.state}</span>
                    <span className="confirmation-field-label">Estado</span>
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
