import { View, Text, KeyboardAvoidingView, Platform, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dbUrl, formatDate, secondaryClor } from '../utils'
import {formatTime} from '../utils'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler'

const AllRequestForKeeper = () => {
    const {allRequests}=useSelector(state=>state.user)
    const [allRequest, setallRequest] = useState([])



    const getAllRequests = async () => {
        try {
          const token = await AsyncStorage.getItem("token");
  
          if (!token) {
            return;
          }
  
          const res = await axios.get(dbUrl + "/allRequestForKeeper", {
            headers: { Authorization: token },
          });
  
          console.log(res?.data?.requests?.length);
          if (res.data?.success) {
            setallRequest(res?.data?.requests)
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      useEffect(()=>{
        getAllRequests()
    },[allRequests])


    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{flexGrow:1,paddingBottom:90}}>
            <View style={{ flex: 1, position: "relative" }}>
                <StatusBar backgroundColor={secondaryClor} />

                <View
                    style={{
                        height: "30%",
                        backgroundColor: secondaryClor,
                        borderBottomRightRadius: 20,
                        borderBottomLeftRadius: 20,
                    }}
                >
                    <Text style={{ color: 'white', padding: 10, fontSize: 23, fontWeight: '700' }}>All Approved Requests</Text>
                  {allRequest?.map((req,i)=>{
                    return (
                        <Card request={req} key={i}></Card>
                    )
                  })}
                </View>


            </View>
            </ScrollView>
        </View>
    )
}

export default AllRequestForKeeper

const Card = () => {
    return (
        <View style={{ width: '93%', alignSelf: 'center', backgroundColor: 'white',gap:3 ,padding:5,borderRadius:10,elevation:5,shadowColor:'black',marginTop:20}}>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize:18,fontWeight:'600'}}>Name:{" "}</Text>
            <Text style={{fontSize:17,fontWeight:'500' ,color:'gray'}}>Shivam</Text>
         </View>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize:18,fontWeight:'600'}}>Department:{" "}</Text>
            <Text style={{fontSize:17,fontWeight:'500' ,color:'gray'}}>It / Block D</Text>
         </View>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize:18,fontWeight:'600'}}>Exit time:{" "}</Text>
            <Text style={{fontSize:17,fontWeight:'500' ,color:'gray'}}>{formatTime(Date.now())}</Text>
         </View>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize:18,fontWeight:'600'}}>Return time:{" "}</Text>
            <Text style={{fontSize:17,fontWeight:'500' ,color:'gray'}}>{formatTime(Date.now())}</Text>
         </View>
         <View style={{flexDirection:'row',}}>
            <Text style={{fontSize:18,fontWeight:'600'}}>Date:{" "}</Text>
            <Text style={{fontSize:17,fontWeight:'500' ,color:'gray'}}>{formatDate(Date.now())}</Text>
         </View>
        </View>
    )
}