import { Redirect, Stack, router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

export default function ProfileScreen() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{padding: 10, margin: 15}}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Profile" }} />
        <Text style={styles.label}>User Id: {user.id}</Text>
        <Text style={styles.label}>Email: {user.email}</Text>
      </View>

      <Button
        title="Sign Out"
        onPress={() => {
          supabase.auth.signOut();
          router.push("/");
        }}
      />
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
});
