import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { collegeName, formatDate, formatTime, secondaryClor } from "../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingRequests_Admin from "./admins/PendingRequests_Admin";
import Registrations_Admin from "./admins/Registrations_Admin";

const HOD_DIR_Request_Status = () => {
  const { height, width } = Dimensions.get("window");
  const { user, allRequests } = useSelector((state) => state.user);

  const Tab = createMaterialTopTabNavigator();

  return (
    <View style={{ flex: 1 }}>
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

        {/* {allRequests?.length ? ( */}

        <View
          style={{
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
          <Tab.Navigator
            screenOptions={{
              tabBarStyle: {
                backgroundColor: secondaryClor,
                borderColor: "red",
                width: "95%",
                alignSelf: "center",
                borderRadius: 10,
              },
            }}
            style={{ marginTop: "40%" }}
          >
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }) => {
                  return (
                    <Text style={{ color: focused ? "white" : "gray" }}>
                      Pending
                    </Text>
                  );
                },
              }}
              name="Pending"
              component={PendingRequests_Admin}
            ></Tab.Screen>

            {user?.role == "director" && (
              <Tab.Screen
                options={{
                  tabBarLabel: ({ focused }) => {
                    return (
                      <Text style={{ color: focused ? "white" : "gray" }}>
                        Registrations
                      </Text>
                    );
                  },
                }}
                name="Registrations"
                component={Registrations_Admin}
              ></Tab.Screen>
            )}
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }) => {
                  return (
                    <Text style={{ color: focused ? "white" : "gray" }}>
                      History
                    </Text>
                  );
                },
              }}
              name="History"
              component={Pending}
            ></Tab.Screen>
          </Tab.Navigator>
        </View>

        {/* // boxes */}
      </View>
      {/* ) : (
        <EmptyBox />
      )} */}
    </View>
  );
};

export default HOD_DIR_Request_Status;

const Pending = () => {
  const { height, width } = Dimensions.get("window");
  const { user, allRequests } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(allRequests.length);
  }, [allRequests]);
  return (
    <View style={{ flex: 1 }}>
      {allRequests?.length || true ? (
        <ScrollView style={{ flex: 1, zIndex: 40 }}>
          <Text
            style={{
              marginLeft: 20,
              marginTop: 10,
              fontWeight: "500",
              fontSize: 21,
              color: "white",
            }}
          >
            All Requests
          </Text>

          <View style={{ zIndex: 40, marginTop: 20, paddingBottom: 70 }}>
            {allRequests?.map((data, i) => (
              <TouchableOpacity
                style={{
                  width: "90%",
                  backgroundColor: "#fff",
                  alignSelf: "center",
                  elevation: 7,
                  borderRadius: 15,
                  marginBottom: 10,
                  padding: 10,
                  shadowColor: secondaryClor,
                }}
                key={i}
              >
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Name:-{" "}
                  <Text style={{ color: secondaryClor }}>{data?.userName}</Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Apply Date:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatDate(data?.date?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Exit time:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatTime(data?.exitTime?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Return time:-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {formatTime(data?.returnTime?.toString())}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Department :-{" "}
                  <Text style={{ color: secondaryClor }}>
                    {data?.department}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "500", fontSize: 17 }}>
                  Status :-
                  <Text style={{ color: secondaryClor }}>
                    {" "}
                    {data?.hodStatus == "pending" ||
                    data?.directorStatus == "pending"
                      ? "pending"
                      : "Confirmed"}
                  </Text>
                </Text>
                <Text></Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              height: 170,
              backgroundColor: "#FFF",
              elevation: 10,
              borderRadius: 15,
              alignItems: "center",
              padding: 5,
              justifyContent: "center",
              shadowColor: secondaryClor,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: secondaryClor,
              }}
            >
              Request list is empty
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const EmptyBox = () => {
  return (
    <View>
      <Text
        style={{
          justifyContent: "center",
          flex: 1,
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "gray",
          zIndex: 40,
        }}
      >
        Requests
      </Text>
    </View>
  );
};
