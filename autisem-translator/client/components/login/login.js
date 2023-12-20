import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GenericForm from "../shared/form";
import validations from "../../config/validations";
import { translationService } from "../../services/translationService";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/userAction';
const translate = translationService.translate;



const fields = [
  {
    name: "userName",
    placeholder: translate("email"),
    type: "text",
    rules: validations.email,
  },
  {
    name: "password",
    placeholder: translate("password"),
    type: "text",
    secureTextEntry: true,
    rules: validations.password,
  },
  {
    name: "forgotPassword",
    type: "link",
    onPress: (navigation) => navigation.navigate("ForgotYourPassword"),
    text: translate("forgot your password"),
  },
];

export default function Login() {
  const dispatch = useDispatch();

  const navigation = useNavigation();

  // const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (data) => {
    //clear form?
    //Handle form submission logic
    //save the data in db
    //did all data go through validations / wran user
    //save data / send to server
    console.log("Form data:", data);
    dispatch(setUser(data));//This is for the meantime, untill the login request will be perfect.
  };

  return (
    <View>
      <GenericForm
        fields={fields}
        onSubmit={onSubmit}
        submitButton={translate("login")}
        navigation={navigation}
      ></GenericForm>

      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <CheckBox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>{translate('remember me')}</Text>
      </View> */}
    </View>
  );
}
