import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/flowGuide.scss';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

class FlowGuide extends Component {

  state = {
    activeStep: 0
  }

  render() {
    return (
      <div className="flow-guide-content">
        <h2 className="subtitle">Tenha em mãos:</h2>
        <h3 className="subtitle minor">Contrato Social da Empresa<br/>Documento pessoal (CNH, RG ou CPF)</h3>

        <Stepper
          activeStep={this.props.activeStep}
          orientation="vertical"
          className="flow-guide-stepper"
        >
          <Step
            key="Dados do responsável da conta"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados do responsável da conta</StepLabel>
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
            <StepContent className="flow-guide-step-content">Informe corretamente os dados do endereço da empresa.</StepContent>
          </Step>
          <Step
            key="Endereço de correspondência"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço de correspondência</StepLabel>
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

export default FlowGuide;
