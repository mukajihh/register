import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/employeData.scss';
import { Grid, InputAdornment } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
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

class EmployeData extends Component {

  state = {
    cnpj: this.props.user.employeData.cnpj,
    employeCreateDate: this.props.user.employeData.employeCreateDate,
    fantasyName: this.props.user.employeData.fantasyName,
    socialName: this.props.user.employeData.socialName,
    segment: this.props.user.employeData.segment
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
    this.props.user.employeData.cnpj = this.state.cnpj;
    this.props.user.employeData.employeCreateDate = this.state.employeCreateDate;
    this.props.user.employeData.fantasyName = this.state.fantasyName;
    this.props.user.employeData.socialName = this.state.socialName;
    this.props.user.employeData.segment = this.state.segment;

    this.props.goToNextForm();
  }

  render() {
    return (
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
              InputProps={{
                inputComponent: CnpjFormat,
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
              validators={['required']}
              type="date"
              errorMessages={['Digite um data', 'Data invalida!']}
              onChange={this.handleChange('employeCreateDate')}
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
          ref="fantasyName"
          name="fantasyName"
          value={this.state.fantasyName}
          className="field"
          label="Nome fantasia"
          validators={['required']}
          errorMessages={['Digite o nome fantasia!']}
          onChange={this.handleChange('fantasyName')}
          onBlur={this.handleBlur}
          InputProps={{
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="check">
                <DoneIcon className="check-icon" />
              </InputAdornment>
            )
          }}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="check">
                <DoneIcon className="check-icon" />
              </InputAdornment>
            )
          }}
        />
      </ValidatorForm>
    </div>
    );
  }
}

export default EmployeData;
