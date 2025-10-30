import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getUserByEmail } from "../config/firestoreService";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

const AuthProviderContent = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Obtener datos adicionales del usuario desde Firestore
          const userInfo = await getUserByEmail(firebaseUser.email);
          
          if (userInfo) {
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              fullName: userInfo.fullName,
              role: userInfo.role || "user",
              emailVerified: firebaseUser.emailVerified,
            });
          } else {
            // Si no hay datos en Firestore, usar datos básicos de Firebase
            setUserData({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              fullName: firebaseUser.displayName || "Usuario",
              role: firebaseUser.email === "admin@duocuc.cl" ? "admin" : "user",
              emailVerified: firebaseUser.emailVerified,
            });
          }
          
          setUser(firebaseUser);
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
          // En caso de error, usar datos básicos
          setUserData({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            fullName: firebaseUser.displayName || "Usuario",
            role: firebaseUser.email === "admin@duocuc.cl" ? "admin" : "user",
            emailVerified: firebaseUser.emailVerified,
          });
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserData(null);
      // Limpiar localStorage si existe
      localStorage.removeItem("currentUser");
      // Redirigir al login
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const value = {
    user,
    userData,
    loading,
    logout,
    isAuthenticated: !!user,
    isAdmin: userData?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Wrapper que no necesita estar dentro del Router
export const AuthProvider = ({ children }) => {
  return <AuthProviderContent>{children}</AuthProviderContent>;
};
