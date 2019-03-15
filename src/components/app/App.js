import React, { Component } from 'react';
import '../../assets/styles/App.scss';
import Header from '../header/header'
import EmployeData from '../employeData/employeData'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <EmployeData />
      </div>
    );
  }
}

export default App;
