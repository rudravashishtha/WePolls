import { FlatList, StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

const polls = [
  { id: 1, title: "Class Representative" },
  { id: 2, title: "Class Prefect" },
  { id: 3, title: "Class Captain" },
];

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Polls" }} />
      <FlatList
        data={polls}
        contentContainerStyle={[styles.container]}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{item.id}{")"} {item.title}</Text>
          </Link>
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
