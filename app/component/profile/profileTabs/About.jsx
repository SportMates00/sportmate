import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvailabilityTable from '../Availibility'
const About = ({loggedUser}) => {

  const [rating, setRating] = useState(0);
  useEffect(() => {
    const level = loggedUser.profileInfo.level
    if(level === 'Beginner'){
      setRating('⭐')
    } else if (level === 'Intermediate'){
      setRating('    ⭐   ⭐   ⭐')
    }else if(level === 'Professional') {
      setRating('⭐ ⭐ ⭐ ⭐ ⭐')
    }

  },[])
  return (

    <View>
      <View style={styles.row}>
        {/* Age Column */}
        <View style={styles.column}>
          <Text style={styles.title}>Age</Text>
          <Text style={styles.value}>{loggedUser.profileInfo.age !== '' ? loggedUser.profileInfo.age : '-'}</Text> {/* Replace '25' with dynamic age */}
        </View>

        <View style={styles.column}>
          <Text style={styles.title}>Location</Text>
          <Text style={styles.value}>{loggedUser.profileInfo.location !== '' ? loggedUser.profileInfo.location : '-'}</Text> {/* Replace '25' with dynamic age */}
        </View>

        {/* Gender Column */}
        <View style={styles.column}>
          <Text style={styles.title}>Gender</Text>
          <Text style={styles.value}>{loggedUser.profileInfo.gender !== '' ? loggedUser.profileInfo.gender : '-'}</Text> {/* Replace 'Male' with dynamic gender */}
        </View>
      </View>
      {/* Sport Column*/}
      <View style={{paddingTop:30, paddingBottom:30}}>
        <Text style={{fontWeight:'bold',fontSize:18}}>Sport</Text>
        <View style={{paddingTop:20,flexDirection:'row', alignItems:'center',alignContent:'center'}}>
          <Text>{loggedUser.profileInfo.sport} : </Text>
          <Text>{rating}</Text>
        </View>
      </View>
      <View style={{marginBottom:20,gap:20}}>
        <Text style={{fontWeight:'bold',fontSize:16}}>About me</Text>
        <Text>{loggedUser.profileInfo.aboutMe !== '' ? loggedUser.profileInfo.aboutMe : 'Nothing is written...'}</Text>
      </View>
      <AvailabilityTable />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 0,
    borderBottomWidth:1,
    borderBottomColor:'silver',
    paddingTop:20,
    paddingBottom:20,
  },
  column: {
    alignItems: 'center',
    gap:5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  value: {
    fontSize: 14,
  },
});

export default About