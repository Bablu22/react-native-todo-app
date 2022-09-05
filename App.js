import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Welcome from "./src/screens/Welcome";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";
import SignUp from "./src/screens/SignUp";
import { colors } from "./src/themes/colors";
import SignIn from "./src/screens/SignIn";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import Create from "./src/screens/Create";

const firebaseConfig = {
  apiKey: "AIzaSyCnH-lKRPo3uDe34sY81jghxp2lHyFE1ls",
  authDomain: "react-native-todo-app-3b09e.firebaseapp.com",
  projectId: "react-native-todo-app-3b09e",
  storageBucket: "react-native-todo-app-3b09e.appspot.com",
  messagingSenderId: "544199109373",
  appId: "1:544199109373:web:d60b906181ba0a4c4eac94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);

const Stack = createNativeStackNavigator();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [looding, setLooding] = useState(true);
  const [user, setuser] = useState(null);

  const LoadFonts = async () => {
    try {
      await useFonts();
    } catch (e) {
      console.warn(e);
    } finally {
      SetIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    LoadFonts();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user);

      } else {
        setuser(null);
      }
      setLooding(false);
    });

  }, []);

  if (!IsReady) {
    return null;
  }



  console.log(looding, user);
  return (
    <>

      {
        looding ?
          <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: "center", alignItems: "center", }} />
          : <NavigationContainer>
            <Stack.Navigator>

              {user ? (
                <>
                  <Stack.Screen name="Home" options={{
                    title: "Tasks",
                    headerStyle: {
                      backgroundColor: colors.black,
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 30,

                    },
                  }} >
                    {(props) => <Home {...props} user={user} />}
                  </Stack.Screen>
                  <Stack.Screen name="Create" options={{
                    title: "Create Task",
                    headerStyle: {
                      backgroundColor: colors.white,
                    },
                    headerTintColor: colors.black,
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: 20,

                    },
                  }} >
                    {(props) => <Create {...props} user={user} />}
                  </Stack.Screen>
                </>
              ) : (
                <>

                  <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignIn"
                    component={SignIn}
                    options={{
                      title: "Sign In",
                      headerStyle: {
                        backgroundColor: colors.black,

                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },

                    }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{
                      title: "Sign Up",
                      headerStyle: {
                        backgroundColor: colors.black,
                      },
                      headerTintColor: "#fff",
                      headerTitleStyle: {
                        fontWeight: "bold",
                      },
                    }}
                  />
                </>
              )}
            </Stack.Navigator>
            <StatusBar style="light" />
          </NavigationContainer>
      }


    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
