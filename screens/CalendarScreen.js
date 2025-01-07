import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../UserContext";
import { ConversationContext } from "../ConvoContext";
import { CalendarScreenPresenter } from "../presenters/CalendarScreenPresenter";

const CalendarScreen = () => {
  const { currentUser } = useContext(UserContext);
  const { addConversation } = useContext(ConversationContext);

  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [newAvailability, setNewAvailability] = useState(new Date());
  const [showButtons, setShowButtons] = useState(false);

  const presenter = new CalendarScreenPresenter(
    {
      setEvents,
      showError: (message) => Alert.alert("Error", message),
      showConfirmation: (message, onConfirm) =>
        Alert.alert("Confirm Schedule", message, [
          { text: "Cancel", style: "cancel" },
          { text: "Schedule", onPress: onConfirm },
        ]),
      showSuccess: (message) => Alert.alert("Success", message),
    },
    currentUser,
    addConversation
  );

  useEffect(() => {
    presenter.initialize();
  }, []);

  const addAvailability = () => {
    presenter.addAvailability(selectedDate, newAvailability);
    setShowButtons(false);
  };

  const renderAvailableTime = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => presenter.confirmConversation(item)}
    >
      <Text style={styles.cardTitle}>{`${item.date} - ${item.time}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Date</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={events}
        markingType="multi-dot"
        theme={{
          todayTextColor: "#00BEFF",
          arrowColor: "#00BEFF",
          selectedDayBackgroundColor: "#00BEFF",
        }}
      />
      <Text style={styles.sectionTitle}>Available Times</Text>
      <FlatList
        data={events.filter((event) => event.date === selectedDate)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAvailableTime}
      />
      <Text style={styles.sectionTitle}>Add Availability</Text>
      {showButtons ? (
        <View>
          <DateTimePicker
            value={newAvailability}
            mode="time"
            display="default"
            onChange={(event, date) => date && setNewAvailability(date)}
          />
          <TouchableOpacity style={styles.addButton} onPress={addAvailability}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowButtons(true)}
        >
          <Text style={styles.addButtonText}>Select Time</Text>
        </TouchableOpacity>
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
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#00BEFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CalendarScreen;
