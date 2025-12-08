import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvailabilityTable from '../AvailibilityTable'
import { useTheme } from '@/src/theme/themeContext';
const About = ({loggedUser}) => {

  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
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

    <View style={{backgroundColor:theme.colors.background, width:'100%'}}>
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
      <View style={styles.sport}>
        <Text style={styles.sportText}>Sport</Text>
        <View style={styles.sportInfo}>
          <Text style={styles.sportInfoText}>{loggedUser.profileInfo.sport.sport} : </Text>
          <Text>{rating}</Text>
        </View>
      </View>
      <View style={styles.sport}>
        <Text style={[styles.sportText,{paddingBottom:20}]}>About me</Text>
        <Text style={styles.sportInfoText}>{loggedUser.profileInfo.aboutMe !== '' ? loggedUser.profileInfo.aboutMe : 'Nothing is written...'}</Text>
      </View>
      <AvailabilityTable loggedUser={loggedUser}/>
    </View>
  )
}

const getStyles = (theme) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 0,
    borderBottomWidth:1,
    borderBottomColor:'silver',
    paddingTop:theme.spacing.medium,
    paddingBottom:theme.spacing.medium,
  },
  column: {
    alignItems: 'center',
    gap:5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.fonts.size.medium,
    color:theme.colors.text
  },
  value: {
    color:theme.colors.text,
    fontSize: theme.fonts.size.medium,
  },
  sport: {paddingTop:theme.spacing.medium, paddingBottom:theme.spacing.medium},
  sportText: {fontWeight:'bold',fontSize:theme.fonts.size.large, color:theme.colors.text},
  sportInfo: {paddingTop:20,flexDirection:'row', alignItems:'center',alignContent:'center'},
  sportInfoText: {color:theme.colors.text}
});

export default About