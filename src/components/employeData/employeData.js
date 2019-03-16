import React, { Component } from 'react';
import '../../assets/styles/_form.scss';
import { MenuItem, Button } from '@material-ui/core';
import { TextValidator, SelectValidator, ValidatorForm  } from 'react-material-ui-form-validator';

const colors = [
  {
    value: 'red',
    label: 'vermelho'
  },
  {
    value: 'blue',
    label: 'azul'
  },
  {
    value: 'green',
    label: 'verde'
  }
]

class EmployeData extends Component {

  state = {
    color: '',
    nome: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleBlur = event => {
    this.refs[event.target.name].validate(event.target.value);
    setTimeout(() => console.log(this.refs['nome'].state.isValid));
  }

  handleSubmit = () => {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  render() {
    return (
    <div className="EmployeData">
      <ValidatorForm
        className="form"
        onSubmit={this.handleSubmit}
        instantValidate={false}
      >
        <TextValidator
          required
          ref="nome"
          name="nome"
          value={this.state.nome}
          className="field"
          label="Nome"
          validators={['required', 'minStringLength:3']}
          errorMessages={['Selecione uma cor!', 'Selecione uma cor!']}
          onChange={this.handleChange('nome')}
          onBlur={this.handleBlur}
        />
        <TextValidator
          required
          className="field"
          label="CNPJ"
          variant="outlined"
          type="number"
        />
        <TextValidator
          required
          error
          className="field"
          label="Endereço"
          variant="outlined"
        />
        <TextValidator
          className="field"
          label="Idade"
          variant="outlined"
          type="number"
        />

        <TextValidator
          required
          error
          className="field"
          label="Nome da Mãe"
          variant="outlined"
          helperText="Nome invalido!"
        />

        <TextValidator
          required
          disabled
          className="field"
          label="Taxa"
          variant="outlined"
          type="number"
          helperText="Isento!"
        />

        <SelectValidator
          required
          select
          ref="color"
          className="field"
          label="Cores"
          name="color"
          validators={['required', 'isEmail']}
          errorMessages={['Selecione uma cor!']}
          variant="outlined"
          value={this.state.color}
          type="text"
          onChange={this.handleChange('color')}
          onBlur={this.handleBlur}
        >
          {colors.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </SelectValidator>

        <Button
          variant="contained"
        >
          Upload
        </Button>
      </ValidatorForm>
    </div>
    );
  }
}

export default EmployeData;
