import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dbUrl, formatDate, formatTime, secondaryClor } from "../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { removeSingleUser, updateAllUsers } from "../../store/slices/userSlice";
import Entypo from "@expo/vector-icons/Entypo";

const Registrations_Admin = () => {
  const { height, width } = Dimensions.get("window");
  const { allUsers } = useSelector((state) => state.user);
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();

  const handleVerifyUser = async (userid) => {
    if (isRequesting) return;
    setisRequesting(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setisRequesting(false);
        alert("token not found login to continue");
      }
      const res = await axios.post(
        dbUrl + "/verify-user",
        { userid },
        { headers: { Authorization: token } }
      );

      console.log(res.data);

      if (res?.data?.success) {
        setisRequesting(false);
        dispatch(updateAllUsers({ userid, data: { isVarified: true } }));
      }
      setisRequesting(false);
    } catch (error) {
      console.log(error.message);
      setisRequesting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {allUsers?.length ? (
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

          <View style={{ zIndex: 40, marginTop: 0, marginBottom: 70 }}>
            {allUsers?.map((user, i) => (
              <Card handleVerifyUser={handleVerifyUser} user={user} key={i} />
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
              marginBottom: 60,
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

export default Registrations_Admin;

const Card = ({ user, handleVerifyUser }) => {
  const [deleteOpen, setdeleteOpen] = useState(false);
  const dispatch = useDispatch();
  const [isRequesting, setisRequesting] = useState(false);
  return (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        backgroundColor: "white",
        elevation: 5,
        padding: 10,
        paddingVertical: 18,
        marginTop: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 5 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Name:-{" "}
            <Text
              style={{
                color: secondaryClor,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {user?.name}
            </Text>
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Email:-{" "}
            <Text
              style={{
                color: secondaryClor,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {user?.email}
            </Text>
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Role:-{" "}
            <Text
              style={{
                color: secondaryClor,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {user?.role?.toUpperCase()}
            </Text>
          </Text>
          <Text style={{ fontSize: 17, fontWeight: "600" }}>
            Department:-{" "}
            <Text
              style={{
                color: secondaryClor,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              {user?.department}
            </Text>
          </Text>
          {!user?.isVarified && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                gap: 5,
                marginTop: 15,
              }}
            >
              <View
                style={{
                  height: 40,
                  width: "47%",
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: secondaryClor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {isRequesting ? (
                    <ActivityIndicator color={secondaryClor} />
                  ) : (
                    "Cancel"
                  )}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleVerifyUser(user?._id)}
                style={{
                  height: 40,
                  width: "47%",
                  borderRadius: 7,
                  borderWidth: 1,
                  borderColor: secondaryClor,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: secondaryClor,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    color: "white",
                  }}
                >
                  {isRequesting ? (
                    <ActivityIndicator color={"white"} />
                  ) : (
                    "Confirm"
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {user?.isVarified && (
            <TouchableOpacity
              style={{
                marginTop: 15,
                justifyContent: "center",
                alignItems: "center",
                height: 44,
                backgroundColor: secondaryClor,
                width: "100%",
                alignSelf: "center",
                borderRadius: 10,
                position: "relative",
              }}
              onPress={() => setdeleteOpen((p) => !p)}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "500",
                  fontSize: 16,
                }}
              >
                {isRequesting ? (
                  <ActivityIndicator color={"white"} />
                ) : (
                  "Delete user"
                )}
              </Text>
              {deleteOpen && (
                <View
                  style={{
                    position: "absolute",
                    top: -70,
                    backgroundColor: "white",
                    borderWidth: 1,
                    zIndex: 50,
                    right: 0,
                    minHeight: 80,
                    borderRadius: 10,
                    padding: 5,
                    paddingTop: 0,
                  }}
                >
                  <View
                    style={{
                      textAlign: "center",
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: secondaryClor,
                      }}
                    >
                      Sure! you want to delete this user?
                    </Text>
                    <Entypo
                      onPress={() => setdeleteOpen(false)}
                      name="cross"
                      size={28}
                      color="black"
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      width: "93%",
                      height: 40,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "red",
                      marginTop: 8,
                      alignSelf: "center",
                      marginBottom: 5,
                      borderRadius: 10,
                    }}
                    onPress={async () => {
                      setisRequesting(true);
                      try {
                        const token = await AsyncStorage.getItem("token");

                        if (!token) {
                          setisRequesting(false);
                          setdeleteOpen(false);
                          return;
                        }
                        const res = await axios.post(
                          dbUrl + "/delete-user",
                          {
                            userid: user?._id,
                          },
                          { headers: { Authorization: token } }
                        );
                        console.log(res.data);
                        if (res.data.success) {
                          dispatch(removeSingleUser(user?._id));
                          setdeleteOpen(false);
                          alert("user deleted successfully!");
                        } else {
                          alert("user not deleted!");
                        }
                        setisRequesting(false);
                      } catch (error) {
                        console.log(error.message);
                        setisRequesting(false);
                        setdeleteOpen(false);
                      }
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
