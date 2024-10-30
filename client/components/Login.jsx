import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { dbUrl, primaryColor } from "../utils";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsAuthenticated, setUser } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";

const Login = () => {
  const [active, setActive] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRequesting, setisRequesting] = useState(false);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    let notificationToken = null;

    // Attempt to register for push notifications
    try {
      notificationToken = await registerForPushNotificationsAsync();
    } catch (err) {
      console.log("Error retrieving push notification token:", err);
    }

    if (isRequesting) return;

    try {
      if (!email || !password) {
        return alert("All fields are required.");
      }

      setisRequesting(true); // Set requesting state before making the API call
      const res = await axios.post(`${dbUrl}/login`, {
        email,
        password,
        // notificationToken: notificationToken || "", // Use token if available
      });

      console.log(res.data);
      alert(res.data?.message);
      if (res?.data?.success) {
        await AsyncStorage.setItem("token", res?.data?.token);
        dispatch(setUser(res?.data?.user));
        dispatch(setIsAuthenticated(true));
      }
    } catch (error) {
      console.log(error.message, "...........");
      alert(error.message);
    } finally {
      setisRequesting(false); // Reset requesting state
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>
            <Image
              style={{ width: "100%", height: "35%", resizeMode: "contain" }}
              source={require("../images/lkclogo.jpg")}
            ></Image>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 3,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Email:
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                elevation: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                shadowColor: active === 2 ? "blue" : "black",
              }}
            >
              <TextInput
                style={{ fontSize: 16 }}
                onFocus={() => setActive(2)}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail} // Update state on change
              />
            </View>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 3,
                fontSize: 16,
                fontWeight: "500",
                marginTop: 10,
              }}
            >
              Password:
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                elevation: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                marginBottom: 15,
                shadowColor: active === 3 ? "blue" : "black",
              }}
            >
              <TextInput
                style={{ fontSize: 16 }}
                onFocus={() => setActive(3)}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword} // Update state on change
              />
            </View>
            <Pressable
              style={{
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: 45,
                backgroundColor: "#0088ff",
                borderRadius: 10,
              }}
              onPress={handleLogin} // Call the function on press
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {isRequesting ? <ActivityIndicator color={"white"} /> : "Login"}
              </Text>
            </Pressable>
            <Text
              style={{ alignSelf: "center", marginTop: 10, fontWeight: "500" }}
              onPress={() => navigation.navigate("register")}
            >
              Not have an account?{" "}
              <Text style={{ color: primaryColor }}>Register</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return 0;
    }

    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
