import { View, Text, Image, StatusBar, Dimensions } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { bgSlate900, collegeName, primaryColor, secondaryClor } from "../utils";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ScrollView } from "react-native";
import Requests from "./Requests";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Profile from "./Profile";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import HOD_DIR_Request_Status from "./HOD_DIR_Request_Status";
import AllRequestForKeeper from "./AllRequestForKeeper";

const HomePage = () => {
  const { height } = Dimensions.get("screen");
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={secondaryClor} />
      <LinearGradient
        style={{ flex: 1 }}
        colors={["#fff", "#fff", "#fff", "#fff", "#fff", "#fff"]}
      >
        <View
          style={{
            height: "30%",
            backgroundColor: secondaryClor,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          <View
            style={{
              position: "absolute",
              bottom: -30,
              backgroundColor: "white",
              height: 60,
              width: "80%",
              alignSelf: "center",
              borderRadius: 15,
              elevation: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "500" }}>
              {user?.role == "teacher" ? "Apply for gate" : "Welcome"}
              <Text
                style={{
                  color: secondaryClor,
                  fontStyle: "italic",
                  fontWeight: "900",
                }}
              >
                {user?.role == "teacher" ? " pass" : " !"}
              </Text>
            </Text>
          </View>
        </View>

        {/* // boxes */}

        <View
          style={{
            width: "95%",
            alignSelf: "center",
            height: "100%",
            marginTop: 60,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            {user?.role == "teacher" && (
              <View
                style={{
                  width: "45%",
                  height: 60,
                  borderRadius: 10,
                  backgroundColor: secondaryClor,
                  justifyContent: "center",
                  alignItems: "center",
                  elevation: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.navigate("apply")}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 3,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "500",
                        fontSize: 16,
                      }}
                    >
                      Click to apply...
                    </Text>

                    <AntDesign name="form" size={24} color="white" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <View
              style={{
                width: "45%",
                height: 60,
                borderRadius: 10,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: secondaryClor,

                elevation: 10,
              }}
            >
              <TouchableOpacity onPress={() => navigation.navigate("requests")}>
                <Text
                  style={{
                    color: secondaryClor,
                    fontWeight: "500",
                    fontSize: 16,
                  }}
                >
                  View status
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text
            style={{
              marginTop: 30,
              fontSize: 18,
              fontWeight: "700",
              color: bgSlate900,
            }}
          >
            How pass flow
          </Text>
          <View style={{ marginTop: 20 }}>
            {/* step 1  */}
            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: primaryColor,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 17,
                    color: primaryColor,
                  }}
                >
                  1
                </Text>
              </View>
              <Text style={{ fontWeight: "600" }}>Apply</Text>
            </View>
            <Text
              style={{
                width: 4,
                height: 40,
                backgroundColor: primaryColor,
                marginLeft: 12,
                top: -1,
              }}
            ></Text>

            {/* step 2  */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                top: -2,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: primaryColor,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 17,
                    color: primaryColor,
                  }}
                >
                  2
                </Text>
              </View>
              <Text style={{ fontWeight: "600" }}>
                To Head Of Department (HOD)
              </Text>
            </View>
            <Text
              style={{
                width: 4,
                height: 40,
                backgroundColor: primaryColor,
                marginLeft: 12,
                top: -3,
              }}
            ></Text>

            {/* step 3 */}

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                top: -3,
              }}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 100,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: primaryColor,
                }}
              >
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 17,
                    color: primaryColor,
                  }}
                >
                  3
                </Text>
              </View>
              <Text style={{ fontWeight: "600" }}>To Director</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#fff",
          position: "absolute",
          width: "94%",
          alignSelf: "center",
          marginLeft: "3%",
          marginBottom: 10,
          height: 55,
          borderRadius: 5,
          borderColor: "white",
          elevation: 5,
        },

        tabBarActiveTintColor: primaryColor,
      }}
    >
      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            // <Text style={{ color: focused ? primaryColor : "black" }}>nj</Text>
            <AntDesign
              name="home"
              size={30}
              color={focused ? primaryColor : "black"}
            />
          ),
        }}
        name="home"
        component={HomePage}
      />
      {user?.role == "hod" || user?.role == "director" ? (
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Feather
                name="list"
                size={34}
                color={focused ? primaryColor : "black"}
              />
            ),
          }}
          name="requests"
          component={HOD_DIR_Request_Status}
        />
      ) : null}

      {user?.role == "teacher" && (
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              // <Text style={{ color: focused ? primaryColor : "black" }}>nj</Text>

              <Feather
                name="list"
                size={34}
                color={focused ? primaryColor : "black"}
              />
            ),
          }}
          name="requests"
          component={Requests}
        />
      )}

      {user?.role == "keeper" && (
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              // <Text style={{ color: focused ? primaryColor : "black" }}>nj</Text>

              <Feather
                name="list"
                size={34}
                color={focused ? primaryColor : "black"}
              />
            ),
          }}
          name="requests"
          component={AllRequestForKeeper}
        />
      )}

      <Tab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            // <Text style={{ color: focused ? primaryColor : "black" }}>nj</Text>

            <MaterialIcons
              name="history"
              size={34}
              color={focused ? primaryColor : "black"}
            />
          ),
        }}
        name="profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default Home;
