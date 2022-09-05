import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../App";
import { collection, addDoc } from "firebase/firestore";

export default function SignUp({ navigation }) {
  // const auth = getAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onPress = () => {
    navigation.navigate("SignIn");
  };

  const signupHandler = () => {
    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          addDoc(collection(db, "users"), {
            name: name,
            email: user.email,
            uid: user.uid,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === "auth/email-already-in-use") {
            Alert.alert("Warning", "This email is already used");
          } else if (errorCode === "auth/invalid-email") {
            Alert.alert("Warning", "Please inter a valid email address");
          } else if (errorCode === "auth/weak-password") {
            Alert.alert("Warning", " Password should be at least 6 characters");
          }
        });
    } else {
      Alert.alert("Warning", "All input is required");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headign}>Please provide your information</Text>
      </View>
      <TextInput
        label={"Name"}
        placeholder={"Enter your Name"}
        textContentType={"name"}
        onChangeText={(text) => setName(text)}
        autoCapitalize={"words"}
      />
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
        onChangeText={(text) => setPassword(text)}
        secure={true}
        autoCapitalize={"none"}
      />
      <View style={{ marginTop: 20 }}>
        <Button onPress={signupHandler} text={"Sign Up"} />
      </View>
      <View style={styles.bottomText}>
        <Text style={{ color: colors.lightWhite }}>
          Don’t have an account?{" "}
          <Text onPress={onPress} style={{ color: colors.white }}>
            Sign In
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
    marginTop: 10,
    fontWeight: "normal",
    marginBottom: 27,
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
