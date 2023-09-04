import React from 'react';
import {TextInput, StyleSheet, TextInputProps} from 'react-native';

const CustomTextInput: React.FC<TextInputProps> = props => {
  return <TextInput style={styles.input} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
});

export default CustomTextInput;
