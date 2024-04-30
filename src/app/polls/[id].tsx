import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Poll } from "../../types/db";
import { supabase } from "../../lib/supabase";

export default function PollDetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll>(null);

  useEffect(() => {
    const fetchPolls = async () => {
      let { data, error } = await supabase
        .from("polls")
        .select("*")
        .eq("id", Number.parseInt(id))
        .single();
      if (error) {
        Alert.alert("Error fetching polls", error.message);
        return;
      }
      setPoll(data);
    };
    fetchPolls();
  }, []);

  const vote = () => {
    alert(`You selected ${selectedOption}`);
  };

  if (!poll) {
    return <ActivityIndicator style={{ marginTop: 30 }} size="large" />;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Your Vote Matters" }} />
      <Text style={styles.question}>{poll.question}</Text>
      <View style={{ gap: 5 }}>
        {poll.options.map((option) => (
          <Pressable
            onPress={() => setSelectedOption(option)}
            key={option}
            style={styles.optionContainer}
          >
            <Feather
              name={option === selectedOption ? "check-circle" : "circle"}
              size={18}
              color={option === selectedOption ? "green" : "gray"}
            />
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>

      <Button title="Vote" onPress={vote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "600",
  },
  optionContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
