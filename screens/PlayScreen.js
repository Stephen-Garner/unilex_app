import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { ConversationContext } from "../ConvoContext"; // Access the ConversationContext
import { UserContext } from "../UserContext"; // Access the current user's details
import studentProfiles from "../StudentProfiles"; // Import studentProfiles

const PlayScreen = () => {
  const { upcomingConversations } = useContext(ConversationContext); // Get upcoming conversations
  const { currentUser } = useContext(UserContext); // Get the current user

  // Enrich upcoming conversations with student details
  const enrichedConversations = upcomingConversations.map((convo) => {
    const student = studentProfiles.find((profile) =>
      convo.studentId.includes(profile.studentId)
    );
    return {
      ...convo,
      name: `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim(),
      country: student?.country || "Unknown",
    };
  });

  const renderConversation = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardSubtitle}>{`${item.date} ${item.time}`}</Text>
        </View>
        <Text style={styles.cardCountry}>{item.country}</Text>
      </View>
    </View>
  );

  // Filter the scheduled conversation for the current user
  const scheduledConversation = enrichedConversations.find(
    (convo) =>
      convo.confirmed === "yes" &&
      convo.studentId === currentUser.studentId &&
      convo.date >= new Date().toISOString().split("T")[0]
  );

  return (
    <View style={styles.container}>
      {/* Scheduled Conversation */}
      <Text style={styles.sectionTitle}>Scheduled Conversation</Text>
      {scheduledConversation ? (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>{scheduledConversation.name}</Text>
              <Text style={styles.cardSubtitle}>
                {`${scheduledConversation.date} ${scheduledConversation.time}`}
              </Text>
            </View>
            <Text style={styles.cardCountry}>{scheduledConversation.country}</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text style={styles.noConversationsText}>
          No scheduled conversations.
        </Text>
      )}

      {/* Upcoming Conversations */}
      <Text style={styles.sectionTitle}>Upcoming Conversations</Text>
      {enrichedConversations.length > 0 ? (
        <FlatList
          data={enrichedConversations}
          keyExtractor={(item) => item.convoId}
          renderItem={renderConversation}
        />
      ) : (
        <Text style={styles.noConversationsText}>
          No upcoming conversations.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  cardCountry: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
  },
  actionButtons: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#00BEFF",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  noConversationsText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default PlayScreen;
