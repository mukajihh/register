import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeAddress.scss';
import { Grid, InputAdornment, MenuItem, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  radio: {
    '&$checked': {
      color: '#7BE115'
    }
  },
  checked: {}
})

class EmployeAddress extends Component {

  state = {
    sameAddress: 'none',
    sameAddressError: false,
    cep: this.props.user.employeAddress.cep,
    district: this.props.user.employeAddress.district,
    street: this.props.user.employeAddress.street,
    number: this.props.user.employeAddress.number,
    complement: this.props.user.employeAddress.complement,
    city: this.props.user.employeAddress.city,
    state: this.props.user.employeAddress.state,
    cepDisabled: true,
    districtDisabled: true,
    streetDisabled: true,
    numberDisabled: true,
    complementDisabled: true,
    cityDisabled: true,
    stateDisabled: true
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  enableAllFields = () => {
    this.setState({
      cepDisabled: false,
      districtDisabled: false,
      streetDisabled: false,
      numberDisabled: false,
      complementDisabled: false,
      cityDisabled: false,
      stateDisabled: false
    })
  }

  disableAllFields = () => {
    this.setState({
      cepDisabled: true,
      districtDisabled: true,
      streetDisabled: true,
      numberDisabled: true,
      complementDisabled: true,
      cityDisabled: true,
      stateDisabled: true
    })
  }

  bundlerRadioSameAddress = event => {
    if (event.target.value === 'no') {
      this.enableAllFields();
    } else {
      this.disableAllFields();
      this.refs.form.resetValidations();
    }

    this.setState({
      sameAddress: event.target.value,
      sameAddressError: false
    });
  }

  handleBlur = event => {
    let textValidator = this.refs[event.target.name];
    textValidator.validate(event.target.value);
  }

  submit = () => {
    if (this.state.sameAddress === 'none') {
      this.setState({
        sameAddressError: true
      })
    } else if (this.state.sameAddress === 'no'){
      this.refs.form.submit();
    } else {
      this.handleSameAddressSubmit();
    }
  }

  handleSameAddressSubmit = () => {
    this.props.user.employeAddress.cep = this.props.user.ownerAddress.cep;
    this.props.user.employeAddress.district = this.props.user.ownerAddress.district;
    this.props.user.employeAddress.street = this.props.user.ownerAddress.street;
    this.props.user.employeAddress.number = this.props.user.ownerAddress.number;
    this.props.user.employeAddress.complement = this.props.user.ownerAddress.complement;
    this.props.user.employeAddress.city = this.props.user.ownerAddress.city;
    this.props.user.employeAddress.state = this.props.user.ownerAddress.state;

    this.props.goToNextForm();
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
    const { classes } = this.props;
    return (
    <div className="employe-address">

      <h2 className="title">Endereço&nbsp;<b>da empresa</b><span className="endpoint"></span></h2>

      <p className="same-location-label">O endereço da empresa é o mesmo endereço do responsável da conta?</p>

      <RadioGroup
        className="radio-group"
        row
        name="sameAddress"
        value={this.state.sameAddress}
        onChange={this.bundlerRadioSameAddress}
      >
        <FormControlLabel className="control-label" value="yes" control={<Radio className="radio" classes={{root: classes.radio, checked: classes.checked}} />} label="Sim" />
        <FormControlLabel className="control-label" value="no" control={<Radio className="radio" classes={{root: classes.radio, checked: classes.checked}} />} label="Não" />
      </RadioGroup>

      {this.state.sameAddressError &&
        <span className="field-error">Selecione uma opção</span>
      }

      <ValidatorForm
        ref="form"
        noValidate
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              disabled={this.state.cepDisabled}
              ref="cep"
              name="cep"
              value={this.state.cep}
              className="field"
              label="CEP"
              validators={['required']}
              errorMessages={['Digite um CEP']}
              onChange={this.handleChange('cep')}
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
              disabled={this.state.districtDisabled}
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
          disabled={this.state.streetDisabled}
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
              disabled={this.state.numberDisabled}
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
              disabled={this.state.complementDisabled}
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
              disabled={this.state.cityDisabled}
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
              disabled={this.state.stateDisabled}
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

export default withStyles(styles)(EmployeAddress);
