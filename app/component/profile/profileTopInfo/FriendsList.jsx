import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import friendsIcon from "../../../../assets/images/friends.png"
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@/src/theme/themeContext';

const FriendsList = ({ setFriendListModalVisible, friendListModalVisible, loggedUser }) => {
  const [searchText, setSearchText] = useState('');
  const friendsList = loggedUser.profileInfo.friendsList;
  const { theme } = useTheme(); // Get current theme and toggle (if needed)
  const styles = getStyles(theme); // Generate dynamic styles based on current theme
  // Filtered friends based on search input
  const filteredFriends = friendsList.filter(friend => 
    friend.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
    friend.lastName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity onPress={() => setFriendListModalVisible(true)} style={styles.sportLabel}>
        <Image source={friendsIcon} />
      </TouchableOpacity>

      <Modal 
        visible={friendListModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFriendListModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.topcontainer}>
              <TouchableOpacity onPress={() => setFriendListModalVisible(false)} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color={theme.colors.text} />
              </TouchableOpacity>
              <Text style={styles.title}>
                {filteredFriends.length} friend{filteredFriends.length !== 1 ? 's' : ''}
              </Text>
            </View>

            <View style={styles.searchcontainer}>
              <Icon name="search" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#888"
                value={searchText}
                onChangeText={setSearchText} // Updates search text in state
              />
            </View>

            <View>
              {filteredFriends.length != 0 ? filteredFriends.map(friend => (
                <View 
                  key={friend.firstName + friend.lastName} // Use unique key
                  style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}
                >
                  <View style={{ flexDirection: 'row', gap: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 44, height: 44, borderRadius: 1000 }} source={friend.profilePicture} />
                    <Text style={{color:theme.colors.text}}>{friend.firstName + ' ' + friend.lastName}</Text>
                  </View>
                  <TouchableOpacity>
                    <Text style={{ color:theme.colors.text}}>Remove friend</Text>
                  </TouchableOpacity>
                </View>
              )) : <View style={{alignItems:'center', marginTop:20}}><Text style={{ color:theme.colors.text}}>No results for <Text style={{fontWeight:'bold',color:theme.colors.text}}>'{searchText}'</Text></Text></View>}
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FriendsList;



const getStyles = (theme) => StyleSheet.create({
  sportLabel: {
    marginRight: theme.spacing.small,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "100%",
    backgroundColor: theme.colors.background,
    padding: theme.spacing.medium,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontSize: theme.fonts.size.large,
    fontWeight: 'bold',
    color:theme.colors.text
  },
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: theme.radius.semiCircle,
    paddingInline:theme.spacing.medium,
    marginTop: theme.spacing.medium,
    width:'100%',
    height:45
  },
  icon: {
    marginRight: theme.spacing.small,
  },
  input: {
    width:'100%',
    height: 40,
    fontSize: theme.fonts.size.medium,
  },
})