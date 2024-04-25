import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";

const polls = [1, 2, 3];

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen 
        options={{ title: "Polls" }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={[styles.container]}
        renderItem={({ item }) => (
          <View style={styles.pollContainer}>
            <Text style={styles.pollTitle}>Class Representative</Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  pollContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
});
