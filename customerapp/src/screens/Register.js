import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Platform } from "react-native";
const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };
  const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:2500" : "http://localhost:2500";
  const handleRegister = async () => {
    try {
      await axios.post(`${BASE_URL}/api/customers/login`, form);
      Alert.alert("Success", "Registration successful");
      navigation.navigate("Login");
    } catch (err) {
      Alert.alert("Registration Failed", err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={form.name}
        onChangeText={(text) => handleChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange("email", text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={form.phone}
        onChangeText={(text) => handleChange("phone", text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={form.password}
        secureTextEntry
        onChangeText={(text) => handleChange("password", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={form.address}
        onChangeText={(text) => handleChange("address", text)}
      />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Already registered? Login here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f7fbfc",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});

export default RegisterScreen;
