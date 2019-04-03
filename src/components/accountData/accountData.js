import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/accountData.scss';
import { Grid, InputAdornment, Fab } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'

class AccountData extends Component {

  state = {
    cpf: '',
    birthDate: new Date().toISOString().split('T')[0]
  }

  componentDidMount() {
    this.props.onRef(this);
    const cpfValidator = require('../../utils/CpfValidator').CpfValidator;
    ValidatorForm.addValidationRule('cpfValidator', value => {
      return cpfValidator(value);
    });
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleBlur = event => {
    this.refs[event.target.name].validate(event.target.value);

    // use timeout when implements the check icon in the field
    setTimeout(() => console.log());
  }

  submit = () => {
    this.refs.form.submit();
  }

  handleSubmit = () => {
    this.props.goToNextForm();
  }

  render() {
    return (
    <div className="account-data">

      <h2 className="title">Dados do&nbsp;<b>responsável da conta</b><span className="endpoint"></span></h2>

      <ValidatorForm
        ref="form"
        noValidate
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >
      
        <TextValidator
          ref="email"
          name="email"
          value={this.state.email}
          className="field"
          label="E-mail (Este será o seu login)"
          validators={['required', 'isEmail']}
          errorMessages={['Digite o E-mail!', 'E-mail invalido']}
          onChange={this.handleChange('name')}
          onBlur={this.handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="check">
                <DoneIcon className="check-icon" />
              </InputAdornment>
            )
          }}
        />

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              ref="password"
              name="password"
              value={this.state.password}
              className="field"
              label="Nova senha"
              validators={['required']}
              errorMessages={['Digite uma senha']}
              onChange={this.handleChange('password')}
              onBlur={this.handleBlur}
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
          <TextValidator
              ref="confirmPassword"
              name="confirmPassword"
              value={this.state.confirmPassword}
              className="field"
              label="Confirmar senha"
              validators={['required']}
              errorMessages={['Digite uma senha']}
              onChange={this.handleChange('confirmPassword')}
              onBlur={this.handleBlur}
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
    );
  }
}

export default AccountData;
