import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const createPoll = () => {
    alert("Poll created");
  };
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
        <View key={index} style={{justifyContent: "center"}}>
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
        <Feather name="x" size={20} color="gray" 
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
