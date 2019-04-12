import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/_form.scss';
import '../../assets/styles/ownerData.scss';
import { Grid, InputAdornment } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ValidatedDatePicker from '../../utils/validatedDatePicker';
import DoneIcon from '@material-ui/icons/Done';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from "@date-io/moment";
import moment from "moment";
import "moment/locale/pt-br";

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
      format="###.###.###-##"
    />
  );
}

function telNinethDigit(val) {
  let ddd = val.substring(0, 2);
  let firstPhone = '';
  let lastPhone = '';
  if (val.length > 10) {
    firstPhone = val.substring(2, 7);
    lastPhone = val.substring(7, 11);
  } else {
    firstPhone = val.substring(2, 6);
    lastPhone = val.substring(6, 10);
  }

  val = '(' + ddd + ') ' + firstPhone + '-' + lastPhone;

  return val;
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
      format={telNinethDigit}
    />
  );
}

class OwnerData extends Component {

  state = {
    name: this.props.user.ownerData.name,
    cpf: this.props.user.ownerData.cpf,
    birthDate: this.props.user.ownerData.birthDate,
    telphone: this.props.user.ownerData.telphone,
    motherName: this.props.user.ownerData.motherName
  }

  componentDidMount() {
    this.props.onRef(this);
    ValidatorForm.addValidationRule('TwoWordsValidator', value => {
      if (!value) {
        return false;
      }

      value = value.trim();

      if (value.split(" ").length <= 1) {
        return false;
      }
  
      return true;
    })
    const cpfValidator = require('../../utils/CpfValidator').CpfValidator;
    ValidatorForm.addValidationRule('cpfValidator', value => {
      return cpfValidator(value);
    });
  }

  handleChange = prop => event => {
    if (prop !== 'birthDate') {
      this.setState({ [prop]: event.target.value });
    } else {
      this.setState({ [prop]: event._d });      
    }
  };

  handleBlur = event => {
    this.refs[event.target.name].validate(event.target.value);
  }

  submit = () => {
    this.refs.form.submit();
  }

  handleSubmit = () => {
    this.props.user.ownerData.name = this.state.name;
    this.props.user.ownerData.cpf = this.state.cpf;
    this.props.user.ownerData.birthDate = this.state.birthDate;
    this.props.user.ownerData.telphone = this.state.telphone;
    this.props.user.ownerData.motherName = this.state.motherName;
    this.props.goToNextForm();
  }

  noNumbersAndSpecialCharacters = (event) => {
    if (!event.key.match(/[A-Za-zÀ-ÖØ-öø-ÿ ]/gi)) {
      event.preventDefault();
    }
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
          label="Nome completo"
          validators={['required', 'maxStringLength:100', 'TwoWordsValidator']}
          errorMessages={['Nome completo invalido', 'Nome completo invalido', 'Nome completo invalido']}
          onChange={this.handleChange('name')}
          onBlur={this.handleBlur}
          onKeyDown={(event) => this.noNumbersAndSpecialCharacters(event)}
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
              errorMessages={['CPF invalido', 'CPF invalido']}
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

            <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br" moment={moment}>
              <ValidatedDatePicker
                autoOk
                disableFuture
                openToYearSelection
                className="field"
                label="Data de nascimento"
                name="birthDate"
                value={this.state.birthDate}
                onChange={this.handleChange('birthDate')}
                maxDate={new Date().setFullYear(new Date().getFullYear() - 16)}
                format={"DD/MM/YYYY"}
                views={["year", "month", "day"]}
                mask={value =>
                  value ? [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/] : []
                }
                validators={['required']}
                errorMessages={['Data invalida']}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" className="check">
                      <DoneIcon className="check-icon" />
                    </InputAdornment>
                  )
                }}
                animateYearScrolling={false}
                invalidDateMessage="Data invalida"
              />
            </MuiPickersUtilsProvider>

            {/* <TextValidator
              ref="birthDate"
              name="birthDate"
              value={this.state.birthDate}
              className="field"
              label="Data de nascimento"
              type="date"
              validators={['required', 'minStringLength:10']}
              errorMessages={['Data invalida', 'Data invalida']}
              onChange={this.handleChange('birthDate')}
              onBlur={this.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="check">
                    <DoneIcon className="check-icon" />
                  </InputAdornment>
                )
              }}
            /> */}
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={6}>
            <TextValidator
              ref="telphone"
              name="telphone"
              value={this.state.telphone}
              className="field"
              label="Telefone"
              validators={['required', 'minStringLength:10']}
              errorMessages={['Telefone invalido', 'Telefone invalido']}
              onChange={this.handleChange('telphone')}
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
        </Grid>

        <TextValidator
          ref="motherName"
          name="motherName"
          value={this.state.motherName}
          className="field"
          label="Nome completo da mãe"
          validators={['required', 'maxStringLength:100', 'TwoWordsValidator']}
          errorMessages={['Nome da mãe invalido', 'Nome da mãe invalido', 'Nome da mãe invalido']}
          onChange={this.handleChange('motherName')}
          onBlur={this.handleBlur}
          onKeyDown={(event) => this.noNumbersAndSpecialCharacters(event)}
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

export default OwnerData;