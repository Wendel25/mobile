import React, { useState, createContext, ReactNode, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { AuthContextInterface } from "../interfaces/AuthContextInterface";
import { SignInProps } from "../interfaces/AuthContextInterface";

import { api } from "../services/api";

import Toast from "react-native-toast-message";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextInterface);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    token: "",
  });

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem("@data");
      let hasUser = JSON.parse(userInfo || "{}");

      if (Object.keys(hasUser).length > 0) {
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${hasUser.token}`;

        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token,
        });
      }

      setLoading(false);
    }

    getUser();
  }, []);

  async function signIn({ email, password }: SignInProps) {
    setLoadingAuth(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      const { id, name, token } = response.data;

      const data = {
        ...response.data,
      };

      await AsyncStorage.setItem("@data", JSON.stringify(data));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser({ id, name, email, token });

      setLoadingAuth(false);

      Toast.show({
        type: "success",
        text1: `Bem vindo, ${name}`,
      });

    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Email ou senha inválido",
      });

      console.log("Erro ao acessar", err);
      setLoadingAuth(false);
    }
  }

  async function signOut() {
    await AsyncStorage.clear().then(() => {
      setUser({
        id: "",
        name: "",
        email: "",
        token: "",
      });
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
