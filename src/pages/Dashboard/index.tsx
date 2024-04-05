import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackPramsList } from "../../routes/app.routes";

import { api } from "../../services/api";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const [number, setNumber] = useState("");

  async function openOrder() {
    if (number === "") {
      Toast.show({
        type: "error",
        text1: "Escolha uma mesa!",
      });
      return;
    }

    const response = await api.post("/order", {
      table: Number(number),
    });

    navigation.navigate("Order", {
      number: number,
      order_id: response.data.id,
    });

    setNumber("");
  }

  const { signOut } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}> Novo Pedido</Text>

      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#404349"
        style={styles.input}
        keyboardType="numeric"
        value={number}
        onChangeText={setNumber}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#343741",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 24,
  },
  input: {
    width: "90%",
    height: 60,
    backgroundColor: "#1F222B",
    borderRadius: 8,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22,
    color: "#ffffff",
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#248ea6",
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
