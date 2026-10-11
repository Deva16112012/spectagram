import React, { Component } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "../config/firebase";

export default class LoginScreen extends Component {
  state = { email: "", password: "" };

  signIn = async () => {
    const { email, password } = this.state;
    if (!email.trim() || !password) {
      Alert.alert("Login", "Please enter your email and password.");
      return;
    }

    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
      this.props.navigation.replace("Dashboard");
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.logo}>🌌</Text>
        <Text style={styles.title}>Spectagram</Text>
        <Text style={styles.subtitle}>Mission Space Connect</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
        />

        <TouchableOpacity style={styles.button} onPress={this.signIn}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
          <Text style={styles.link}>New User? Register</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 25 
  },
  logo: { 
    fontSize: 50 
  },
  title: { 
    color: "white", 
    fontSize: RFValue(30), 
    fontWeight: "bold" 
  },
  subtitle: { 
    color: "#aaa", 
    marginBottom: 30, 
    marginTop: 5 
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#777", 
    borderRadius: 10, 
    color: "white", 
    padding: 14, 
    marginVertical: 7 
  },
  button: { 
    width: "100%", 
    backgroundColor: "#fff", 
    borderRadius: 10, 
    padding: 15, 
    alignItems: "center", 
    marginTop: 15 
  },
  buttonText: { 
    color: "#000", 
    fontWeight: "bold" 
  },
  link: { 
    color: "#ee8249", 
    marginTop: 22, 
    textDecorationLine: "underline" 
  }
});
