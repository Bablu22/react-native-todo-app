import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";

export default function Button({ text, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightPink,
    width: 363,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: typography.interBold,
    fontWeight: "bold",
  },
});
