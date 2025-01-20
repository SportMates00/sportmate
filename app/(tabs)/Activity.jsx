import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Activity = () => {
   return (
     <View style={styles.container}>
       <Text style={styles.text}>Welcome to the Activities</Text>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
   },
   text: {
     fontSize: 24,
     fontWeight: 'bold',
   },
 });
export default Activity