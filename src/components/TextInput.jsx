import { View, Text, StyleSheet, TextInput as Input } from "react-native";
import React, { useState } from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";

export default function TextInput({
  label,
  placeholder,
  textContentType,
  secure,
  onChangeText,
  autoCapitalize,
}) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.input}
        textContentType={textContentType}
        placeholderTextColor={colors.lightWhite}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    color: colors.black,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 13,
    backgroundColor: colors.white,
    fontFamily: typography.interRegular,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
    fontFamily: typography.interMedium,
  },
});
