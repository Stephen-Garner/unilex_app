import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import convoProfiles from "../ConvoProfiles";
import studentProfiles from "../StudentProfiles";

const ExpandedListPage = ({ route }) => {
  const { title } = route.params;

  const mergeConversationData = (conversations) => {
    return conversations.map((convo) => {
      const student = studentProfiles.find(
        (profile) => profile.studentId === convo.studentId
      );
      return {
        ...convo,
        name: `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim(),
        country: student?.country || "Unknown",
      };
    });
  };

  const data = {
    Announcements: [
      { id: "1", title: "New Prompts Available", date: "1/7/2025", description: "Check out the new prompts for SPAN 105." },
      { id: "2", title: "Class Schedule", date: "1/5/2025", description: "Class is moved to 10:00 am this week." },
    ],
    "Upcoming Conversations": mergeConversationData(
      convoProfiles.filter(
        (convo) => convo.confirmed === "yes" && convo.date >= new Date().toISOString().split("T")[0]
      )
    ),
    "Past Conversations": mergeConversationData(
      convoProfiles.filter(
        (convo) => convo.confirmed === "yes" && convo.date < new Date().toISOString().split("T")[0]
      )
    ),
  };

  const listData = data[title] || [];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View>
          <Text style={styles.title}>{item.name || item.title}</Text>
          <Text style={styles.subtitle}>{`${item.date || ""} ${item.time || ""}`.trim()}</Text>
          {item.description && <Text style={styles.description}>{item.description}</Text>}
        </View>
        {item.country && <Text style={styles.cardCountry}>{item.country}</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.convoId || item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#777",
  },
  cardCountry: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default ExpandedListPage;
