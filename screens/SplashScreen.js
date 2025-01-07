import React from "react"; // React is the core library for building the UI.
import { View, Text, Button, StyleSheet } from "react-native"; // Components for UI.
import { useSelector, useDispatch } from "react-redux"; // Hooks to access Redux state and actions.
import { increment, decrement } from "../store"; // Import actions from your Redux store.

const CounterScreen = () => {
  // Get the current counter value from the Redux store
  const count = useSelector((state) => state.counter);

  // Create a function to dispatch actions (like incrementing or decrementing)
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text> {/* Display the current counter value */}
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CounterScreen;
