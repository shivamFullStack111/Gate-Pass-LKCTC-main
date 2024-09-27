// import { View, Text, TouchableOpacity } from "react-native";
// import React, { useState } from "react";
// import { ScrollView, TextInput } from "react-native-gesture-handler";
// import {
//   Entypo,
//   Feather,
//   FontAwesome,
//   Fontisto,
//   Ionicons,
//   MaterialIcons,
// } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import { secondaryClor } from "../utils";

// const ApplyPass = () => {
//   const navigation = useNavigation();
//   const [dateOpen, setdateOpen] = useState(false);
//   const [timeOpen, settimeOpen] = useState(false);
//   const [date, setdate] = useState(null);
//   const [time, settime] = useState(null);
//   const [endtime, setendtime] = useState(null);
//   const [endtimeOpen, setendtimeOpen] = useState(false);
//   return (
//     <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
//       <Entypo
//         name="cross"
//         size={34}
//         color={secondaryClor}
//         style={{ marginLeft: "auto", padding: 10 }}
//         onPress={() => navigation.goBack()}
//       />

//       <View
//         style={{
//           width: "90%",
//           alignSelf: "center",
//           alignItems: "center",
//           marginTop: 30,
//         }}
//       >
//         <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
//           <TouchableOpacity
//             onPress={() => setdateOpen(true)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               width: "45%",
//               // borderWidth: 1,
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               borderRadius: 10,
//               borderColor: secondaryClor,
//               elevation: 5,
//               shadowColor: secondaryClor,
//               backgroundColor: "white",
//               marginBottom: 15,
//               gap: 10,
//               height: 60,
//             }}
//           >
//             <Fontisto name="date" size={24} color={secondaryClor} />
//             <Text>{date ? date?.toString().slice(0, 15) : "select date"}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             onPress={() => settimeOpen(true)}
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               width: "45%",
//               // borderWidth: 1,
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               borderRadius: 10,
//               borderColor: secondaryClor,
//               elevation: 5,
//               shadowColor: secondaryClor,
//               backgroundColor: "white",
//               marginBottom: 15,
//               gap: 10,
//               height: 60,
//             }}
//           >
//             <Ionicons name="time-outline" size={24} color={secondaryClor} />
//             <Text>
//               {time ? time?.toString()?.slice(16, 21) : "select start time"}{" "}
//               {time
//                 ? Number(time?.toString()?.slice(16, 18)) > 12
//                   ? "PM"
//                   : "AM"
//                 : ""}
//             </Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={{ fontWeight: "500", color: secondaryClor }}>
//           Return timing
//         </Text>
//         <TouchableOpacity
//           onPress={() => setendtimeOpen(true)}
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             width: "45%",
//             // borderWidth: 1,
//             paddingHorizontal: 10,
//             paddingVertical: 10,
//             borderRadius: 10,
//             borderColor: secondaryClor,
//             elevation: 5,
//             shadowColor: secondaryClor,
//             backgroundColor: "white",
//             marginBottom: 15,
//             gap: 10,
//             height: 60,
//           }}
//         >
//           <Ionicons name="time-outline" size={24} color={secondaryClor} />
//           <Text>
//             {endtime ? endtime?.toString()?.slice(16, 21) : "select end time"}{" "}
//             {endtime
//               ? Number(endtime?.toString()?.slice(16, 18)) > 12
//                 ? "PM"
//                 : "AM"
//               : ""}
//           </Text>
//         </TouchableOpacity>

