import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App =()=>{
  const [number,setNumber]=useState(null)
  let a=6
  return(
    <View>
      <Text style={{padding:20}} onPress={()=>a=9}>{a}</Text>
    </View>
  )
}

export default App
