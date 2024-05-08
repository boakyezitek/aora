import { TouchableOpacity, Text, StyleSheet } from "react-native";
import React from "react";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: object; // Update to object type for React Native styles
  textStyles?: object; // Update to object type for React Native styles
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[styles.button, containerStyles, isLoading && styles.disabled]}
      disabled={isLoading}
    >
      <Text style={[styles.text, textStyles]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display:'flex',
    flexDirection: 'row',
    backgroundColor: 'blue', // Example background color
    borderRadius: 8, // Example border radius
    minHeight: 62, // Adjust as needed
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white', // Example text color
    fontSize: 18, // Example font size
    fontWeight: 'bold',
  },
});

export default CustomButton;