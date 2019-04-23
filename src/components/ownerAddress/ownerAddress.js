import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/ownerAddress.scss';
import { Grid, InputAdornment, MenuItem } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'

function cep(val) {
  let part1 = val.substring(0, 5);
  let part2 = val.substring(5, 8);

  val = part1 + '-' + part2;

  return val;
}

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
      format={cep}
    />
  );
}

class OwnerAddress extends Component {

  state = {
    cep: this.props.user.ownerAddress.cep,
    district: this.props.user.ownerAddress.district,
    street: this.props.user.ownerAddress.street,
    number: this.props.user.ownerAddress.number,
    complement: this.props.user.ownerAddress.complement,
    city: this.props.user.ownerAddress.city,
    state: this.props.user.ownerAddress.state,
    districtDisabled: true,
    streetDisabled: true,
    numberDisabled: true,
    complementDisabled: true,
    cityDisabled: true,
    stateDisabled: true
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
    let field = event.target.name;
    let textValidator = this.refs[field];
    textValidator.validate(event.target.value);
    setTimeout(() => {
      if (field === 'cep') {
        if (textValidator.state.isValid) {
          fetch('https://viacep.com.br/ws/' + textValidator.state.value + '/json/').then(response => response.json())
          .then(response => {
  
            if (response.erro) {
              this.setState({
                districtDisabled: false,
                streetDisabled: false,
                numberDisabled: false,
                complementDisabled: false,
                cityDisabled: false,
                stateDisabled: false
              });
              this.refs.form.resetValidations();
            } else {
              this.setState({
                district: response.bairro,
                street: response.logradouro,
                city: response.localidade,
                state: response.uf,
                districtDisabled: false,
                streetDisabled: false,
                numberDisabled: false,
                complementDisabled: false,
                cityDisabled: true,
                stateDisabled: true
              })
              this.refs.form.resetValidations();
            }
          }).catch(error => {
            this.setState({
              district: '',
              street: '',
              number: '',
              complement: '',
              city: '',
              state: '',
              districtDisabled: false,
              streetDisabled: false,
              numberDisabled: false,
              complementDisabled: false,
              cityDisabled: false,
              stateDisabled: false
            });
            this.refs.form.resetValidations();
          })
        } else {
          this.setState({
            district: '',
            street: '',
            number: '',
            complement: '',
            city: '',
            state: '',
            districtDisabled: true,
            streetDisabled: true,
            numberDisabled: true,
            complementDisabled: true,
            cityDisabled: true,
            stateDisabled: true
          });
          this.refs.form.resetValidations();
        }
      }
    }, 1);
  }

  disableCityAndState = () => {
    this.setState({
      cityDisabled: true,
      stateDisabled: true
    });
  }

  submit = () => {
    this.refs.form.submit();
  }

  handleSubmit = () => {

    this.props.user.ownerAddress.cep = this.state.cep;
    this.props.user.ownerAddress.district = this.state.district;
    this.props.user.ownerAddress.street = this.state.street;
    this.props.user.ownerAddress.number = this.state.number;
    this.props.user.ownerAddress.complement = this.state.complement;
    this.props.user.ownerAddress.city = this.state.city;
    this.props.user.ownerAddress.state = this.state.state;

    this.props.goToNextForm();
  }

  render() {
    const states = require('../../utils/States').getStates();
    return (
      <Grid item xs={6}>
        <div className="employe-data">

          <h2 className="title">Endereço&nbsp;<b>do responsável da conta</b><span className="endpoint"></span></h2>

          <ValidatorForm
            ref="form"
            noValidate
            onSubmit={this.handleSubmit}
            instantValidate={false}
          >
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <TextValidator
                  ref="cep"
                  name="cep"
                  value={this.state.cep}
                  className="field"
                  label="CEP"
                  validators={['required', 'minStringLength:8']}
                  errorMessages={['Digite um CEP', 'CEP inválido']}
                  onChange={this.handleChange('cep')}
                  onBlur={this.handleBlur}
                  InputLabelProps={{
                    classes: { error: 'error', shrink: 'shrink' }
                  }}
                  InputProps={{
                    inputComponent: CepFormat,
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
      </Grid>
    );
  }
}

export default OwnerAddress;
