import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeData.scss';
import { Grid, InputAdornment, MenuItem } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator, SelectValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'

function CnpjFormat(props) {
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

function DateFormat(props) {
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
      format="##/##/####"
    />
  );
}

class EmployeData extends Component {

  state = {
    cnpj: this.props.user.employeData.cnpj,
    employeCreateDate: this.props.user.employeData.employeCreateDate,
    fantasyName: this.props.user.employeData.fantasyName,
    socialName: this.props.user.employeData.socialName,
    stateInscription: this.props.user.employeData.stateInscription,
    constitutionalForm: this.props.user.employeData.constitutionalForm,
    segment: this.props.user.employeData.segment,

    segments: []
  }

  componentDidMount() {

    fetch('https://vs1q6btt0g.execute-api.us-east-1.amazonaws.com/dev/banky/v1/domain-tables/cnae').then(response => response.json())
    .then(response => {
      this.setState({
        segments: response.data
      });
    });

    this.props.onRef(this);
    const cnpjValidator = require('../../utils/CnpjValidator').CnpjValidator;
    ValidatorForm.addValidationRule('cnpjValidator', value => {
      return cnpjValidator(value);
    });
    const dateValidator = require('../../utils/dateValidator').DateValidator;
    ValidatorForm.addValidationRule('dateValidator', value => {
      var parts = value.split("/");

      if (parts.length === 1) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4) + '/' + value.substring(4, 8);
      }
      
      if (dateValidator(value)) {
        parts = value.split("/");
        
        var birthDate = new Date(parts[2], parts[1] - 1, parts[0])
        
        if (isNaN(birthDate.getFullYear())) {          
          return false;
        }
        
        if (birthDate.getFullYear() < 1900) {
          return false;
        }

      } else {
        return false;
      }

      return true;
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
    this.props.user.employeData.cnpj = this.state.cnpj;
    this.props.user.employeData.employeCreateDate = this.state.employeCreateDate;
    this.props.user.employeData.fantasyName = this.state.fantasyName;
    this.props.user.employeData.socialName = this.state.socialName;
    this.props.user.employeData.stateInscription = this.state.stateInscription;
    this.props.user.employeData.constitutionalForm = this.state.constitutionalForm;
    this.props.user.employeData.segment = this.state.segment;

    this.props.goToNextForm();
  }

  render() {
    var constitutionForms = [
      {
        value: 'LTDA',
        label: 'LTDA'
      },
      {
        value: 'S/A',
        label: 'S/A'
      },
      {
        value: 'MEI',
        label: 'MEI'
      },
      {
        value: 'EIRELI',
        label: 'EIRELI'
      },
      {
        value: 'Individual',
        label: 'Individual'
      },
    ]
    return (
      <Grid item xs={6}>
        <div className="employe-data">

          <h2 className="title">Dados da&nbsp;<b>pessoa jurídica</b><span className="endpoint"></span></h2>

          <ValidatorForm
            ref="form"
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
                  validators={['required', 'cnpjValidator']}
                  errorMessages={['Digite um CNPJ', 'CNPJ invalido!']}
                  onChange={this.handleChange('cnpj')}
                  onBlur={this.handleBlur}
                  InputLabelProps={{
                    classes: { error: 'error', shrink: 'shrink' }
                  }}
                  InputProps={{
                    inputComponent: CnpjFormat,
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
                  ref="employeCreateDate"
                  name="employeCreateDate"
                  value={this.state.employeCreateDate}
                  className="field"
                  label="Data de abertura da empresa"
                  placeholder="dd/mm/aaaa"
                  validators={['required', 'dateValidator']}
                  errorMessages={['Data invalida', 'Data invalida']}
                  onChange={this.handleChange('employeCreateDate')}
                  onBlur={this.handleBlur}
                  InputLabelProps={{
                    shrink: true,
                    classes: { error: 'error', shrink: 'shrink' }
                  }}
                  InputProps={{
                    inputComponent: DateFormat,
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
              ref="fantasyName"
              name="fantasyName"
              value={this.state.fantasyName}
              className="field"
              label="Nome fantasia"
              validators={['required']}
              errorMessages={['Digite o nome fantasia!']}
              onChange={this.handleChange('fantasyName')}
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
              ref="socialName"
              name="socialName"
              value={this.state.socialName}
              className="field"
              label="Nome razão social"
              validators={['required']}
              errorMessages={['Digite o nome razão social!']}
              onChange={this.handleChange('socialName')}
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
                  ref="stateInscription"
                  name="stateInscription"
                  value={this.state.stateInscription}
                  className="field"
                  label="Inscrição estadual"
                  validators={['required']}
                  errorMessages={['Digite a inscrição estadual']}
                  onChange={this.handleChange('stateInscription')}
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
                  ref="constitutionalForm"
                  name="constitutionalForm"
                  value={this.state.constitutionalForm}
                  className="field"
                  label="Forma de constituição"
                  validators={['required']}
                  errorMessages={['Selecione uma forma de constituição']}
                  onChange={this.handleChange('constitutionalForm')}
                  onBlur={this.handleBlur}
                  InputLabelProps={{
                    shrink: true,
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
                  {constitutionForms.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </SelectValidator>
              </Grid>
            </Grid>

            <SelectValidator
              ref="segment"
              name="segment"
              value={this.state.segment}
              className="field"
              label="Ramo de atividade"
              validators={['required']}
              errorMessages={['Digite o ramo de atividade']}
              onChange={this.handleChange('segment')}
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
              {this.state.segments.map(option => (
                <MenuItem key={option.class} value={option.class}>
                  {option.cnae}
                </MenuItem>
              ))}
            </SelectValidator>

          </ValidatorForm>
        </div>
      </Grid>
    );
  }
}

export default EmployeData;
