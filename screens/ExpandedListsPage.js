import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import convoProfiles from "../ConvoProfiles";
import studentProfiles from "../StudentProfiles";
import { UserContext } from "../UserContext";

const ExpandedListPage = ({ route }) => {
  const { currentUser } = useContext(UserContext);
  const { title } = route.params;

  const mergeConversationData = (conversations) => {
    return conversations.map((convo) => {
      const otherStudentId = Array.isArray(convo.studentId)
        ? convo.studentId.find((id) => id !== currentUser.studentId)
        : convo.studentId !== currentUser.studentId
        ? convo.studentId
        : null;

      const student = studentProfiles.find(
        (profile) => profile.studentId === otherStudentId
      );

      return {
        ...convo,
        name: student
          ? `${student.firstName} ${student.lastName}`.trim()
          : "Unknown",
        country: student?.country || "Unknown",
      };
    }).filter((convo) => convo.name !== "Unknown"); // Exclude invalid meetings
  };

  const data = {
    Announcements: [
      { id: "1", title: "New Prompts Available", date: "1/7/2025", description: "Check out the new prompts for SPAN 105." },
      { id: "2", title: "Class Schedule", date: "1/5/2025", description: "Class is moved to 10:00 am this week." },
    ],
    "Upcoming Conversations": mergeConversationData(
      convoProfiles.filter(
        (convo) =>
          convo.confirmed === "yes" &&
          convo.date >= new Date().toISOString().split("T")[0] &&
          convo.studentId.includes(currentUser.studentId) // Include current user meetings
      )
    ),
    "Past Conversations": mergeConversationData(
      convoProfiles.filter(
        (convo) =>
          convo.confirmed === "yes" &&
          convo.date < new Date().toISOString().split("T")[0] &&
          convo.studentId.includes(currentUser.studentId) // Include past current user meetings
      )
    ),
  };

  const listData = data[title] || [];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.title}>{item.name || item.title}</Text>
        <Text style={styles.subtitle}>{item.date || ""}</Text>
      </View>
      {item.description && <Text style={styles.description}>{item.description}</Text>}
      {item.country && <Text style={styles.cardCountry}>{item.country}</Text>}
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
    marginBottom: 4, // Adjusted spacing for title and date
  },
  title: {
    fontSize: 16,
    fontWeight: "bold", 
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4, // Space between description and title/date row
  },
  cardCountry: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 8, // Space between country and other content
  },
});

export default ExpandedListPage;
