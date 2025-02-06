import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, TextInput } from 'react-native'
import React from 'react'
import friendsIcon from "../../../../assets/images/friends.png"
import Icon from 'react-native-vector-icons/Ionicons';

const FriendsList = ({setFriendListModalVisible,friendListModalVisible,loggedUser}) => {
  let length = loggedUser.profileInfo.friendsList.length;
  return (
    <View>
      <TouchableOpacity onPress={() => setFriendListModalVisible(true)} style={styles.sportLabel}><Image source={friendsIcon}/></TouchableOpacity>
      <Modal 
      visible={friendListModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setFriendListModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.topcontainer}>
              <TouchableOpacity onPress={() => setFriendListModalVisible(false)} style={styles.backButton}>
                <Icon name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.title}>{length } friend{length > 1 && 's'}</Text>
            </View>
            <View style={styles.searchcontainer}>
              <Icon name="search" size={20} color="#888" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#888"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default FriendsList


const styles = StyleSheet.create({
  sportLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    paddingInline:10,
    marginTop: 10,
    width:'100%',
    height:45
  },
  icon: {
    marginRight: 8,
  },
  input: {
    width:'100%',
    height: 40,
    fontSize: 16,
    color: '#333',
  },
})