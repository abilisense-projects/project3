import React from 'react';
import  { useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';

class YourComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
      newPatient: '',
    };
  }

  render() {
    return (
      <View style={{ justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <input
          type="text"
          value={this.state.newPatient}
          onChange={(e) => this.setState({ newPatient: e.target.value })}
        />
        <ul>
        <Text>List Of Patients</Text>
          {this.state.patients.map((patient, index) => (
            <li key={index}>{patient}</li>
          ))}
        </ul>
        <button onClick={this.addPatient}>Add Patient</button>
      </View>
    );
  }

  addPatient = () => {
    const patient = this.state.newPatient;
    if (patient) {
      this.setState((prevState) => ({
        patients: [...prevState.patients, patient],
        newPatient: '',
      }));
    }
  };
}

export default YourComponent;