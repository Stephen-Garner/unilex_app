import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>UNILEX</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Links */}
      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
  },
  signInButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    width: "80%",
  },
  linkText: {
    color: "#00BEFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
