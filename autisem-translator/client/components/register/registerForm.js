import React from 'react';
import { View } from 'react-native';
import GenericForm from '../shared/form';
import validations from '../../config/validations';
import TherapistService from '../../services/backendServices/therapistService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translationService } from '../../services/translationService';
const translate = translationService.translate;

const userTypeOptions = [
  { name: translate('select user type'), value: '' },
  { name: translate('therapist'), value: 'therapist' },
  { name: translate('patient'), value: 'treated' },
// import AsyncStorage from '@react-native-async-storage/async-storage';
import PatientService from '../../services/backendServices/patientService';

];

const fields = [
  { name: 'userName', placeholder:translate('email'),type: 'text',rules: validations.email},
  { name: 'firstName', placeholder: translate('first name'),type: 'text' ,rules: validations.name},
  { name: 'lastName', placeholder: translate('last name'),type: 'text' ,rules: validations.name },
  { name: 'phoneNumber', placeholder: translate('phone number'),type: 'text' ,rules: validations.phoneNumber },
  { name: 'password', placeholder: translate('password'),type: 'text', secureTextEntry: true,rules: validations.password},
  { name: 'repeatPassword', placeholder: translate('verify password'),type: 'text', secureTextEntry: true ,rules: validations.repeatPassword},
  { name: 'type', options: userTypeOptions,type: 'picker', rules: { required: 'type is required.' } },
];

const STORAGE_KEY = '@registrationFormData';


export default function RegistrationForm() {
  // const { setValue } = useForm();

  // useEffect(() => {
  //   const loadSavedData = async () => {
  //     try {
  //       const savedData = await AsyncStorage.getItem(STORAGE_KEY);
  //       if (savedData) {
  //         // Set the form data using setValue
  //         const parsedData = JSON.parse(savedData);
  //         for (const field of fields) {
  //           setValue(field.name, parsedData[field.name]);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error loading saved data:', error.message);
  //     }
  //   };

  //   loadSavedData();
  // }, [setValue, fields]);

  const onSubmit = async (data) => {
    //clear form - navigate to a different page
    //did all data go through validations / wran user
    console.log('Form data:', data.type);
     if (data.type === 'therapist') {
      try {
        await TherapistService.createTherapist(data);
        console.log('Therapist created successfully.');
        // await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error creating Therapist:', error.message);
      }
     }
     else if (data.type === 'patient') {
      try {
        await PatientService.createPatient(data);
        console.log('Patient created successfully.');
        // await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error creating Patient:', error.message);
      }
     }
    
  };
  return (
    <View>
      {/* check if fields & userTypeOptions are not null */}
      <GenericForm fields={fields} onSubmit={onSubmit} submitButton={translate('registration')}></GenericForm>
    </View>
  );
}