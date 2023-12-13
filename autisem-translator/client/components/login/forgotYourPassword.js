import React from "react";
import { View} from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from '../shared/form';
import validations from '../../config/validations';
import { translationService } from "../../services/translationService";



const translate = translationService.translate;
const fields = [
  { name: 'userName',placeholder: translate('email'),type: 'text',rules: validations.email},
];

export default function ForgotYourPassword() {
  const navigation = useNavigation();

  const onSubmit = (data) => {
    //clear form?
    //Handle form submission logic
    //save the data in db
    //did all data go through validations / wran user
    //save data / send to server
    console.log('Form data:', data);
    navigation.navigate('New Password');
    
  };

  return (
    <View>
      <GenericForm fields={fields} onSubmit={onSubmit} submitButton={translate('reset password')}></GenericForm>
    </View>
  );
}