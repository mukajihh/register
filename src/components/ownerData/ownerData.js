import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/ownerData.scss';
import { Grid, InputAdornment, Fab } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DoneIcon from '@material-ui/icons/Done'

function CpfFormat(props) {
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
      format="### ### ### ##"
    />
  );
}

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
      format="(##)#####-####"
    />
  );
}

class OwnerData extends Component {

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
    <div className="owner-data">

      <h2 className="title">Dados do&nbsp;<b>responsável da conta</b><span className="endpoint"></span></h2>

      <ValidatorForm
        ref="form"
        noValidate
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >

        <TextValidator
          ref="name"
          name="name"
          value={this.state.name}
          className="field"
          label="Nome fantasia"
          validators={['required']}
          errorMessages={['Digite o nome fantasia!']}
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
              ref="cpf"
              name="cpf"
              value={this.state.cpf}
              className="field"
              label="CPF"
              validators={['cpfValidator', 'required']}
              errorMessages={['CPF invalido!', 'Digite um CPF']}
              onChange={this.handleChange('cpf')}
              onBlur={this.handleBlur}
              InputProps={{
                inputComponent: CpfFormat,
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
              ref="birthDate"
              name="birthDate"
              value={this.state.birthDate}
              className="field"
              label="Data de nascimento"
              validators={['required']}
              type="date"
              errorMessages={['Digite um cpf', 'cpf invalido!']}
              onChange={this.handleChange('birthDate')}
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
              ref="telefone"
              name="telefone"
              value={this.state.telefone}
              className="field"
              label="Telefone"
              validators={['required']}
              errorMessages={['Digite o nome razão social!']}
              onChange={this.handleChange('telefone')}
              onBlur={this.handleBlur}
              InputProps={{
                inputComponent: TelFormat,
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Fab
              variant="extended"
              className="button action"
              onClick={() => this.child.submit()}
            >
              Enviar arquivo
            </Fab>
          </Grid>
        </Grid>

        <Grid container spacing={24} justify="flex-end">
          <Grid item xs={6} className="archive-label">
            <span>Anexar documento com foto do responsável da empresa.</span>
          </Grid>
        </Grid>

      </ValidatorForm>
    </div>
    );
  }
}

export default OwnerData;
