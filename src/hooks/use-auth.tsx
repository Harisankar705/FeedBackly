import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { surveyAPI } from "@/api/surveyApi";
import { AuthContextType, AuthProviderProps, IUser } from "@/interfaces/interface";


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUser|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const isAuthenticated = Boolean(user);  

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("IN LOGIN FUNCTION - Email:", email, "Password:", password);
    setIsLoading(true);

    try {
      const response = await surveyAPI.adminLogin(email, password);
      console.log("LOGIN response", response);

      if (response?.success && response.user) {
          setUser(response.user); 
          toast({ title: "Login successful", description: "Welcome back!" });
        return true;
      } else {
        toast({ title: "Login failed", description: "Invalid credentials", variant: "destructive" });
        return false;
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({ title: "Login failed", description: "Something went wrong", variant: "destructive" });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  console.log("IS A",isAuthenticated)

  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null); // ✅ This will trigger a re-render, making isAuthenticated false
      toast({ title: "Logged out", description: "See you next time!" });
    } catch (error) {
      console.error("Logout error", error);
      toast({ title: "Logout failed", description: "Try again", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
