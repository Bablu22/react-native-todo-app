import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../themes/colors";
import { StatusBar } from "expo-status-bar";
import { typography } from "../themes/typhography";
import Button from "../components/Button";
import { RadioGroup } from "react-native-radio-buttons-group";
import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db } from "../../App";

const radioButtonsData = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Pink",
    value: "#FFC6BC",
  },
  {
    id: "2",
    label: "Purple",
    value: "#884ED0",
  },
  {
    id: "3",
    label: "Sky",
    value: "#D2F5FE",
  },
  {
    id: "4",
    label: "Green",
    value: "#E7F8A5",
  },
];

export default function Create({ navigation, route, user }) {
  const [radioButtons, setRadioButtons] = useState("#FFC6BC");
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [looding, setLooding] = useState(false);
  const setValue = (value) => {
    var newArray = value.filter((item) => item.selected === true); //get the items that are selected
    setRadioButtons(newArray[0].value); //set the selected value in this Hook
  };

  const handleSubmit = async () => {
    setLooding(true);
    try {
      if (title && description) {
        const docRef = doc(collection(db, "notes"));
        console.log(docRef.id);
        await setDoc(docRef, {
          title,
          description,
          color: radioButtons,
          uid: user.uid,
          timestamp: serverTimestamp(),
          id: docRef.id,
        });
      } else {
        Alert.alert("All input is required");
      }
      setLooding(false);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setLooding(false);
    }
  };

  return (
    <>
      {looding ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </Text>
        </View>
      ) : (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.taskContainer}>
            <View>
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.black}
                placeholder="Task Title"
                autoCorrect={false}
                onChangeText={(text) => setTitle(text)}
              />
            </View>
            <View>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor={colors.black}
                placeholder="Task Description"
                autoCorrect={false}
                multiline={true}
                onChangeText={(text) => setDiscription(text)}
              />
            </View>
            <View>
              <Text style={styles.taskColor}>Pick your Task color</Text>
              <RadioGroup
                radioButtons={radioButtonsData}
                onPress={(value) => setValue(value)}
                layout="row"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit} text={"Create Task"} />
          </View>

          <StatusBar style="dark" translucent backgroundColor="white" />
        </KeyboardAvoidingView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: "flex-start",
  },
  taskContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 15,
    paddingTop: 30,
    flex: 1,
    zIndex: 500,
    position: "absolute",
    width: "100%",
    paddingBottom: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },

  input: {
    color: colors.black,
    padding: 10,
    backgroundColor: colors.white,
    fontFamily: typography.interRegular,
    fontSize: 16,
    borderWidth: 2,
    borderColor: colors.lightPink,
    borderRadius: 8,
    marginBottom: 30,
  },
  label: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 15,
  },
  taskColor: {
    fontSize: 17,
    fontWeight: "bold",
    paddingLeft: 10,
    marginTop: 20,
    marginBottom: 7,
  },
});
