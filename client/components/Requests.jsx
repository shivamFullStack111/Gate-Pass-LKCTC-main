import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { dbUrl, formatDate, formatTime, secondaryClor } from "../utils";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  removeSingleRequest,
  updateAllRequests,
  updateAllUsers,
} from "../store/slices/userSlice";

const Requests = () => {
  const { height, width } = Dimensions.get("window");
  const { allRequests } = useSelector((state) => state.user);
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();
  const handleCanelRequest = async (gatePassid) => {
    setisRequesting(true);
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setisRequesting(false);
        return;
      }

      const res = await axios.post(
        dbUrl + "/cancel-request",
        { gatePassid },
        { headers: { Authorization: token } }
      );

      if (res?.data?.success) {
        setisRequesting(false);
        dispatch(removeSingleRequest(gatePassid));
      }
      alert("Request deleted!");

      setisRequesting(false);
    } catch (error) {
      console.log(error.message);
      setisRequesting(false);
    }
  };

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
            top: 0,
            position: "absolute",
            width,
            height,
          }}
        >
          {allRequests?.length ? (
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
                All Requests
              </Text>

              <View style={{ zIndex: 40, marginTop: 40, marginBottom: 75 }}>
                {allRequests?.map((data, i) => (
                  <View
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
                      <Text style={{ color: secondaryClor }}>
                        {data?.userName}
                      </Text>
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
                        {data?.directorStatus == " cancel" ||
                        data?.hodStatus == "cancel" ? (
                          "Cancel"
                        ) : (
                          <Text>
                            {data?.hodStatus == "pending" ||
                            data?.directorStatus == "pending"
                              ? "pending"
                              : "Confirmed"}
                          </Text>
                        )}
                      </Text>
                    </Text>

                    {data?.hodStatus !== "cancel" && (
                      <View>
                        {data?.hodStatus == "confirm" ||
                          (data?.directorStatus !== "confirm" && (
                            <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity
                                onPress={() => handleCanelRequest(data?._id)}
                                style={{
                                  width: "50%",
                                  height: 40,
                                  backgroundColor: secondaryClor,
                                  borderRadius: 10,
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginLeft: "auto",
                                }}
                              >
                                <Text style={{ color: "white" }}>
                                  {isRequesting ? (
                                    <ActivityIndicator color={"white"} />
                                  ) : (
                                    "Cancel"
                                  )}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                      </View>
                    )}
                  </View>
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

        {/* // boxes */}
      </View>
      {/* ) : (
        <EmptyBox />
      )} */}
    </View>
  );
};

export default Requests;

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
