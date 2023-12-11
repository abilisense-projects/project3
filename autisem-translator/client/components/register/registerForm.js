import React from 'react';
import { View } from 'react-native';
import GenericForm from '../shared/form';
import validations from '../../config/validations';
import TherapistService from '../../services/backendServices/therapistService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userTypeOptions = [
  { name: 'Select User Type', value: '' },
  { name: 'Therapist', value: 'therapist' },
  { name: 'Treated', value: 'treated' },
];

const fields = [
  { name: 'userName', placeholder: 'Enter your email',type: 'text',rules: validations.email},
  { name: 'firstName', placeholder: 'Enter your firstName',type: 'text' ,rules: validations.name},
  { name: 'lastName', placeholder: 'Enter your lastName',type: 'text' ,rules: validations.name },
  { name: 'phoneNumber', placeholder: 'Enter your phoneNumber',type: 'text' ,rules: validations.phoneNumber },
  { name: 'password', placeholder: 'Enter your password',type: 'text', secureTextEntry: true,rules: validations.password},
  { name: 'repeatPassword', placeholder: 'Verify your password',type: 'text', secureTextEntry: true ,rules: validations.repeatPassword},
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
    console.log('Form data:', data);
     if (data.type === 'therapist') {
      try {
        await TherapistService.createTherapist(data);
        console.log('Therapist created successfully.');
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error('Error creating therapist:', error.message);
      }
     }
    
  };
  return (
    <View>
      {/* check if fields & userTypeOptions are not null */}
      <GenericForm fields={fields} onSubmit={onSubmit} submitButton="Register"></GenericForm>
    </View>
  );
}