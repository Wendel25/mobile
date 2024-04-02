import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { AuthContext } from "../../contexts/AuthContext";

import Toast from "react-native-toast-message";

export default function SignIn() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email === "" || password === "") {
      Toast.show({
        type: "error",
        text1: "Digite seu login e sua senha!",
      });

      return;
    }

    await signIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          placeholderTextColor="#248ea6"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          placeholderTextColor="#248ea6"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#343741",
  },
  logo: {
    marginBottom: 80,
    width: 340,
    height: 80,
  },
  inputContainer: {
    width: "95%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingTop: 25,
    paddingBottom: 15,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  input: {
    width: "95%",
    height: 40,
    marginBottom: 12,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "#e3e3e3",
  },
  button: {
    width: "95%",
    height: 40,
    backgroundColor: "#248ea6",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
