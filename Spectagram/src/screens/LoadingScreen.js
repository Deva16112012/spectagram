import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import firebase from "../config/firebase";

export default class LoadingScreen extends Component {
  unsubscribe = null;

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace("Dashboard");
      } else {
        this.props.navigation.replace("Login");
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Spectagram</Text>
        <ActivityIndicator size="large" color="#ee8249" />
        <Text style={styles.text}>Checking astronaut session...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000", 
    alignItems: "center", 
    justifyContent: "center" 
  },
  title: { 
    color: "white", 
    fontSize: 30, 
    fontWeight: "bold", 
    marginBottom: 25 
  },
  text: { 
    color: "#aaa", 
    marginTop: 15 
  }
});
