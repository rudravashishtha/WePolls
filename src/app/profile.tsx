import { Session } from "@supabase/supabase-js";
import { Redirect, Stack, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

export default function ProfileScreen() {
  const { session, user } = useAuth();

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Profile" }} />
        <Text style={styles.label}>Email</Text>
        <Text style={styles.text}>{user?.email}</Text>
      </View>

      <Button title="Sign Out" onPress={() => {
        supabase.auth.signOut()
        router.push("/")
      }} />
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
  text: {
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
