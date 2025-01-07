import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For the '+' icon at the top

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState("UNILEX"); // State to track active tab

  // Mock data for chat list
  const chats = [
    { id: "1", name: "Mateo Maas", message: "Che, ¿cuándo nos vamos a juntar?", time: "10:00 am" },
    { id: "2", name: "Edgar Gonzalez", message: "¿Cómo estás amigo?", time: "1/9/2025" },
    { id: "3", name: "Paul Velandia", message: "¡Muchas gracias por eso! Me ayuda mucho.", time: "1/11/2025" },
  ];

  const professorChat = [
    { id: "1", name: "Professor Smith", message: "Don't forget about the assignment due tomorrow!", time: "1/6/2025" },
  ];

  const studentInstructorChats = [
    { id: "1", name: "Anna Taylor (TA)", message: "Let me know if you need help with the project!", time: "1/5/2025" },
  ];

  const studentChats = [
    { id: "1", name: "Carlos Martinez", message: "Hey, want to study together?", time: "1/7/2025" },
    { id: "2", name: "Maria Lopez", message: "What did you think of the lecture?", time: "1/6/2025" },
  ];

  // Render each chat item
  const renderChatItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{item.message}</Text>
        </View>
        <Text style={styles.cardTime}>{item.time}</Text>
      </View>
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

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "UNILEX" && styles.activeTab]}
          onPress={() => setActiveTab("UNILEX")}
        >
          <Text style={[styles.tabText, activeTab === "UNILEX" && styles.activeTabText]}>UNILEX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Class" && styles.activeTab]}
          onPress={() => setActiveTab("Class")}
        >
          <Text style={[styles.tabText, activeTab === "Class" && styles.activeTabText]}>Class</Text>
        </TouchableOpacity>
      </View>

      {/* Chat Content Based on Active Tab */}
      {activeTab === "UNILEX" ? (
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={renderChatItem}
          contentContainerStyle={styles.chatList}
        />
      ) : (
        <View>
          {/* Professor Chat Section */}
          <Text style={styles.sectionTitle}>Professor Chat</Text>
          <FlatList
            data={professorChat}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={styles.chatList}
          />

          {/* Student Instructors / TAs Section */}
          <Text style={styles.sectionTitle}>Student Instructors / TAs</Text>
          <FlatList
            data={studentInstructorChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={styles.chatList}
          />

          {/* Student Chat Section */}
          <Text style={styles.sectionTitle}>Student Chat</Text>
          <FlatList
            data={studentChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={styles.chatList}
          />
        </View>
      )}
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
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
    borderRadius: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
  },
  activeTab: {
    borderBottomColor: "#00BEFF",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "#00BEFF",
    fontWeight: "bold",
  },
  chatList: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8, // Spacing between cards
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 12, // Add spacing to prevent overlap with time
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  cardTime: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 4, // Align with text vertically
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#333",
  },
});

export default ChatScreen;
