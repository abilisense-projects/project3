import React, { useState } from 'react';
import { View ,StyleSheet, Text} from 'react-native';
import GenericForm from '../shared/form';
import validations from '../../config/validations';
import TherapistService from '../../services/backendServices/therapistService';
import { translationService } from '../../services/translationService';
const translate = translationService.translate;
import PatientService from '../../services/backendServices/patientService';

const userTypeOptions = [
  { name: translate('select user type'), value: '' },
  { name: translate('therapist'), value: 'therapist' },
  { name: translate('patient'), value: 'treated' },

];

const fields = [
  { name: 'userName', placeholder:translate('email'),type: 'text',rules: validations.email},
  { name: 'firstName', placeholder: translate('first name'),type: 'text' ,rules: validations.name},
  { name: 'lastName', placeholder: translate('last name'),type: 'text' ,rules: validations.name },
  { name: 'phoneNumber', placeholder: translate('phone number'),type: 'text' ,rules: validations.phoneNumber },
  { name: 'password', placeholder: translate('password'),type: 'text', secureTextEntry: true,rules: validations.password},
  { name: 'repeatPassword', placeholder: translate('verify password'),type: 'text', secureTextEntry: true ,rules: validations.repeatPassword},
  { name: 'type', options: userTypeOptions,type: 'picker', rules: { required: translate('type is required') } },
];
//save userName in redux

export default function RegistrationForm() {

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (data.type === 'therapist') {
        await TherapistService.createTherapist(data);
      } else if (data.type === 'patient') {
        await PatientService.createPatient(data);
      }
      console.log('User created successfully.');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  return (
    <View>
      {/* check if fields & userTypeOptions are not null */}
      <GenericForm fields={fields} onSubmit={onSubmit} submitButton={translate('registration')}></GenericForm>
      {isSuccess && (
        <View style={styles.successBanner}>
          <Text style={styles.successText}>{translate('created successfully')}</Text>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  successBanner: {
    backgroundColor: 'green',
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
