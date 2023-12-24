import React from "react";
import { View, Text, StyleSheet, Picker, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import GenericButton from "./button";
import TextInputField from "./textInputField";

const GenericForm = ({ fields, onSubmit, submitButton, navigation }) => {
  const { control, trigger, handleSubmit, setValue, formState: { errors } } = useForm({ mode: 'onChange' });

  const handleInputChange = async (field, text) => {
    setValue(field, text);
    await trigger(field);
  };

  const handlePickerChange = async (field, text) => {
    setValue(field, text);
    await trigger(field);
  };

  const handleLinkPress = (onPress) => {
    if (onPress) {
      onPress(navigation);
    }
  };

  return (
    <View style={styles.container}>
      {fields.map((field) => (
        <View key={field.name} accessible accessibilityLabel={field.placeholder}>
          {field.type === 'text' && (
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <TextInputField
                  value={value}
                  onChangeText={(text) => handleInputChange(field.name, text)}
                  placeholder={field.placeholder}
                  secure={field.secureTextEntry}
                  error={errors[field.name]}
                />
              )}
              name={field.name}
              rules={field.rules}
              defaultValue=""
            />
          )}
          {field.type === 'picker' && (
            <Controller
              control={control}
              render={({ field: { value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => handlePickerChange(field.name, itemValue)}
                  accessibilityLabel={field.placeholder}
                >
                  {field.options.map((option) => (
                    <Picker.Item key={option.value} label={option.name} value={option.value} />
                  ))}
                </Picker>
              )}
              name={field.name}
              rules={field.rules}
              defaultValue=""
            />
          )}
          {field.type === 'link' && (
            <Pressable onPress={() => handleLinkPress(field.onPress)} accessibilityRole="link">
              <Text style={styles.link}>{field.text}</Text>
            </Pressable>
          )}
          {errors[field.name] && <Text style={styles.error}>{errors[field.name].message}</Text>}
        </View>
      ))}
      <GenericButton onPress={handleSubmit(onSubmit)} title={submitButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  error: {
    color: "red",
    fontSize: 10,
    marginBottom: 5,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default GenericForm;
