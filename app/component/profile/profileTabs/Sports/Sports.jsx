import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AddSport from '../Sports/AddSport';
import { useState } from 'react';
import EditSports from './EditSports';

const sportImages = {
  Football: require('../../../../../assets/images/football.png'),
  Basketball: require('../../../../../assets/images/basketball.png'),
  Tennis: require('../../../../../assets/images/tennis.png'),
  TableTennis: require('../../../../../assets/images/tabletennis.png'),
  Bowling: require('../../../../../assets/images/bowling.png'),
};

const Sports = ({ loggedUser }) => {
  const [sport, setSport] = useState({sport:'',level:''});
  const [userInfo, setUserInfo] = useState(loggedUser);
  const [openEditSport, setOpenEditSport] = useState(false)
  return (
    <View style={{alignItems:'center',gap:20}}>
      <View style={styles.container}>
      <TouchableOpacity  onPress={() => {
            setSport({sport:loggedUser.profileInfo.sport,level:loggedUser.profileInfo.level})
            setOpenEditSport(true) 
          }} style={styles.card}>
        <Image style={styles.cardImage} source={sportImages[loggedUser.profileInfo.sport]}/>
        <View style={styles.cardOverlay}>
              <Text style={styles.sportText}>{loggedUser.profileInfo.sport}</Text>
              <Text style={styles.levelText}>{loggedUser.profileInfo.level}</Text>
        </View>
      </TouchableOpacity>
      {userInfo.profileInfo.sportsList.map(sport => {
        return(
          <TouchableOpacity onPress={() => {
            setSport(sport)
            setOpenEditSport(true) 
          }}  key={sport.sport} style={styles.card} >
              <Image
                source={sportImages[sport.sport] || sportImages.Default}
                style={styles.cardImage}
              />
              <View style={styles.cardOverlay}>
                <Text style={styles.sportText}>{sport.sport}</Text>
                <Text style={styles.levelText}>{sport.level}</Text>
              </View>
              
          </TouchableOpacity>
        )
      })}
      
      </View>
      <EditSports sport={sport} openEditSport={openEditSport} setOpenEditSport={setOpenEditSport} setUserInfo={setUserInfo} userInfo={userInfo}/>
      <AddSport loggedUser={loggedUser} setUserInfo={setUserInfo} userInfo={userInfo}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    gap:10
  },
  card: {
    width: '44%',
    aspectRatio: 1.2,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  sportText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  levelText: {
    fontSize: 14,
    color: 'white',
  },
});

export default Sports;