//         <View
//           style={{ width: "90%", alignSelf: "center", alignItems: "center" }}
//         >
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: 20,
//               width: "100%",
//               // borderWidth: 1,
//               paddingHorizontal: 10,
//               paddingVertical: 18,
//               borderRadius: 10,
//               borderColor: secondaryClor,
//               elevation: 5,
//               shadowColor: secondaryClor,
//               backgroundColor: "white",
//               marginBottom: 15,
//               gap: 10,
//             }}
//           >
//             <Feather name="user" size={24} color={secondaryClor} />
//             <TextInput placeholder="Enter your name"></TextInput>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               alignItems: "center",
//               marginTop: 5,
//               width: "100%",
//               // borderWidth: 1,
//               paddingHorizontal: 10,
//               paddingVertical: 18,
//               borderRadius: 10,
//               borderColor: secondaryClor,
//               elevation: 5,
//               shadowColor: secondaryClor,
//               backgroundColor: "white",
//               marginBottom: 15,
//               gap: 10,
//             }}
//           >
//             <FontAwesome name="building-o" size={24} color={secondaryClor} />
//             <TextInput placeholder="Select your department"></TextInput>
//           </View>
//           <View
//             style={{
//               flexDirection: "row",
//               marginTop: 5,
//               width: "100%",
//               paddingHorizontal: 10,
//               paddingVertical: 10,
//               borderRadius: 10,
//               borderColor: secondaryClor,
//               elevation: 5,
//               shadowColor: secondaryClor,
//               backgroundColor: "white",
//               marginBottom: 15,
//               gap: 0,
//             }}
//           >
//             <MaterialIcons name="edit-note" size={34} color={secondaryClor} />
//             <TextInput
//               multiline
//               numberOfLines={8}
//               style={{
//                 flex: 1,
//                 textAlignVertical: "top", // Aligns text to the top
//                 padding: 0, // Removes default padding
//                 marginTop: 5,
//               }}
//               placeholder="Write the reason to leave"
//             />
//           </View>
//         </View>
//         <View style={{ flexDirection: "row", gap: 5 }}>
//           <TouchableOpacity
//             style={{
//               backgroundColor: "white",
//               justifyContent: "center",
//               alignItems: "center",
//               height: 45,
//               borderRadius: 10,
//               width: "30%",
//               borderWidth: 1,
//               borderColor: secondaryClor,
//             }}
//             onPress={() => navigation.goBack()}
//           >
//             <Text
//               style={{ color: secondaryClor, fontSize: 17, fontWeight: "500" }}
//             >
//               Cancel
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: secondaryClor,
//               justifyContent: "center",
//               alignItems: "center",
//               height: 45,
//               borderRadius: 10,
//               width: "50%",
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
//               Confirm
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <DateTimePickerModal
//         isVisible={dateOpen}
//         mode="date"
//         minimumDate={new Date()} // Minimum date and time set karne ke liye
//         onConfirm={(date) => setdate(date)}
//         onCancel={() => setdateOpen(false)}
//       />
//       <DateTimePickerModal
//         isVisible={timeOpen}
//         mode="time"
//         minimumDate={new Date()} // Minimum date and time set karne ke liye
//         onConfirm={(time) => settime(time)}
//         onCancel={() => settimeOpen(false)}
//       />
//       <DateTimePickerModal
//         isVisible={endtimeOpen}
//         mode="time"
//         minimumDate={new Date()} // Minimum date and time set karne ke liye
//         onConfirm={(time) => setendtime(time)}
//         onCancel={() => setendtimeOpen(false)}
//       />
//     </ScrollView>
//   );
// };

// export default ApplyPass;

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import {
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dbUrl, formatDate, formatTime, secondaryClor } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSingleRequest } from "../store/slices/userSlice";

