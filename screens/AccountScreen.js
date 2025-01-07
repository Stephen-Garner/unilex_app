import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { UserContext } from "../UserContext"; // Import UserContext

const AccountScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Access currentUser and setCurrentUser from UserContext

  const handleLogout = () => {
    // Example: Reset user to null or default profile
    setCurrentUser(null);
    navigation.navigate("Tabs", { screen: "Home" }); // Navigate to Home after logout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Screen</Text>
      <Text style={styles.subtitle}>Welcome to your account page!</Text>

      {/* Display current user information */}
      {currentUser ? (
        <View style={styles.userInfo}>
          <Text style={styles.infoLabel}>Name:</Text>
          <Text style={styles.infoText}>
            {currentUser.firstName} {currentUser.lastName}
          </Text>
          <Text style={styles.infoLabel}>Country:</Text>
          <Text style={styles.infoText}>{currentUser.country}</Text>
          <Text style={styles.infoLabel}>Bio:</Text>
          <Text style={styles.infoText}>{currentUser.bio}</Text>
        </View>
      ) : (
        <Text style={styles.noUserText}>No user information available.</Text>
      )}

      {/* Buttons */}
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Tabs", { screen: "Home" })}
      />
      <Button
        title="Logout"
        color="#f00000" // Red color for logout button
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  noUserText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#999",
    marginBottom: 20,
  },
});

export default AccountScreen;
