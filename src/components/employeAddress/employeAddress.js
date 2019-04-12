import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeAddress.scss';
import { Grid, InputAdornment, MenuItem } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'

function CepFormat(props) {
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
      format="#####-###"
    />
  );
}

class EmployeAddress extends Component {

  state = {
    cep: this.props.user.employeAddress.cep,
    district: this.props.user.employeAddress.district,
    street: this.props.user.employeAddress.street,
    number: this.props.user.employeAddress.number,
    complement: this.props.user.employeAddress.complement,
    city: this.props.user.employeAddress.city,
    state: this.props.user.employeAddress.state,
  }

  componentDidMount() {
    this.props.onRef(this);
    const cnpjValidator = require('../../utils/CnpjValidator').CnpjValidator;
    ValidatorForm.addValidationRule('cnpjValidator', value => {
      return cnpjValidator(value);
    });
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleBlur = event => {
    let textValidator = this.refs[event.target.name];
    textValidator.validate(event.target.value);
  }

  submit = () => {
    this.refs.form.submit();
  }

  handleSubmit = () => {
    this.props.user.employeAddress.cep = this.state.cep;
    this.props.user.employeAddress.district = this.state.district;
    this.props.user.employeAddress.street = this.state.street;
    this.props.user.employeAddress.number = this.state.number;
    this.props.user.employeAddress.complement = this.state.complement;
    this.props.user.employeAddress.city = this.state.city;
    this.props.user.employeAddress.state = this.state.state;

    this.props.goToNextForm();
  }

  render() {
    const states = require('../../utils/States').getStates();
    return (
    <div className="employe-data">

      <h2 className="title">Endereço&nbsp;<b>da empresa</b><span className="endpoint"></span></h2>

      <ValidatorForm
        ref="form"
        noValidate
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              ref="CEP"
              name="CEP"
              value={this.state.CEP}
              className="field"
              label="CEP"
              validators={['required']}
              errorMessages={['Digite um CEP']}
              onChange={this.handleChange('CEP')}
              onBlur={this.handleBlur}
              InputProps={{
                inputComponent: CepFormat,
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
              ref="district"
              name="district"
              value={this.state.district}
              className="field"
              label="Bairro"
              validators={['required']}
              errorMessages={['Digite o bairro']}
              onChange={this.handleChange('district')}
              onBlur={this.handleBlur}
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

        <TextValidator
          ref="street"
          name="street"
          value={this.state.street}
          className="field"
          label="Rua"
          validators={['required']}
          errorMessages={['Digite a rua']}
          onChange={this.handleChange('street')}
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
              ref="number"
              name="number"
              value={this.state.number}
              className="field"
              label="Número"
              validators={['required']}
              errorMessages={['Digite o número']}
              onChange={this.handleChange('number')}
              onBlur={this.handleBlur}
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
              ref="complement"
              name="complement"
              value={this.state.complement}
              className="field"
              label="Complemento"
              validators={[]}
              errorMessages={[]}
              onChange={this.handleChange('complement')}
              onBlur={this.handleBlur}
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

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              ref="city"
              name="city"
              value={this.state.city}
              className="field"
              label="cidade"
              validators={['required']}
              errorMessages={['Digite a cidade']}
              onChange={this.handleChange('city')}
              onBlur={this.handleBlur}
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
            <SelectValidator
              ref="state"
              name="state"
              value={this.state.state}
              className="field"
              label="Estado"
              validators={['required']}
              errorMessages={['Selecione um estado']}
              onChange={this.handleChange('state')}
              onBlur={this.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
              >
              {states.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </SelectValidator>
          </Grid>
        </Grid>

      </ValidatorForm>
    </div>
    );
  }
}

export default EmployeAddress;
