import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "./AuthContext";
import { phoneToFakeEmail } from "../lib/phoneAuth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = (phone, password, fullName) =>
    supabase.auth.signUp({
      email: phoneToFakeEmail(phone),
      password,
      options: { data: { full_name: fullName, phone } },
    });

  const signIn = (phone, password) =>
    supabase.auth.signInWithPassword({
      email: phoneToFakeEmail(phone),
      password,
    });

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
