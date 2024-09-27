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
import { TouchableOpacity } from "react-native-gesture-handler";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";


const emojisWithIcons = [
  { title: "It / Block D", icon: "emoticon-happy-outline" },
  { title: "Engineering / Block B", icon: "emoticon-cool-outline" },
  { title: "Pharmacy / Block A", icon: "emoticon-cool-outline" },
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

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "90%" }}>
          <Image
            style={{ width: "100%", height: "30%", resizeMode: "contain" }}
            source={{
              uri: "data:image/jpeg;base64,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",
            }}
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
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
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
