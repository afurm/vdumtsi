import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  color?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  color = '#007AFF',
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      {...props}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomButton;
