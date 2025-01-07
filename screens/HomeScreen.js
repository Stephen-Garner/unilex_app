import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../UserContext";
import convoProfiles from "../ConvoProfiles";
import studentProfiles from "../StudentProfiles";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { currentUser = {} } = useContext(UserContext); // Default fallback for currentUser

  // Dynamic prompts data
  const prompts = [
    { id: "1", text: "¿Cómo es tu família?", translation: "(What is your family like?)" },
    { id: "2", text: "¿De dónde son ustedes?", translation: "(Where are you guys from?)" },
    { id: "3", text: "¿Qué te gusta hacer en tu tiempo libre?", translation: "(What do you like to do in your free time?)" },
  ];

  const today = new Date().toISOString().split("T")[0];

  // Helper function to enrich conversations with student details
  const enrichConversations = (conversations) => {
    return conversations.map((convo) => {
      const studentId = Array.isArray(convo.studentId) ? convo.studentId[0] : convo.studentId;
      const student = studentProfiles.find(
        (profile) => profile.studentId === studentId
      );
      return {
        ...convo,
        name: `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim(),
        country: student?.country || "Unknown",
      };
    });
  };

  // Get Upcoming and Past Conversations
  const upcomingConversations = enrichConversations(
    convoProfiles.filter((convo) => convo.confirmed === "yes" && convo.date >= today)
  ).slice(0, 3);

  const pastConversations = enrichConversations(
    convoProfiles.filter((convo) => convo.confirmed === "yes" && convo.date < today)
  ).slice(0, 3);

  // Announcements
  const announcements = [
    { id: "1", title: "New Prompts Available", date: "1/7/2025", description: "Check out the new prompts for SPAN 105." },
    { id: "2", title: "Class Schedule", date: "1/5/2025", description: "Class is moved to 10:00 am this week." },
  ];
  const latestAnnouncement = announcements.sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  const handleNavigate = (title) => {
    navigation.navigate("ExpandedList", { title });
  };

  const renderConversationItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardSubtitle}>{item.date || ""}</Text>
      </View>
      <View>
        {item.time && <Text style={styles.cardTime}>{item.time}</Text>}
        {item.country && <Text style={styles.cardCountry}>{item.country}</Text>}
      </View>
    </View>
  );

  const renderPrompts = () => (
    <>
      <Text style={styles.promptTitle}>Current Speaking Topics</Text>
      {prompts.map((prompt) => (
        <View key={prompt.id} style={[styles.section, styles.promptBox]}>
          <View style={styles.promptList}>
            <View style={styles.promptItemContainer}>
              <Text style={styles.promptText}>{prompt.text}</Text>
              <Text style={styles.translationText}>{prompt.translation}</Text>
            </View>
          </View>
        </View>
      ))}
      <Text style={styles.promptUpdatedText}>Prompts updated: 1/6/2025</Text>
    </>
  );

  const renderAnnouncements = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <TouchableOpacity onPress={() => handleNavigate("Announcements")}>
          <Image
            source={require("../assets/icons/list-inactive.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {latestAnnouncement && (
        <View style={styles.announcementCard}>
          <View style={styles.cardRow}>
            <Text style={[styles.cardTitle, styles.announcementCardText]}>
              {latestAnnouncement.title}
            </Text>
            <Text style={[styles.cardSubtitle, styles.announcementCardText, styles.announcementCardDate]}>
              {latestAnnouncement.date}
            </Text>
          </View>
          <Text style={[styles.description, styles.announcementCardText]}>
            {latestAnnouncement.description}
          </Text>
        </View>
      )}
    </View>
  );

  const dataList = [
    { id: "prompts", component: renderPrompts() },
    {
      id: "announcement",
      component: renderAnnouncements(),
    },
    {
      id: "upcoming",
      component: (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Conversations</Text>
            <TouchableOpacity onPress={() => handleNavigate("Upcoming Conversations")}>
              <Image
                source={require("../assets/icons/list-inactive.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={upcomingConversations}
            keyExtractor={(item) => item.convoId || item.id}
            renderItem={renderConversationItem}
            ListEmptyComponent={<Text style={styles.noConversationsText}>No upcoming conversations.</Text>}
          />
        </View>
      ),
    },
    {
      id: "past",
      component: (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Past Conversations</Text>
            <TouchableOpacity onPress={() => handleNavigate("Past Conversations")}>
              <Image
                source={require("../assets/icons/list-inactive.png")}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={pastConversations}
            keyExtractor={(item) => item.convoId || item.id}
            renderItem={renderConversationItem}
            ListEmptyComponent={<Text style={styles.noConversationsText}>No past conversations.</Text>}
          />
        </View>
      ),
    },
  ];

  return (
    <FlatList
      data={dataList}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <View>{item.component}</View>}
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
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
  announcementCard: {
    backgroundColor: "#ff820c",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  announcementCardText: {
    color: "#fff",
  },
  announcementCardDate: {
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4, // Adjusted for consistent layout
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  cardCountry: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
    textAlign: "right",
    marginTop: 4,
  },
  cardTime: {
    fontSize: 14,
    color: "#555",
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
  promptBox: {
    backgroundColor: "#00BEFF",
    padding: 12,
    paddingBottom: 2,
    paddingTop: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  promptTitle: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
    color: "black",
  },
  promptList: {
    marginLeft: 0,
  },
  promptItemContainer: {
    marginBottom: 8,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  translationText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#fff",
    marginTop: 4,
    fontStyle: "italic",
  },
  promptUpdatedText: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});

export default HomeScreen;
