import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../themes/colors";
import { typography } from "../themes/typhography";
import { signOut } from "firebase/auth";
import { auth, db } from "../../App";
import { AntDesign } from "@expo/vector-icons";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "@firebase/firestore";

export default function Home({ navigation, route, user }) {
  const [notes, setNotes] = useState([]);
  const [looding, setLooding] = useState(false);

  useEffect(() => {
    setLooding(true);
    const q = query(collection(db, "notes"), orderBy("timestamp", "desc"));
    const noteSub = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      const filterd = list.filter((item) => item.uid == user.uid);
      setNotes(filterd);
      setLooding(false);
    });

    return noteSub;
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDlete = (id) => {
    deleteDoc(doc(db, "notes", id));
    Alert.alert("Task delete Success");
  };

  const renderItem = ({ item }) => {
    const { title, color, description, id } = item;
    return (
      <>
        <TouchableOpacity style={[styles.task, { backgroundColor: color }]}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={[
                {
                  fontSize: 18,
                  fontWeight: "bold",
                  textTransform: "capitalize",
                },
                color === "#884ED0" ? styles.white : styles.black,
              ]}
            >
              {title}
            </Text>
            <TouchableOpacity onPress={() => handleDlete(id)}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              {
                fontSize: 14,
                textTransform: "capitalize",
                fontFamily: typography.MontserratRegular,
                fontWeight: "bold",
              },
              color === "#884ED0" ? styles.white : styles.black,
            ]}
          >
            {description}
          </Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Create")}
          style={{
            backgroundColor: colors.lightPink,
            height: 40,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 50,
            paddingLeft: 50,
            textAlign: "center",
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontFamily: typography.MontserratBold,
              fontWeight: "bold",
            }}
          >
            Add Task
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: colors.red,
            height: 40,
            paddingTop: 10,
            paddingBottom: 10,
            paddingRight: 50,
            paddingLeft: 50,
            textAlign: "center",
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              fontFamily: typography.MontserratBold,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>

      {notes.length === 0 ? (
        <>
          {looding ? (
            <ActivityIndicator
              size="large"
              color="white"
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          ) : (
            <View style={{}}>
              <Text
                style={{
                  fontSize: 40,
                  color: "white",
                  textAlign: "center",
                  marginTop: 50,
                }}
              >
                Creata a new task
              </Text>
              <View style={styles.backgroundContainer}>
                <Image
                  source={require("../../assets/Checklist.jpg")}
                  style={styles.backgroundImage}
                />
              </View>
            </View>
          )}
        </>
      ) : (
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
                  color="white"
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </Text>
            </View>
          ) : (
            <FlatList
              data={notes}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              contentContainerStyle={styles.flatlist}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  flatlist: {
    padding: 20,
  },
  task: {
    padding: 15,
    width: "100%",
    marginBottom: 15,
    borderRadius: 9,
  },
  black: {
    color: "black",
  },
  white: {
    color: "white",
  },
  backgroundImage: {
    marginTop: 40,
    width: 300,
    height: 200,
  },
  backgroundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
