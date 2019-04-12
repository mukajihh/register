import React, { Component } from 'react';
import '../../assets/styles/_fonts.scss';
import '../../assets/styles/confirmationData.scss';
import { Grid } from '@material-ui/core';

class ConfirmationData extends Component {

  componentDidMount() {
    this.props.onRef(this);
  }

  submit = () => {
    this.props.goToNextForm();
  }

  render() {
    return (
    <div className="confirmation-data">

      <h2 className="title">Confirmação&nbsp;<b>de dados</b><span className="endpoint"></span></h2>

    </div>
    );
  }
}

export default ConfirmationData;
