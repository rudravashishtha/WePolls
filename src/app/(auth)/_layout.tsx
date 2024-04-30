import { Redirect, Slot } from "expo-router";
import { useAuth } from "../../providers/AuthProvider";

export default function AuthLayout() {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/profile" />;
  }
  return <Slot />;
}
