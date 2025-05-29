
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Utilisateur" | "Administrateur";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

// Sample users data - In a real app, this wo
// uld be in a database
const initialUsers = [
  { id: 1, name: "Ahmed Neffeti", email: "user@example.com", password: "password", role: "Utilisateur" },
  { id: 2, name: "Fahmi Chaabouni", email: "admin@example.com", password: "admin123", role: "Administrateur" },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : initialUsers;
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    // Store users in localStorage
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Find user by email and password
    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${foundUser.name}!`,
      });
      return true;
    } else {
      toast({
        title: "Échec de la connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt!",
    });
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Check if user already exists
    const userExists = users.some((u: any) => u.email === email);

    if (userExists) {
      toast({
        title: "Échec de l'inscription",
        description: "Un compte existe déjà avec cet email",
        variant: "destructive",
      });
      return false;
    }

    // Create new user
    const newUser = {
      id: Math.max(0, ...users.map((u: any) => u.id)) + 1,
      name,
      email,
      password,
      role: "Utilisateur" as const,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    toast({
      title: "Inscription réussie",
      description: `Bienvenue, ${name}!`,
    });
    return true;
  };

  const contextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
    }),
    [user, login, logout, register]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
