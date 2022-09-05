import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import React from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";

export default function Welcome({ navigation }) {
  const onPress = () => {
    navigation.navigate("SignIn");
  };
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Image
            source={require("../../assets/background.png")}
            style={styles.backgroundImage}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            Manage <Text style={{ color: colors.purple }}>work</Text> schedule
            easily
          </Text>
          <Text style={styles.des}>
            You can schedule your work with us more easily
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={onPress} text={"Get Started"} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors.black,
    fontSize: 39,
    fontFamily: typography.MontserratBold,
    fontWeight: "bold",
    textAlign: "center",
  },
  des: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: typography.interMedium,
    fontWeight: "500",
    color: colors.black,
    marginTop: 31,
  },
  button: {
    backgroundColor: colors.lightPink,
    width: 363,
    height: 72,
    padding: 20,
    borderRadius: 50,
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: typography.interBold,
    fontWeight: "bold",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 10,
  },
  backgroundImage: {
    top: 0,
    marginTop: 0,
  },
  backgroundContainer: {
    position: "relative",
    top: 0,
    marginTop: -15,
  },

  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
