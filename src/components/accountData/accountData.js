import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/accountData.scss';
import { Grid, InputAdornment } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'
import NumberFormat from 'react-number-format';

function TelFormat(props) {
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
      format="(##) #####-####"
    />
  );
}

class AccountData extends Component {

  state = {
    email: this.props.user.deliveryAddress.email,
    celphone: this.props.user.deliveryAddress.celphone,
    password: this.props.user.deliveryAddress.password,
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
  }

  submit = () => {
    this.refs.form.submit();
  }

  handleSubmit = () => {
    this.props.user.deliveryAddress.email = this.state.email;
    this.props.user.deliveryAddress.celphone = this.state.celphone;
    this.props.user.deliveryAddress.password = this.state.password;

    this.props.goToNextForm();
  }

  render() {
    return (
      <Grid item xs={6}>
        <div className="account-data">

          <h2 className="title">Dados de&nbsp;<b>acesso à conta</b><span className="endpoint"></span></h2>

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
              onChange={this.handleChange('email')}
              onBlur={this.handleBlur}
              InputLabelProps={{
                classes: { error: 'error', shrink: 'shrink' }
              }}
              InputProps={{
                classes: { error: 'error' },
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
            />

            <TextValidator
              ref="celphone"
              name="celphone"
              value={this.state.celphone}
              className="field"
              label="Número de celular"
              validators={['required']}
              errorMessages={['Digite o E-mail!']}
              onChange={this.handleChange('celphone')}
              onBlur={this.handleBlur}
              InputLabelProps={{
                classes: { error: 'error', shrink: 'shrink' }
              }}
              InputProps={{
                inputComponent: TelFormat,
                classes: { error: 'error' },
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
                  InputLabelProps={{
                    classes: { error: 'error', shrink: 'shrink' }
                  }}
                  InputProps={{
                    classes: { error: 'error' },
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
                  InputLabelProps={{
                    classes: { error: 'error', shrink: 'shrink' }
                  }}
                  InputProps={{
                    classes: { error: 'error' },
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
      </Grid>
    );
  }
}

export default AccountData;
