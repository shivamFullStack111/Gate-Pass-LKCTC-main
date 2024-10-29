import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collegeName, dbUrl, secondaryClor } from "../utils";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setUser } from "../store/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = () => {
  const { height, width } = Dimensions.get("window");
  const { user } = useSelector((state) => state.user);
  const [editMode, seteditMode] = useState(false);
  const [userData, setuserData] = useState({});

  useEffect(() => {
    if (user) {
      setuserData(user);
    }
  }, [user]);

  const updateUser = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.post(
        `${dbUrl}/update-user`,
        { userData },
        { headers: { Authorization: token } }
      );
      console.log(res?.data?.user);
      alert(res?.data?.message);
      if (res.data?.success) {
        seteditMode(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <StatusBar backgroundColor={secondaryClor} />

      <View
        style={{
          height: "30%",
          backgroundColor: secondaryClor,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      ></View>

      <View
        style={{
          top: 0,
          position: "absolute",
          width,
          height,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: secondaryClor,
          }}
        >
          <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 100,
              backgroundColor: "white",
              margin: 20,
              marginTop: 30,
              marginRight: 10,

              objectFit: "contain",
            }}
            source={require("../images/lkclogo.jpg")}
          ></Image>
          <View>
            <Text
              style={{
                fontSize: 16,
                color: "white",
                flexWrap: "wrap",
                flexShrink: 30,
              }}
            >
              {collegeName.slice(0, 24)}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: "white",
                flexWrap: "wrap",
                flexShrink: 30,
                marginBottom: 3,
              }}
            >
              {collegeName.slice(24, 100)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#cfc9c8",
                flexWrap: "wrap",
                flexShrink: 200,
              }}
            >
              Jalandhar,Punjab 144001
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1, zIndex: 40 }}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontWeight: "500",
              fontSize: 19,
              color: "white",
            }}
          >
            Profile
          </Text>

          <View
            style={{
              width: "80%",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              backgroundColor: "white",
              paddingVertical: 15,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: secondaryClor, fontWeight: "600" }}>
              Login with :- {user?.email}
            </Text>
          </View>

          {/* {user?.role!=='keeper'?  <View> 
          {user?.role !== "director" && user?.role !== "hod" ? (
            <View>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${9417313393}`);
                }}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 20,
                  marginTop: 40,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 17 }}
                >
                  {" "}
                  Call to Director Mr (Name)
                </Text>
                <Feather name="phone-call" size={24} color="#32CD32" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(`tel:${9464046810}`);
                }}
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 17 }}
                >
                  {" "}
                  Call to head of department (HOD){" "}
                </Text>
                <Feather name="phone-call" size={24} color="#32CD32" />
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
          </View>
          :<View style={{height:50}}></View>
          } */}

          <View
            style={{ width: "90%", alignSelf: "center", alignItems: "center" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 70,
                width: "90%",
                // borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <Feather name="user" size={24} color={secondaryClor} />
              {/* <Text>{user?.name}</Text> */}
              <TextInput
                readOnly={!editMode}
                onChangeText={(t) => setuserData((p) => ({ ...p, name: t }))}
                value={userData?.name}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                // borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <Feather name="mail" size={24} color={secondaryClor} />
              <TextInput
                readOnly
                onChangeText={(t) => setuserData((p) => ({ ...p, email: t }))}
                value={userData?.email}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <FontAwesome name="building-o" size={24} color={secondaryClor} />
              <TextInput
                readOnly={!editMode}
                onChangeText={(t) =>
                  setuserData((p) => ({ ...p, department: t }))
                }
                value={userData?.department}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "90%",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: secondaryClor,
                elevation: 5,
                shadowColor: secondaryClor,
                backgroundColor: "white",
                marginBottom: 15,
                gap: 10,
              }}
            >
              <MaterialIcons name="password" size={24} color={secondaryClor} />

              <TextInput
                readOnly={!editMode}
                onChangeText={(t) =>
                  setuserData((p) => ({ ...p, password: t }))
                }
                value={editMode ? userData?.password : "********"}
                style={{ width: "100%", height: "100%" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setuserData((p) => ({ ...p, password: "" }));
                  seteditMode((p) => !p);
                }}
                style={{
                  width: "43%",
                  height: 50,
                  borderRadius: 10,
                  backgroundColor: secondaryClor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  <Text
                    style={{ color: "white", fontWeight: "500", fontSize: 16 }}
                  >
                    {editMode ? "Cancel" : "Edit"}
                  </Text>
                </View>
              </TouchableOpacity>
              {!editMode ? (
                <TouchableOpacity
                  onPress={async () => {
                    await AsyncStorage.removeItem("token");

                    dispatch(setUser(undefined));
                    dispatch(setIsAuthenticated(false));
                  }}
                  style={{
                    width: "43%",
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: secondaryClor,

                    elevation: 10,
                  }}
                >
                  <Text
                    style={{
                      color: secondaryClor,
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Log Out
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => updateUser()}
                  style={{
                    width: "43%",
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: secondaryClor,

                    elevation: 10,
                  }}
                >
                  <Text
                    style={{
                      color: secondaryClor,
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      {/* // boxes */}
    </View>
  );
};

export default Profile;
