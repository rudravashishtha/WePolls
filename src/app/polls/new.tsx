import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Redirect, Stack, router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../providers/AuthProvider";
import { supabase } from "../../lib/supabase";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const createPoll = async () => {
    setError("");
    if (!question) {
      setError("Question is required");
      return;
    }
    const validOptions = options.filter((o) => !!o);
    if (validOptions.length < 2) {
      setError("Please provide at least two options");
      return;
    }

    const { data, error } = await supabase
      .from("polls")
      .insert([{ question, options: validOptions }])
      .select();
      if (error) {
        error.message = "Check if you are logged in and try again."
        Alert.alert("Failed to create poll", error.message);
        return;
      }

      router.back();
  };

  // if (!user) {
  //   return <Redirect href="/login" />;
  // }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Create Poll" }} />

      <Text style={styles.label}>Title</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Type your question here"
        style={styles.input}
      />

      <Text style={styles.label}>Options</Text>
      {options.map((option, index) => (
        <View key={index} style={{ justifyContent: "center" }}>
          <TextInput
            value={option}
            onChangeText={(text) => {
              const updatedOptions = [...options];
              updatedOptions[index] = text;
              setOptions(updatedOptions);
            }}
            placeholder={`Option ${index + 1}`}
            key={index}
            style={styles.input}
          />
          <Feather
            name="x"
            size={20}
            color="gray"
            onPress={() => {
              const updatedOptions = [...options];
              updatedOptions.splice(index, 1);
              setOptions(updatedOptions);
            }}
            style={{ position: "absolute", right: 10 }}
          />
        </View>
      ))}
      <Button
        title="Add Option"
        onPress={() => {
          setOptions([...options, ""]);
        }}
      />

      <Text style={{ color: "crimson", padding: 5 }}>{error}</Text>

      <Button title="Create Poll" onPress={createPoll} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 5,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginTop: 5,
  },
});
