import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeData.scss';
import { Grid } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      format="##.###.###/####-##"
    />
  );
}

class EmployeData extends Component {

  state = {
    cnpj: '',
    employeCreateDate: 'YYYY-MM-DD'
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleBlur = event => {
    this.refs[event.target.name].validate(event.target.value);

    // use timeout when implements the check icon in the field
    setTimeout(() => console.log());
  }

  render() {
    return (
    <div className="employe-data">

      <h2 className="title">Dados da&nbsp;<b>pessoa jurídica</b><span className="endpoint"></span></h2>

      
      <ValidatorForm
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
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              validators={['required', 'minStringLength:14']}
              errorMessages={['Digite um CNPJ', 'CNPJ invalido!']}
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
              onChange={this.handleChange('employeCreateDate')}
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
          onChange={this.handleChange('segment')}
          onBlur={this.handleBlur}
        />
      </ValidatorForm>
    </div>
    );
  }
}

export default EmployeData;
