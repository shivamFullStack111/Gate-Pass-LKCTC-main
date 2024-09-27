import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { secondaryClor } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  setAllRequests,
  setAllUsers,
  setIsAuthenticated,
  setUser,
} from "../store/slices/userSlice";

const VarifiedStatus = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lyallpur Khalsa College</Text>
        <Text style={styles.subHeaderText}>Teacher Gate Pass Registration</Text>
      </View>

      <Image
        source={{ uri: "https://example.com/college-logo.png" }} // Replace with the actual logo URL
        style={styles.logo}
      />

      {user?.isVarified ? (
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>Welcome, you are registered!</Text>
          <Text style={styles.verifiedSubText}>
            Your gate pass has been successfully generated.
          </Text>
        </View>
      ) : (
        <View style={styles.notVerifiedContainer}>
          <Text style={styles.notVerifiedText}>You are not verified yet.</Text>
          <Text style={styles.notVerifiedSubText}>
            Please contact the administration for verification.
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          dispatch(setUser(null));
          dispatch(setIsAuthenticated(false));
          dispatch(setAllRequests([]));
          dispatch(setAllUsers([]));
        }}
      >
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 18,
    color: "#6c757d",
    textAlign: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  verifiedContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  verifiedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#28a745",
  },
  verifiedSubText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },
  notVerifiedContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  notVerifiedText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#dc3545",
  },
  notVerifiedSubText: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: secondaryClor,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default VarifiedStatus;
