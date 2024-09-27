import {
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dbUrl, formatDate, formatTime, secondaryClor } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateAllRequests } from "../../store/slices/userSlice";
import axios from "axios";

const PendingRequests_Admin = () => {
  const { height, width } = Dimensions.get("window");
  const { allRequests, user } = useSelector((state) => state.user);
  const [allRequestToMap, setallRequestToMap] = useState([]);
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRequests?.length > 0) {
      const filterdata = allRequests.filter((request) => {
        return (
          request?.hodStatus === "pending" ||
          request?.directorStatus === "pending"
        );
      });
      setallRequestToMap(filterdata);
    }
  }, [allRequests]);

  const handleChangeRequest = async (status, id) => {
    try {
      setisRequesting(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setisRequesting(false);
        return;
      }

      const res = await axios.post(
        dbUrl + "/update-status-of-pass",
        {
          status,
          gatepassid: id,
        },
        { headers: { Authorization: token } }
      );

      alert(res?.data?.message);

      if (res.data?.success) {
        let data;
        if (user?.role === "hod") {
          data = { hodStatus: status };
        }
        if (user?.role === "director") {
          data = { directorStatus: status };
        }
        dispatch(updateAllRequests({ id, data }));
      }

      setisRequesting(false);
    } catch (error) {
      setisRequesting(false);
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {allRequestToMap?.length ? (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerText}>All Requests</Text>

          <View style={styles.requestsContainer}>
            {allRequestToMap?.map((data, i) => (
              <View style={styles.requestCard} key={i}>
                <Text style={styles.requestText}>
                  Name:-{" "}
                  <Text style={styles.secondaryText}>{data?.userName}</Text>
                </Text>
                <Text style={styles.requestText}>
                  Apply Date:-{" "}
                  <Text style={styles.secondaryText}>
                    {formatDate(data?.date?.toString())}
                  </Text>
                </Text>
                <Text style={styles.requestText}>
                  Exit time:-{" "}
                  <Text style={styles.secondaryText}>
                    {formatTime(data?.exitTime?.toString())}
                  </Text>
                </Text>
                <Text style={styles.requestText}>
                  Return time:-{" "}
                  <Text style={styles.secondaryText}>
                    {formatTime(data?.returnTime?.toString())}
                  </Text>
                </Text>
                <Text style={styles.requestText}>
                  Department :-{" "}
                  <Text style={styles.secondaryText}>
                    {data?.department}
                  </Text>
                </Text>
                <Text style={styles.requestText}>
                  Status :- 
                  <Text style={styles.secondaryText}>
                    {user?.role === "hod" && data?.hodStatus === "pending" ? (
                      <Text>Pending</Text>
                    ) : user?.role === "director" &&
                      data?.directorStatus === "pending" ? (
                      <Text>Pending</Text>
                    ) : (
                      <Text>Confirm</Text>
                    )}
                  </Text>
                </Text>
                {(user?.role === "hod" && data?.hodStatus === "pending") ||
                (user?.role === "director" && data?.directorStatus === "pending") ? (
                  <View style={styles.buttonContainer}>
                    {isRequesting ? (
                      <ActivityIndicator style={styles.loadingIndicator} size={30} color={secondaryClor} />
                    ) : (
                      <View style={styles.buttonRow}>
                        <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() => handleChangeRequest("cancel", data?._id)}
                        >
                          <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.confirmButton}
                          onPress={() => handleChangeRequest("confirm", data?._id)}
                        >
                          <Text style={styles.confirmButtonText}>Confirm</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyMessage}>
            <Text style={styles.emptyText}>Request list is empty</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    zIndex: 40,
  },
  headerText: {
    marginLeft: 20,
    marginTop: 10,
    fontWeight: "500",
    fontSize: 21,
    color: "white",
  },
  requestsContainer: {
    zIndex: 40,
    marginTop: 0,
    marginBottom: 70,
  },
  requestCard: {
    width: "90%",
    backgroundColor: "#fff",
    alignSelf: "center",
    elevation: 10,
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    shadowColor: "black",
  },
  requestText: {
    fontWeight: "500",
    fontSize: 17,
  },
  secondaryText: {
    color: secondaryClor,
  },
  buttonContainer: {
    flex: 1,
    marginTop: 10,
  },
  loadingIndicator: {
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cancelButton: {
    width: "40%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: secondaryClor,
  },
  cancelButtonText: {
    color: secondaryClor,
    fontSize: 16,
    fontWeight: "500",
  },
  confirmButton: {
    width: "40%",
    height: 40,
    backgroundColor: secondaryClor,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    width: "85%",
    height: 100,
    backgroundColor: "#FFF",
    elevation: 10,
    borderRadius: 15,
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
    shadowColor: secondaryClor,
    marginBottom: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "800",
    color: secondaryClor,
  },
});

export default PendingRequests_Admin;
