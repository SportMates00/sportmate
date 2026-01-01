import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/src/theme/themeContext';
import { useTranslation } from 'react-i18next';

const ChatScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const { t } = useTranslation();

  const { name, profilePic } = route.params;

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey! Ready for the match?', sender: 'them' },
    { id: 2, text: 'Of course! Let’s win it 🔥', sender: 'me' },
    { id: 3, text: 'Meet me 15 mins early?', sender: 'them' },
  ]);

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'me',
    };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      {/* Messages */}
      <ScrollView contentContainerStyle={styles.chatArea}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.sender === 'me' ? styles.outgoing : styles.incoming,
            ]}
          >
            <Text style={styles.messageText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <View style={styles.inputArea}>
          <TextInput
            placeholder={t('ChatInputPlaceholder')}
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profilePic: {
    width: 35,
    height: 35,
    borderRadius: 999,
    marginLeft: 10,
  },
  chatArea: {
    padding: 10,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 16,
    marginBottom: 10,
  },
  incoming: {
    backgroundColor: '#e1e1e1',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  outgoing: {
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
  },
  messageText: {
    color: '#000',
  },
  inputArea: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
    padding: 10,
  },
});

export default ChatScreen;
