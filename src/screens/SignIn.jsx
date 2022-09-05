import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../App";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onPress = () => {
    navigation.navigate("SignUp");
  };

  const handleLogin = () => {
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === "auth/user-not-found") {
            Alert.alert("Warning", "Email & password is incorrect");
          } else if (errorCode === "auth/wrong-password") {
            Alert.alert("Warning", "Email & password is incorrect");
          }
        });
    } else {
      Alert.alert("Warning", "All input is required");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headign}>Login to enter the application</Text>
      </View>

      <TextInput
        label={"Email"}
        placeholder={"Enter your Email"}
        textContentType={"emailAddress"}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize={"none"}
      />
      <TextInput
        label={"Password"}
        placeholder={"Enter your Password"}
        textContentType={"password"}
        secure={true}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize={"none"}
      />
      <View style={{ marginTop: 20 }}>
        <Button onPress={handleLogin} text={"Sign In"} />
      </View>
      <View style={styles.bottomText}>
        <Text style={{ color: colors.lightWhite }}>
          Do you have an account?{" "}
          <Text onPress={onPress} style={{ color: colors.white }}>
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    padding: 15,
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headign: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "normal",
    marginBottom: 27,
    marginTop: 10,
  },
  input: {
    color: colors.black,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 13,
    backgroundColor: colors.white,
    fontFamily: typography.interRegular,
    fontSize: 16,
    borderWidth: 3,
    borderColor: colors.lightPink,
    borderRadius: 13,
    marginBottom: 20,
  },
  label: {
    color: colors.white,
    fontSize: 18,
    fontFamily: typography.interMedium,
    fontWeight: "600",
    marginBottom: 10,
  },
  bottomText: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
