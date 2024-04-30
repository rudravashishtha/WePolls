import { Stack, router, useLocalSearchParams } from "expo-router";
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
import { Poll, Vote } from "../../types/db";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../providers/AuthProvider";

export default function PollDetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poll, setPoll] = useState<Poll>(null);
  const [userVote, setUserVote] = useState<Vote>(null);

  const { user } = useAuth();

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

    const fetchUserVote = async () => {
      if (!user) return;
      let { data, error } = await supabase
        .from("votes")
        .select("*")
        .eq("poll_id", Number.parseInt(id))
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (data !== null && error) {
        Alert.alert("Error fetching user vote", error.message);
        return;
      }

      setUserVote(data);
      // console.log(data);

      if (data) {
        setSelectedOption(data.option);
      }
    };
    fetchPolls();
    fetchUserVote();
  }, []);

  const vote = async () => {
    const newVote = {
      option: selectedOption,
      poll_id: poll.id,
      user_id: user?.id,
    };
    if (userVote) {
      newVote.id = userVote.id;
    }
    const { data, error } = await supabase
      .from("votes")
      .upsert([newVote])
      .select()
      .single();

    if (error) {
      Alert.alert("Error voting");
      return;
    } else {
      setUserVote(data);
      Alert.alert("Thank you for voting!");
      router.back();
    }
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
