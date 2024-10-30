import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { dbUrl, primaryColor, secondaryClor } from "../utils";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setIsAuthenticated, setUser } from "../store/slices/userSlice";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

const emojisWithIcons = [
  { title: "IT" },
  { title: "Management" },
  { title: "Pharmacy" },
  { title: "CE" },
  { title: "ECE" },
  { title: "HM" },
  { title: "MLS" },
  { title: "CSE" },
  { title: "AS" },
  { title: "ME" },
  { title: "" },
];

const Register = () => {
  const [active, setActive] = useState(-1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const navigation = useNavigation();
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();
  const [roleSelectOpen, setroleSelectOpen] = useState(false);
  const { height } = Dimensions.get("screen");
  const [role, setrole] = useState("");

  // Function to handle button press
  const handleRegister = async () => {
    try {
      if (isRequesting) return;
      setisRequesting(true);

      let notificationToken;
      await registerForPushNotificationsAsync()
        .then((token) => (notificationToken = token))
        .catch((err) => console.log(err));

      if (!name || !email || !password || !department || !role) {
        setisRequesting(false);
        return alert("all field are required");
      }

      const res = await axios.post(`${dbUrl}/register`, {
        name,
        email,
        password,
        department,
        role,
        notificationToken: notificationToken ? notificationToken : "",
      });

      console.log(res.data);
      alert(res.data?.message);
      if (res?.data?.success) {
        await AsyncStorage.setItem("token", res?.data?.token);
        dispatch(setUser(res?.data?.user));
        dispatch(setIsAuthenticated(true));
      }
      setisRequesting(false);
    } catch (error) {
      console.log(error.message);
      setisRequesting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* modal for select role */}
        {roleSelectOpen && (
          <View
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "#0009",
              height: "100%",
              width: "100%",
              zIndex: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "90%",
                borderRadius: 20,
                backgroundColor: "white",
                minHeight: 300,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 22,
                  fontWeight: "700",
                  marginBottom: 20,
                  marginTop: 10,
                }}
              >
                Select Role
              </Text>
              <TouchableOpacity
                onPress={() => setrole("teacher")}
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderTopWidth: 0.7,
                  borderBottomWidth: 0.7,
                  borderColor: "gray",
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        role === "teacher" ? secondaryClor : "white",
                      height: "50%",
                      width: "50%",
                      borderRadius: 100,
                    }}
                  ></View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>Teacher</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setrole("hod")}
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  // borderTopWidth: 0.7,
                  borderBottomWidth: 0.7,
                  borderColor: "gray",
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: role === "hod" ? secondaryClor : "white",
                      height: "50%",
                      width: "50%",
                      borderRadius: 100,
                    }}
                  ></View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {" "}
                  Head Of Department (HOD)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setrole("keeper")}
                style={{
                  flexDirection: "row",
                  gap: 5,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  // borderTopWidth: 0.7,
                  borderBottomWidth: 0.7,
                  borderColor: "gray",
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "white",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      backgroundColor:
                        role === "keeper" ? secondaryClor : "white",
                      height: "50%",
                      width: "50%",
                      borderRadius: 100,
                    }}
                  ></View>
                </View>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {" "}
                  Gate Keeper
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  marginTop: 30,
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 45,
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: secondaryClor,
                  }}
                >
                  <TouchableOpacity onPress={() => setroleSelectOpen(false)}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: secondaryClor,
                        fontWeight: "500",
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 45,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: secondaryClor,
                  }}
                >
                  <TouchableOpacity onPress={handleRegister}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      Register
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={{ width: "90%" }}>
            <Image
              style={{ width: "100%", height: "30%", resizeMode: "contain" }}
              source={require("../images/lkclogo.jpg")}
            ></Image>
            <Text
              style={{
                marginLeft: 10,
                marginBottom: 3,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Name:
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                elevation: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                shadowColor: active === 1 ? "blue" : "black",
              }}
            >
              <TextInput
                style={{ fontSize: 16 }}
                onFocus={() => setActive(1)}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
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
                onChangeText={setEmail}
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
              Department:
            </Text>
            <View
              style={{
                borderRadius: 10,
                backgroundColor: "white",
                elevation: 5,
                paddingHorizontal: 10,
                paddingVertical: 10,
                shadowColor: active === 3 ? "blue" : "black",
              }}
            >
              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  setDepartment(selectedItem.title);
                }}
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                        {(selectedItem && selectedItem.title) ||
                          "Select your Department"}
                      </Text>
                    </View>
                  );
                }}
                renderItem={(item, index, isSelected) => {
                  return (
                    <View
                      style={{
                        ...styles.dropdownItemStyle,
                        ...(isSelected && { backgroundColor: "#D2D9DF" }),
                      }}
                    >
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
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
                shadowColor: active === 4 ? "blue" : "black",
              }}
            >
              <TextInput
                style={{ fontSize: 16 }}
                onFocus={() => setActive(4)}
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
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
              onPress={() => setroleSelectOpen(true)} // Call the function on press
            >
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>
                {isRequesting ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  "Register"
                )}
              </Text>
            </Pressable>

            <Text
              style={{ alignSelf: "center", marginTop: 10, fontWeight: "500" }}
              onPress={() => navigation.navigate("login")}
            >
              Already have an account?{" "}
              <Text style={{ color: primaryColor }}>Login</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 30,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "gray",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
    top: "4 0%",
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    // paddingBottom:30
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});

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
      return;
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
