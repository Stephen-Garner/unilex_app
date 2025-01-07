import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { UserContext } from "../UserContext";
import convoProfiles from "../ConvoProfiles";
import studentProfiles from "../StudentProfiles";

const PlayScreen = () => {
  const { currentUser } = useContext(UserContext);

  const fetchUpcomingConversations = (currentUser) => {
    const today = new Date().toISOString().split("T")[0];
    return convoProfiles
      .filter(
        (convo) =>
          convo.confirmed === "yes" &&
          convo.date >= today &&
          (convo.confirmedStudent === currentUser.studentId ||
            (Array.isArray(convo.studentId)
              ? convo.studentId.includes(currentUser.studentId)
              : convo.studentId === currentUser.studentId))
      )
      .map((convo) => {
        const otherStudentId =
          Array.isArray(convo.studentId) && convo.studentId.length > 1
            ? convo.studentId.find((id) => id !== currentUser.studentId)
            : convo.confirmedStudent === currentUser.studentId
            ? convo.studentId
            : convo.confirmedStudent;

        const student = studentProfiles.find(
          (profile) => profile.studentId === otherStudentId
        );

        return {
          ...convo,
          otherStudentId,
          name: student
            ? `${student.firstName} ${student.lastName}`.trim()
            : "Unknown",
          country: student?.country || "Unknown",
        };
      });
  };

  const upcomingConversations = fetchUpcomingConversations(currentUser);

  const nextScheduledConversation = upcomingConversations.sort(
    (a, b) =>
      new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`)
  )[0];

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

  return (
    <View style={styles.container}>
      {/* Scheduled Conversation */}
      <Text style={styles.sectionTitle}>Scheduled Conversation</Text>
      {nextScheduledConversation ? (
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.cardTitle}>
                {nextScheduledConversation.name}
              </Text>
              <Text style={styles.cardSubtitle}>
                {`${nextScheduledConversation.date} ${nextScheduledConversation.time}`}
              </Text>
            </View>
            <Text style={styles.cardCountry}>
              {nextScheduledConversation.country}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.actionButtonText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
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
      {upcomingConversations.length > 0 ? (
        <FlatList
          data={upcomingConversations}
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
  cancelButton: {
    flex: 1,
    backgroundColor: "#f00000",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButton: {
    flex: 1,
    backgroundColor: "#1fe300",
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  messageButton: {
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
