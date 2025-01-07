import React from "react";
import { Image, TouchableOpacity } from "react-native"; // Add TouchableOpacity for touchable elements
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"; // Stack Navigator for additional pages
import { Provider } from "react-redux";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ExpandedListPage from "./screens/ExpandedListsPage"; // This is now part of the stack
import AccountScreen from "./screens/AccountScreen";
import ChatScreen from "./screens/ChatScreen";
import PlayScreen from "./screens/PlayScreen";
import { ConversationProvider } from "./ConvoContext"; // Import ConversationProvider
import { UserProvider } from "./UserContext";

// Import PNG files for icons
const HomeActiveIcon = require("./assets/icons/home-active.png");
const HomeInactiveIcon = require("./assets/icons/home-inactive.png");
const CalendarActiveIcon = require("./assets/icons/calendar-active.png");
const CalendarInactiveIcon = require("./assets/icons/calendar-inactive.png");
const AccountActiveIcon = require("./assets/icons/account-active.png");
const AccountInactiveIcon = require("./assets/icons/account-inactive.png");
const ChatActiveIcon = require("./assets/icons/chat-active.png");
const ChatInactiveIcon = require("./assets/icons/chat-inactive.png");
const PlayActiveIcon = require("./assets/icons/play-active.png");
const PlayInactiveIcon = require("./assets/icons/play-inactive.png");
const Logo = require("./assets/icons/logo.png"); // Your logo image

const Tab = createBottomTabNavigator(); // Bottom Tab Navigator
const Stack = createStackNavigator(); // Stack Navigator

// Bottom Tab Navigator (Main Navigation)
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route, navigation }) => ({
      tabBarIcon: ({ focused, size }) => {
        let iconSource;

        // Dynamically choose icons based on the route name and focused state
        if (route.name === "Home") {
          iconSource = focused ? HomeActiveIcon : HomeInactiveIcon;
        } else if (route.name === "Calendar") {
          iconSource = focused ? CalendarActiveIcon : CalendarInactiveIcon;
        } else if (route.name === "Chat") {
          iconSource = focused ? ChatActiveIcon : ChatInactiveIcon;
        } else if (route.name === "Play") {
          iconSource = focused ? PlayActiveIcon : PlayInactiveIcon;
        }

        // Return the Image component for the tab icon
        return (
          <Image
            source={iconSource}
            style={{
              width: size + 5, // Increase the size of the icons
              height: size + 5, // Increase the size of the icons
              marginBottom: -5, // Lower the icons
            }}
          />
        );
      },
      tabBarActiveTintColor: "#00BEFF", // Color for active tab label
      tabBarInactiveTintColor: "gray", // Color for inactive tab label
      tabBarShowLabel: false, // Remove the labels under icons
      tabBarStyle: {
        height: 75, // Increase the height of the tab bar for spacing
        paddingBottom: 10, // Add padding at the bottom
        borderTopWidth: 0, // Remove the gray line above the tab bar
        backgroundColor: "#ffffff", // Optional: Ensure the background is white
      },

      headerTitle: () => (
        <Image
          source={Logo}
          style={{
            width: 150, // Slightly larger logo if needed
            height: 60, // Adjust height proportionally
            resizeMode: "contain",
            marginLeft: -180, // Adjust this value to control how far left it moves
            alignSelf: "flex-start", // Ensure alignment to the left
          }}
        />
      ),

      headerStyle: {
        borderBottomWidth: 0, // Remove the gray line under the header
        elevation: 0, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
        backgroundColor: "#ffffff", // Ensure the header has a white background
      },

      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Image
            source={AccountInactiveIcon}
            style={{
              width: 32,
              height: 32,
              marginRight: 20,
            }}
          />
        </TouchableOpacity>
      ), // Make account icon touchable
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Calendar" component={CalendarScreen} />
    <Tab.Screen name="Chat" component={ChatScreen} />
    <Tab.Screen name="Play" component={PlayScreen} />
  </Tab.Navigator>
);

// Main App Navigation with Stack Navigator
export default function App() {
  return (
    <UserProvider>
      <ConversationProvider>
        {/* <Provider store={store}> */}
          <NavigationContainer>
            <Stack.Navigator>
              {/* Tab Navigator */}
              <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }}
              />

              {/* ExpandedListPage */}
              <Stack.Screen
                name="ExpandedList"
                component={ExpandedListPage}
                options={{
                  headerTitle: "", // Removes the text in the header
                  headerStyle: {
                    elevation: 0, // Removes shadow for Android
                    shadowOpacity: 0, // Removes shadow for iOS
                    borderBottomWidth: 0, // Removes border for iOS
                  },
                }}
              />

              {/* AccountScreen */}
              <Stack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  title: "Account", // Custom header title for the Account screen
                  headerStyle: {
                    borderBottomWidth: 0, // Remove the gray line above the header
                    elevation: 0, // Remove shadow on Android
                    shadowOpacity: 0, // Remove shadow on iOS
                    backgroundColor: "#ffffff", // Ensure the header has a white background
                  },
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        {/* </Provider> // */}
      </ConversationProvider>
    </UserProvider>
  );
}