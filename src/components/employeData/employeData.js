import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeData.scss';
import { MenuItem, Button, Grid, Fab } from '@material-ui/core';
import { TextValidator, SelectValidator, ValidatorForm  } from 'react-material-ui-form-validator';

class EmployeData extends Component {

  state = {
    cnpj: '',
    employeCreateDate: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleBlur = event => {
    this.refs[event.target.name].validate(event.target.value);

    // use timeout when implements the check icon in the field
    setTimeout(() => console.log());
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  render() {
    return (
    <div className="employe-data">

      <h2 className="subtitle">Vamos lá!<br/>Agora precisamos dos dados da sua empresa, vai ser rapidinho!</h2>

      <ValidatorForm
        className="form"
        noValidate
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              ref="cnpj"
              name="cnpj"
              value={this.state.cnpj}
              className="field"
              label="CNPJ"
              validators={['required', 'minStringLength:14']}
              errorMessages={['Digite um CNPJ', 'CNPJ invalido!']}
              variant="outlined"
              onChange={this.handleChange('cnpj')}
              onBlur={this.handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <TextValidator
              ref="employeCreateDate"
              name="employeCreateDate"
              value={this.state.employeCreateDate}
              className="field"
              label="Data de abertura da empresa"
              validators={['required']}
              type="date"
              errorMessages={['Digite um CNPJ', 'CNPJ invalido!']}
              variant="outlined"
              onChange={this.handleChange('cnpj')}
              onBlur={this.handleBlur}
            />
          </Grid>
        </Grid>

        <TextValidator
          ref="fantasyName"
          name="fantasyName"
          value={this.state.fantasyName}
          className="field"
          label="Nome fantasia"
          validators={['required']}
          errorMessages={['Digite o nome fantasia!']}
          variant="outlined"
          onChange={this.handleChange('fantasyName')}
          onBlur={this.handleBlur}
        />

        <TextValidator
          ref="socialName"
          name="socialName"
          value={this.state.socialName}
          className="field"
          label="Nome razão social"
          validators={['required']}
          errorMessages={['Digite o nome razão social!']}
          variant="outlined"
          onChange={this.handleChange('socialName')}
          onBlur={this.handleBlur}
        />

        
        <TextValidator
          ref="segment"
          name="segment"
          value={this.state.segment}
          className="field"
          label="Ramo de atividade"
          validators={['required']}
          errorMessages={['Digite o ramo de atividade']}
          variant="outlined"
          onChange={this.handleChange('segment')}
          onBlur={this.handleBlur}
        />

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Fab variant="extended" className="button" >
              Voltar  
            </Fab>
          </Grid>
          <Grid item xs={6}>
            <Fab variant="extended" className="button action" >
              Abrir Conta
            </Fab>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
    );
  }
}

export default EmployeData;
