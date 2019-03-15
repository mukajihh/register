import React, { Component } from 'react';
import '../../assets/styles/_form.scss';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';

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
    color: ''
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
    <div className="EmployeData">
      <form className="form">
        <TextField
          required
          className="field"
          label="Nome"
        />
        <TextField
          required
          className="field"
          label="CNPJ"
          variant="outlined"
          type="number"
        />
        <TextField
          required
          error
          className="field"
          label="Endereço"
          variant="outlined"
        />
        <TextField
          className="field"
          label="Idade"
          variant="outlined"
          type="number"
        />

        <TextField
          required
          error
          className="field"
          label="Nome da Mãe"
          variant="outlined"
          helperText="Nome invalido!"
        />

        <TextField
          required
          disabled
          className="field"
          label="Taxa"
          variant="outlined"
          type="number"
          helperText="Isento!"
        />

        <TextField
          required
          select          
          className="field"
          label="Cores"
          variant="outlined"
          type="text"
          value={this.state.color}
          onChange={this.handleChange('color')}
        >
          {colors.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </div>
    );
  }
}

export default EmployeData;
