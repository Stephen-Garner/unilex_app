import React, { useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ConversationContext } from "../ConvoContext";
import { UserContext } from "../UserContext";
import profiles from "../StudentProfiles";
import convoProfilesData from "../ConvoProfiles";

const CalendarScreen = () => {
  const { addConversation } = useContext(ConversationContext);
  const { currentUser } = useContext(UserContext);

  const [convoProfiles, setConvoProfiles] = useState(convoProfilesData);
  const [selectedDate, setSelectedDate] = useState("2025-01-07");
  const [newAvailability, setNewAvailability] = useState(new Date());
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const mergedData = convoProfiles
    .map((convo) => {
      const participants = convo.studentId.map((id) =>
        profiles.find((profile) => profile.studentId === id)
      );

      if (!participants.every((p) => p)) return null;

      return {
        convoId: convo.convoId,
        participants,
        date: convo.date,
        time: convo.time,
        isUser: convo.studentId.includes(currentUser.studentId),
      };
    })
    .filter((convo) => convo !== null);

  const markedDates = convoProfiles.reduce((acc, curr) => {
    const isUser = curr.studentId.includes(currentUser.studentId);

    // Initialize the date entry if it doesn't exist
    if (!acc[curr.date]) {
      acc[curr.date] = { dots: [] };
    }

    // Add a single blue dot for the user's schedule
    if (isUser && !acc[curr.date].dots.some((dot) => dot.color === "#00BEFF")) {
      acc[curr.date].dots.push({ color: "#00BEFF", key: `user-${curr.date}` });
    }

    // Add a single green dot for others' schedules
    if (!isUser && !acc[curr.date].dots.some((dot) => dot.color === "#1fe300")) {
      acc[curr.date].dots.push({ color: "#1fe300", key: `other-${curr.date}` });
    }

    return acc;
  }, {});

  // Add the selected date styling and adjust dot color
  Object.keys(markedDates).forEach((date) => {
    if (date === selectedDate) {
      markedDates[date].dots = markedDates[date].dots.map((dot) => ({
        ...dot,
        color: dot.color === "#00BEFF" ? "white" : dot.color,
      }));
      markedDates[date] = {
        ...markedDates[date],
        selected: true,
        selectedColor: "#00BEFF",
      };
    }
  });

  const filteredTimes = mergedData.filter(
    (item) =>
      item.date === selectedDate &&
      (item.participants.some((p) => p.studentId === currentUser.studentId) || item.convoId)
  );

  const addAvailability = () => {
    const newConvo = {
      convoId: (convoProfiles.length + 1).toString(),
      studentId: [currentUser.studentId],
      date: selectedDate, // Use the selected date directly
      time: newAvailability.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      confirmed: "no",
      confirmedStudent: null,
    };
    setConvoProfiles([...convoProfiles, newConvo]);
    setPickerOpen(false);
    setShowButtons(false);
  };

  const confirmConversation = (conversation) => {
    const participantNames = conversation.participants
      .map((p) => `${p.firstName} ${p.lastName}`)
      .join(", ");
    Alert.alert(
      "Confirm Schedule",
      `Do you want to schedule a conversation with ${participantNames}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Schedule",
          onPress: () => {
            const updatedConvos = convoProfiles.map((convo) =>
              convo.convoId === conversation.convoId
                ? {
                    ...convo,
                    confirmed: "yes",
                    confirmedStudent: currentUser.studentId,
                  }
                : convo
            );
            setConvoProfiles(updatedConvos);
            addConversation({
              convoId: conversation.convoId,
              date: conversation.date,
              time: conversation.time,
              participants: conversation.participants,
            });
            Alert.alert(
              "Scheduled",
              `Your conversation with ${participantNames} is confirmed.`
            );
          },
        },
      ]
    );
  };

  const cancelOrKeepUserConvo = (conversation) => {
    Alert.alert(
      `${currentUser.firstName} ${currentUser.lastName}`,
      "Do you want to cancel or keep this scheduled time?",
      [
        {
          text: "Cancel",
          onPress: () => {
            const updatedConvos = convoProfiles.filter(
              (convo) => convo.convoId !== conversation.convoId
            );
            setConvoProfiles(updatedConvos);
            Alert.alert("Canceled", "Your scheduled time has been canceled.");
          },
          style: "destructive",
        },
        {
          text: "Keep",
          onPress: () => {
            Alert.alert("Kept", "Your scheduled time remains unchanged.");
          },
        },
      ]
    );
  };

  const renderAvailableTime = ({ item }) => {
    const isUserMeeting = item.participants.some(
      (p) => p.studentId === currentUser.studentId
    );

    if (isUserMeeting) {
      return (
        <TouchableOpacity
          style={[styles.card, styles.userCard]}
          onPress={() => cancelOrKeepUserConvo(item)}
        >
          <View style={styles.cardContent}>
            <View>
              <Text style={[styles.cardTitle, styles.userCardText]}>
                {currentUser.firstName} {currentUser.lastName}
              </Text>
              <Text style={[styles.cardSubtitle, styles.userCardText]}>{item.time}</Text>
            </View>
            <Text style={[styles.cardCountry, styles.userCardText]}>
              {item.participants.map((p) => p.country).join(", ")}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => confirmConversation(item)}
      >
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.cardTitle}>
              {item.participants
                .map((p) => `${p.firstName} ${p.lastName}`)
                .join(", ")}
            </Text>
            <Text style={styles.cardSubtitle}>{item.time}</Text>
          </View>
          <Text style={styles.cardCountry}>
            {item.participants.map((p) => p.country).join(", ")}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={markedDates}
        markingType="multi-dot"
        theme={{
          todayTextColor: "#00BEFF",
          arrowColor: "#00BEFF",
          dotColor: "#00BEFF",
          selectedDayBackgroundColor: "#00BEFF",
        }}
      />

      <Text style={styles.sectionTitle}>Available Times</Text>
      <FlatList
        data={filteredTimes}
        keyExtractor={(item) => item.convoId}
        renderItem={renderAvailableTime}
        style={styles.availableTimesList}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginVertical: 10 }}>
            No available times for this date.
          </Text>
        }
      />

      <Text style={styles.sectionTitle}>Schedule Your Availability</Text>
      {!showButtons && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setPickerOpen(true);
            setShowButtons(true);
          }}
        >
          <Text style={styles.addButtonText}>Select Date & Time</Text>
        </TouchableOpacity>
      )}

      {showButtons && (
        <View>
          <DateTimePicker
            value={newAvailability}
            mode="datetime"
            display="default"
            onChange={(event, date) => {
              if (date) setNewAvailability(date);
            }}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => setShowButtons(false)}
            >
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.scheduleButton]}
              onPress={addAvailability}
            >
              <Text style={styles.actionButtonText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
  },
  userCard: {
    backgroundColor: "#00BEFF",
  },
  userCardText: {
    color: "#fff",
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
  availableTimesList: {
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#00BEFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
  },
  actionButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  scheduleButton: {
    backgroundColor: "#1fe300",
  },
  cancelButton: {
    backgroundColor: "#f00000",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
