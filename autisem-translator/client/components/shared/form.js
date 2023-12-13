import React from "react";
import { View, Text, StyleSheet, Picker, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import GenericButton from "./button";
import TextInputField from "./textInputField";
/**
 * check if fields & userTypeOptions are not null
 */
const GenericForm = ({ fields, onSubmit, submitButton, navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const handleInputChange = (field, text) => {
    setValue(field, text);
  };
  const handleLinkPress = (onPress) => {
    if (onPress) {
      onPress(navigation);
    }
  };
  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.name}>
          {field.type === "text" && (
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextInputField
                  value={value}
                  onChangeText={(text) => handleInputChange(field.name, text)}
                  placeholder={field.placeholder}
                  secure={field.secureTextEntry}
                ></TextInputField>
              )}
              name={field.name}
              rules={field.rules}
              defaultValue=""
            />
          )}
          {field.type === "picker" && (
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => setValue(field.name, itemValue)}
                >
                  {field.options.map((option) => (
                    <Picker.Item
                      key={option.value}
                      label={option.name}
                      value={option.value}
                    />
                  ))}
                </Picker>
              )}
              name={field.name}
              rules={field.rules}
              defaultValue=""
            />
          )}
          {field.type === "link" && (
            <Pressable onPress={() => handleLinkPress(field.onPress)}>
              <Text style={styles.link}>{field.text}</Text>
            </Pressable>
          )}
          {errors[field.name] && (
            <Text style={styles.error}>{errors[field.name].message}</Text>
          )}
        </View>
      ))}
      <GenericButton
        onPress={handleSubmit(onSubmit)}
        title={submitButton}
      ></GenericButton>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 10,
    marginBottom: 15,
  },
  link: {
    color: "blue",
    // textDecorationLine: "underline",
    textDecorationLine: "none",
  },
});
export default GenericForm;
