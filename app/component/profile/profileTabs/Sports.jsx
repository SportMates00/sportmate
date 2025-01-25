import { View, Text, FlatList, StyleSheet } from 'react-native';
import AddSport from './AddSport';

const Sports = ({loggedUser}) => {

  return (
    <View style={styles.container}>
      {/* List of Sports */}
      {<View style={{gap:20,flexDirection:'row', marginBottom:20,justifyContent:'left'}}>
            <Text>{loggedUser.profileInfo.sport}</Text>
            <Text>{loggedUser.profileInfo.level}</Text>
          </View>}
      {loggedUser.profileInfo.sportsList.map(val => {
        return(
          <View key={val.sport} style={{gap:20,flexDirection:'row', marginBottom:20,justifyContent:'left'}}>
            <Text>{val.sport}</Text>
            <Text>{val.level}</Text>
          </View>
        )
      })}

      {/* Add New Sport Button */}
      <AddSport />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{marginTop:40, flex:1},
  sportItem: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sportText: {
    fontSize: 18,
  },
  levelText: {
    fontSize: 16,
    color: '#777',
  }
});


export default Sports;
