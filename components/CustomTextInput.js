import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
  fieldLabel: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 4
  },
  textInput: {
    height: 40,
    marginLeft: 10,
    width: "96%",
    marginBottom: 4,
    paddingLeft: 10,
    borderRadius: 8,
    borderColor: "#c0c0c0",
    borderWidth: 2,
    fontSize: 16,
    ...Platform.select({
      ios: {
        marginTop: 4
      },
      android: {}
    })
  },
  errorText: {
    color: "red",
    marginLeft: 10,
    fontSize: 12,
    marginBottom: 16
  }
});

const CustomTextInput = ({ label, value, onChangeText, maxLength, error, labelStyle, textInputStyle }) => {
  return (
    <View>
      <Text style={[styles.fieldLabel, labelStyle]}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        maxLength={maxLength}
        style={[styles.textInput, textInputStyle, error ? { borderColor: 'red' } : {}]}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

CustomTextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  maxLength: PropTypes.number,
  error: PropTypes.string
};

export default CustomTextInput;
