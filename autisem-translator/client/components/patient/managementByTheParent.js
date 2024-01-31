import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native-animatable";
import GenericButton from "../shared/button";
import { globalStyles } from '../../styles';
import { translationService } from "../../services/translationService";

// Translation function alias for shorter usage
const translate = translationService.translate;



export default function ManagementByTheParent() {
    const navigation = useNavigation();

    const handleMyTherapist = () => {
        navigation.navigate("ListOfAssociatedTherapists");
      };
      const handleNewTherapist = () => {
        navigation.navigate("GetTherapist");
      };
    return(
    <View style={globalStyles.whitePaper}>
        <GenericButton onPress={handleNewTherapist} title={translate("new Therapist")} buttonWidth={150}/>

        <GenericButton onPress={handleMyTherapist} title={translate("my Therapist")} buttonWidth={150}/>

    </View>)
}
