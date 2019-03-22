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
        <h3 className="subtitle minor">RG ou CNH;<br/>Contrato social da empresa Comprovante de residência</h3>

        <Stepper
          activeStep={this.props.activeStep}
          orientation="vertical"
          className="flow-guide-stepper"
        >
          <Step
            key="teste"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados da empresa</StepLabel>
            <StepContent className="flow-guide-step-content">Usamos essas informações para validar os dados da pessoa jurídica.</StepContent>
          </Step>
          <Step
            key="teste 2"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço da empresa</StepLabel>
            <StepContent className="flow-guide-step-content">Informe corretamente os dados do endereço da empresa.</StepContent>
          </Step>
          <Step
            key="teste 3"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Endereço de correspondência</StepLabel>
          </Step>
          <Step
            key="teste 4"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados do responsável da conta</StepLabel>
          </Step>
          <Step
            key="teste 5"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Dados de acesso à conta</StepLabel>
          </Step>
          <Step
            key="teste 6"
            className="flow-guide-step"
            classes={{completed: 'completed'}}
          >
            <StepLabel className="flow-guide-step-name">Confirmação das informações</StepLabel>
          </Step>
          <Step
            key="teste 7"
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
