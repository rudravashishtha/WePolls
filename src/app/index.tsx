import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";
import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";
import { Poll } from "../types/db";

export default function HomeScreen() {
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase.from("polls").select("*");
      if (error) {
        Alert.alert("Error fetching polls", error.message);
        return;
      }
      setPolls(data);
    };
    fetchPolls();
  }, []);

  const { session } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          title: "Polls",
          headerTitleAlign: "center",
          headerLeft: () => (
            <Link href={session && session.user ? "/profile" : "/login"}>
              <AntDesign
                name={session && session.user ? "user" : "login"}
                style={{ marginLeft: 15 }}
                size={20}
                color="gray"
              />
            </Link>
          ),
          headerRight: () => (
            <Link href="/polls/new">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign name="plus" size={20} color="gray" />
                <Text
                  style={{
                    marginLeft: 5,
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "gray",
                    marginRight: 5,
                  }}
                >
                  Create
                </Text>
              </View>
            </Link>
          ),
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={[styles.container]}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <MaterialCommunityIcons name="poll" size={18} color="black" />
            {"  "}
            <Text style={styles.pollTitle}>{item.question}</Text>
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
