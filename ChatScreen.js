import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the '+' icon at the top

const ChatScreen = () => {
  // Mock data for chat list
  const chats = [
    { id: "1", name: "Mateo Maas", message: "Che, ¿cuándo nos vamos a juntar?", time: "10:00 am" },
    { id: "2", name: "Edgar Gonzalez", message: "¿Cómo estás amigo?", time: "1/9/2025" },
    { id: "3", name: "Paul Velandia", message: "¡Muchas gracias por eso! Me ayuda mucho.", time: "1/11/2025" },
  ];

  // Render each chat item
  const renderChatItem = ({ item }) => (
    <View style={styles.chatItem}>
      <View style={styles.chatTextContainer}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatMessage}>{item.message}</Text>
      </View>
      <Text style={styles.chatTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#00BEFF" />
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
    borderRadius: 16,
  },
  chatList: {
    paddingBottom: 16,
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatTextContainer: {
    flex: 1,
    marginRight: 8,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: "#555",
  },
  chatTime: {
    fontSize: 12,
    color: "#999",
  },
});

export default ChatScreen;
