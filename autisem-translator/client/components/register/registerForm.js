import React from 'react';
import { View } from 'react-native';
import GenericForm from '../shared/form';
import validations from '../../config/validations';

const userTypeOptions = [
  { name: 'Select User Type', value: '' },
  { name: 'Therapist', value: 'therapist' },
  { name: 'Treated', value: 'treated' },
];

const fields = [
  { name: 'User Name', state: 'username', placeholder: 'Enter your email',type: 'text',rules: validations.email},
  { name: 'First Name', state: 'firstName', placeholder: 'Enter your firstName',type: 'text' ,rules: validations.name},
  { name: 'Last Name', state: 'lastName', placeholder: 'Enter your lastName',type: 'text' ,rules: validations.name },
  { name: 'Phone Number', state: 'phoneNumber', placeholder: 'Enter your phoneNumber',type: 'text' ,rules: validations.phoneNumber },
  { name: 'Password', state: 'password', placeholder: 'Enter your password',type: 'text', secureTextEntry: true ,rules: validations.password },
  { name: 'RepeatPassword', state: 'repeatPassword', placeholder: 'Verify your password',type: 'text', secureTextEntry: true ,rules: validations.password },
  { name: 'Type', state: 'type', options: userTypeOptions,type: 'picker', rules: { required: 'type is required.' } },
];



export default function RegistrationForm() {
  const onSubmit = (data) => {
    //clear form?
    //Handle form submission logic
    //save the data in db
    //did all data go through validations / wran user
    //save data / send to server
    console.log('Form data:', data);
  };
  return (
    <View>
      {/* check if fields & userTypeOptions are not null */}
      <GenericForm fields={fields} onSubmit={onSubmit} submitButton="Register"></GenericForm>
    </View>
  );
}