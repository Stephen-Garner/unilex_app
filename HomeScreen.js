import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import convoProfiles from "../ConvoProfiles";
import studentProfiles from "../StudentProfiles";
import { UserContext } from "../UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext); // Fetch current user from UserContext

  const handleNavigate = (title) => {
    navigation.navigate("ExpandedList", { title });
  };

  // Merge convoProfiles and studentProfiles
  const mergedConversations = convoProfiles
    .filter(
      (convo) =>
        convo.confirmed === "yes" &&
        (convo.studentId === currentUser.studentId || convo.confirmedStudent === currentUser.studentId)
    ) // Filter only confirmed conversations involving the current user
    .map((convo) => {
      const student =
        studentProfiles.find((profile) => profile.studentId === convo.studentId) ||
        studentProfiles.find((profile) => profile.studentId === convo.confirmedStudent);
      return {
        ...convo,
        name: `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim(),
        country: student?.country || "Unknown",
      };
    });

  const renderConversationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
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
      {/* Announcements Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <TouchableOpacity onPress={() => handleNavigate("Announcements")}>
            <Image
              source={require("../assets/icons/list-inactive.png")}
              style={[styles.icon, { marginLeft: -32 }]}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>New Conversation Prompts</Text>
          <Text style={styles.cardSubtitle}>Good morning class, I just wanted to let you...</Text>
        </View>
      </View>

      {/* Upcoming Conversations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Conversations</Text>
          <TouchableOpacity onPress={() => handleNavigate("Upcoming Conversations")}>
            <Image
              source={require("../assets/icons/list-inactive.png")}
              style={[styles.icon, { marginLeft: -32 }]}
            />
          </TouchableOpacity>
        </View>
        {mergedConversations.filter((item) => item.date >= "2025-01-07").length === 0 ? (
          <Text style={styles.noConversationsText}>No upcoming conversations.</Text>
        ) : (
          <FlatList
            data={mergedConversations
              .filter((item) => item.date >= "2025-01-07")
              .slice(0, 3)} // Show only the first 3 upcoming conversations
            keyExtractor={(item) => item.convoId}
            renderItem={renderConversationItem}
          />
        )}
      </View>

      {/* Past Conversations Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Past Conversations</Text>
          <TouchableOpacity onPress={() => handleNavigate("Past Conversations")}>
            <Image
              source={require("../assets/icons/list-inactive.png")}
              style={[styles.icon, { marginLeft: -32 }]}
            />
          </TouchableOpacity>
        </View>
        {mergedConversations.filter((item) => item.date < "2025-01-07").length === 0 ? (
          <Text style={styles.noConversationsText}>No past conversations.</Text>
        ) : (
          <FlatList
            data={mergedConversations
              .filter((item) => item.date < "2025-01-07")
              .slice(0, 3)} // Show only the first 3 past conversations
            keyExtractor={(item) => item.convoId}
            renderItem={renderConversationItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
    color: "#555",
    fontWeight: "bold",
    textAlign: "right",
  },
  icon: {
    width: 24,
    height: 24,
  },
  noConversationsText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
  },
});

export default HomeScreen;
