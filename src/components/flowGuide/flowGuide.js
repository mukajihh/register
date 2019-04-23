import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/flowGuide.scss';
import { withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, StepConnector } from '@material-ui/core';

const styles = theme => ({
  connectorRoot: {
    padding: '0px',
    marginLeft: '6px'
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: '#7BDB18',
    }
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: '#D1D1D1',
    },
  },
  connectorLine: {
    height: '35px',
    transition: theme.transitions.create('border-color'),
  }
});

class FlowGuide extends Component {

  state = {
    activeStep: 0
  }

  render() {
    const { classes } = this.props;
    const connector = (
      <StepConnector
        classes={{
          root: classes.connectorRoot,
          active: 'active',
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine,
        }}
      />
    );
    return (
      <div className="flow-guide-content">
        <h2 className="subtitle">Tenha em mãos:</h2>
        <h3 className="subtitle minor">Contrato Social da Empresa<br/>Documento pessoal (CNH, RG ou CPF)</h3>

        <Stepper
          activeStep={this.props.activeStep}
          orientation="vertical"
          connector={connector}
          className="flow-guide-stepper"
        >
          <Step
            key="Dados do responsável da conta"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados do responsável da conta</StepLabel>
            <StepContent className="flow-guide-step-content">Usamos essas informações para Validar os dados da pessoa jurídica</StepContent>
          </Step>
          <Step
            key="Endereço do responsável da conta"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço do responsável da conta</StepLabel>
            <StepContent className="flow-guide-step-content">Usamos essas informações para Validar os dados da pessoa jurídica</StepContent>
          </Step>
          <Step
            key="Dados da empresa"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados da empresa</StepLabel>
            <StepContent className="flow-guide-step-content">Usamos essas informações para validar os dados da pessoa jurídica.</StepContent>
          </Step>
          <Step
            key="Endereço da empresa"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço da empresa</StepLabel>
            <StepContent className="flow-guide-step-content">Usamos essas informações para validar os dados da pessoa jurídica.</StepContent>
          </Step>
          <Step
            key="Endereço de correspondência"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço de correspondência</StepLabel>
            <StepContent className="flow-guide-step-content">O endereço preenchido será utilizado para envio do cartão Banky da sua empresa.</StepContent>
          </Step>
          <Step
            key="Dados de acesso à conta"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados de acesso à conta</StepLabel>
          </Step>
          <Step
            key="Confirmação de dados"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Confirmação de dados</StepLabel>
          </Step>
          <Step
            key="Abertura de conta"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Abertura de conta</StepLabel>
          </Step>
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(FlowGuide);
