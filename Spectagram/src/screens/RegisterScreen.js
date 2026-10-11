import React, { Component } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, ScrollView
} from "react-native";
import firebase from "../config/firebase";

export default class RegisterScreen extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  registerUser = async () => {
    const { first_name, last_name, email, password, confirmPassword } = this.state;

    if (!first_name.trim() || !last_name.trim() || !email.trim() || !password) {
      Alert.alert("Registration", "Please complete all fields.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Registration", "Passwords don't match!");
      return;
    }

    try {
      const credential = await firebase.auth().createUserWithEmailAndPassword(email.trim(), password);
      const uid = credential.user.uid;

      await firebase.database().ref(`/users/${uid}`).set({
        email: email.trim(),
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        current_theme: "dark",
        profile_picture: "https://i.pravatar.cc/300"
      });

      await firebase.auth().signOut();
      Alert.alert("Registration", "User registered successfully!", [
        { text: "OK", onPress: () => this.props.navigation.replace("Login") }
      ]);
    } catch (error) {
      Alert.alert("Registration failed", error.message);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>🚀</Text>
          <Text style={styles.title}>Register</Text>

          {[
            ["First Name", "first_name"],
            ["Last Name", "last_name"],
            ["Email", "email"]
          ].map(([placeholder, key]) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#999"
              autoCapitalize={key === "email" ? "none" : "words"}
              keyboardType={key === "email" ? "email-address" : "default"}
              value={this.state[key]}
              onChangeText={(value) => this.setState({ [key]: value })}
            />
          ))}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          />

          <TouchableOpacity style={styles.button} onPress={this.registerUser}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.replace("Login")}>
            <Text style={styles.link}>Already registered? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  content: { 
    flexGrow: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 25 
  },
  logo: { 
    fontSize: 48 
  },
  title: { 
    color: "white", 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 25 
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#777", 
    borderRadius: 10, 
    color: "white", 
    padding: 14, 
    marginVertical: 6 
  },
  button: { 
    width: "100%", 
    backgroundColor: "white", 
    borderRadius: 10, padding: 15, 
    alignItems: "center", 
    marginTop: 15 
  },
  buttonText: { 
    color: "black", 
    fontWeight: "bold" 
  },
  link: { 
    color: "#ee8249", 
    textDecorationLine: "underline", 
    marginTop: 20 
  }
});
