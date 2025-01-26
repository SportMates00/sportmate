import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import favicon from '@/assets/images/favicon.png';
import ProgressBar from 'react-native-progress/Bar';
const ProfileTopInfo = ({loggedUser}) => {
  return (
    <View>
        <View style={styles.profilePictureSection}>
        <Image
            source={favicon} // Replace with your default profile picture path
            style={styles.profilePicture}
        />
        <View style={styles.profileRight}>
            <Text>{loggedUser.firstName} {loggedUser.lastName}</Text>
            <View style={styles.frndRev}>
                <Text>{loggedUser.profileInfo.level}</Text>
                <Text>{loggedUser.profileInfo.sport}</Text>
            </View>
        </View>
    </View>    
    <View style={styles.progressBar}>
        <ProgressBar
          progress={80 / 100}
          width={null}
          height={10}
          color="red"
          unfilledColor="blue"
        />
      </View>
    </View>    
)
}

const styles = StyleSheet.create({
    profilePictureSection: {
        display:'flex',
        flexDirection:'row',
        gap:'20',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical: 20,
      },
    profilePictureContainer: {
        position: 'relative',
        width: 100,
        height: 100,
      },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ccc',
      },
    frndRev: {
    display:'flex',
    flexDirection:'row',
    gap:'20'
    }
      ,
      progressBar: {
            marginTop: 30,
            paddingHorizontal: 30,
        }

})

export default ProfileTopInfo