const ApplyPass = () => {
  const navigation = useNavigation();
  const [dateOpen, setdateOpen] = useState(false);
  const [timeOpen, settimeOpen] = useState(false);
  const [date, setdate] = useState(null);
  const [time, settime] = useState(null);
  const [endtime, setendtime] = useState(null);
  const [endtimeOpen, setendtimeOpen] = useState(false);
  const [reason, setReason] = useState("");
  const { user, allRequests } = useSelector((state) => state.user);
  const [isRequesting, setisRequesting] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    if (isRequesting) return;

    setisRequesting(true);

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setisRequesting(false);
        return alert("Please login to continue");
      }

      const res = await axios.post(
        dbUrl + "/create-pass",
        {
          date,
          endtime,
          reason,
          time,
        },
        { headers: { Authorization: token } }
      );

      console.log(res.data);
      alert(res?.data?.message);

      setisRequesting(false);

      if (res?.data?.success) {
        dispatch(addSingleRequest(res.data?.gatePass));
        navigation.goBack();
      }
    } catch (error) {
      setisRequesting(false);
      console.log(error.message);
    }
  };

  // const formatDate = (date) => {
  //   const options = { day: "numeric", month: "long", year: "numeric" };
  //   return date.toLocaleDateString("en-US", options); // e.g., "21 January 2024"
  // };

  // const formatTime = (time) => {
  //   const hours = time.getHours();
  //   const minutes = time.getMinutes();
  //   const period = hours >= 12 ? "PM" : "AM";
  //   const formattedHours = hours % 12 || 12;
  //   const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //   return `${formattedHours}:${formattedMinutes} ${period}`; // e.g., "3:30 PM"
  // };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Entypo
        name="cross"
        size={34}
        color={secondaryClor}
        style={{ marginLeft: "auto", padding: 10 }}
        onPress={() => navigation.goBack()}
      />

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <TouchableOpacity
            onPress={() => setdateOpen(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "45%",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: secondaryClor,
              elevation: 5,
              shadowColor: secondaryClor,
              backgroundColor: "white",
              marginBottom: 15,
              gap: 10,
              height: 60,
            }}
          >
            <Fontisto name="date" size={24} color={secondaryClor} />
            <Text>{date ? formatDate(date) : "Select date"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => settimeOpen(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "45%",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: secondaryClor,
              elevation: 5,
              shadowColor: secondaryClor,
              backgroundColor: "white",
              marginBottom: 15,
              gap: 10,
              height: 60,
            }}
          >
            <Ionicons name="time-outline" size={24} color={secondaryClor} />
            <Text>{time ? formatTime(time) : "Select start time"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontWeight: "500", color: secondaryClor }}>
          Return timing
        </Text>
        <TouchableOpacity
          onPress={() => setendtimeOpen(true)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "45%",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderColor: secondaryClor,
            elevation: 5,
            shadowColor: secondaryClor,
            backgroundColor: "white",
            marginBottom: 15,
            gap: 10,
            height: 60,
          }}
        >
          <Ionicons name="time-outline" size={24} color={secondaryClor} />
          <Text>{endtime ? formatTime(endtime) : "Select end time"}</Text>
        </TouchableOpacity>

        <View
          style={{ width: "90%", alignSelf: "center", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 18,
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
            <TextInput
              placeholder="Enter your name"
              value={user?.name}
              readOnly
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 18,
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
              placeholder="Select your department"
              value={user?.department}
              readOnly
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
              width: "100%",
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 10,
              borderColor: secondaryClor,
              elevation: 5,
              shadowColor: secondaryClor,
              backgroundColor: "white",
              marginBottom: 15,
              gap: 0,
            }}
          >
            <MaterialIcons name="edit-note" size={34} color={secondaryClor} />
            <TextInput
              multiline
              numberOfLines={8}
              style={{
                flex: 1,
                textAlignVertical: "top", // Aligns text to the top
                padding: 0, // Removes default padding
                marginTop: 5,
              }}
              placeholder="Write the reason to leave"
              value={reason}
              onChangeText={setReason}
            />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              borderRadius: 10,
              width: "30%",
              borderWidth: 1,
              borderColor: secondaryClor,
            }}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={{ color: secondaryClor, fontSize: 17, fontWeight: "500" }}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: secondaryClor,
              justifyContent: "center",
              alignItems: "center",
              height: 45,
              borderRadius: 10,
              width: "50%",
            }}
            onPress={handleConfirm}
          >
            <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
              {isRequesting ? <ActivityIndicator color={"white"} /> : "Confirm"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <DateTimePickerModal
        isVisible={dateOpen}
        mode="date"
        minimumDate={new Date()} // Minimum date and time set karne ke liye
        onConfirm={(selectedDate) => {
          console.log(selectedDate);
          setdate(selectedDate);
          setdateOpen(false);
        }}
        onCancel={() => setdateOpen(false)}
      />
      <DateTimePickerModal
        isVisible={timeOpen}
        mode="time"
        onConfirm={(selectedTime) => {
          settime(selectedTime);
          settimeOpen(false);
        }}
        onCancel={() => settimeOpen(false)}
      />
      <DateTimePickerModal
        isVisible={endtimeOpen}
        mode="time"
        onConfirm={(selectedTime) => {
          setendtime(selectedTime);
          setendtimeOpen(false);
        }}
        onCancel={() => setendtimeOpen(false)}
      />
    </ScrollView>
  );
};

export default ApplyPass;
