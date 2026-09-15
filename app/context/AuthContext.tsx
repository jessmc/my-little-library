import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "~/supabaseClient";

// Define the shape of our context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [ user, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function getInitialUser() {
            const { data } = await supabase.auth.getUser();
            setUser(data.user ?? null);
            setLoading(false);
        }
        getInitialUser();

        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}