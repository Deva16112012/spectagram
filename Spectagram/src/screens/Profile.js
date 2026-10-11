import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Switch, TouchableOpacity, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "../config/firebase";

export default class Profile extends Component {
  state = {
    isEnabled: false,
    light_theme: false,
    profile_image: "https://i.pravatar.cc/300",
    name: "Astronaut",
    email: ""
  };

  componentDidMount() {
    this.fetchUser();
  }

  componentWillUnmount() {
    if (this.userListener) this.userListener();
  }

  fetchUser = () => {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const ref = firebase.database().ref(`/users/${user.uid}`);
    const handler = ref.on("value", (snapshot) => {
      const data = snapshot.val() || {};
      const light = data.current_theme === "light";
      this.setState({
        light_theme: light,
        isEnabled: light,
        name: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "Astronaut",
        email: data.email || user.email || "",
        profile_image: data.profile_picture || "https://i.pravatar.cc/300"
      });
    });
    this.userListener = () => ref.off("value", handler);
  };

  toggleSwitch = async (value) => {
    const user = firebase.auth().currentUser;
    if (!user) return;
    const theme = value ? "light" : "dark";
    this.setState({ isEnabled: value, light_theme: value });
    try {
      await firebase.database().ref(`/users/${user.uid}`).update({ current_theme: theme });
    } catch (error) {
      Alert.alert("Theme update failed", error.message);
    }
  };

  logout = async () => {
    try {
      await firebase.auth().signOut();
      this.props.navigation.getParent()?.getParent()?.reset({
        index: 0,
        routes: [{ name: "Login" }]
      });
    } catch (error) {
      Alert.alert("Logout failed", error.message);
    }
  };

  render() {
    const light = this.state.light_theme;
    return (
      <View style={light ? styles.containerLight : styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌌</Text>
            <Text style={light ? styles.titleLight : styles.title}>Spectagram</Text>
          </View>

          <View style={styles.content}>
            <Image source={{ uri: this.state.profile_image }} style={styles.profileImage} />
            <Text style={light ? styles.nameLight : styles.name}>{this.state.name}</Text>
            <Text style={light ? styles.emailLight : styles.email}>{this.state.email}</Text>

            <View style={styles.themeRow}>
              <Text style={light ? styles.textLight : styles.text}>Light Theme</Text>
              <Switch value={this.state.isEnabled} onValueChange={this.toggleSwitch} />
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
              <Text style={styles.logoutText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#000" 
  },
  containerLight: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15 
  },
  logo: { 
    fontSize: 30,
    marginRight: 10 
  },
  title: { 
    color: "white", 
    fontSize: RFValue(22), 
    fontWeight: "bold" 
  },
  titleLight: { 
    color: "black", 
    fontSize: RFValue(22), 
    fontWeight: "bold" 
  },
  content: { 
    alignItems: "center", 
    padding: 25 
  },
  profileImage: { 
    width: 140, 
    height: 140, 
    borderRadius: 70, 
    marginTop: 25
  },
  name: { 
    color: "white", 
    fontSize: RFValue(25), 
    fontWeight: "bold", 
    marginTop: 18 
  },
  nameLight: { 
    color: "black", 
    fontSize: RFValue(25), 
    fontWeight: "bold", 
    marginTop: 18 
  },
  email: { 
    color: "#aaa", 
    fontSize: RFValue(15), 
    marginTop: 5 
  },
  emailLight: { 
    color: "#555", 
    fontSize: RFValue(15), 
    marginTop: 5 
  },
  themeRow: { 
    width: "100%", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginTop: 45 
  },
  text: { 
    color: "white", 
    fontSize: RFValue(16) 
  },
  textLight: { 
    color: "black", 
    fontSize: RFValue(16) 
  },
  logoutButton: { 
    width: "100%", 
    backgroundColor: "#d63b3b", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center", 
    marginTop: 30 
  },
  logoutText: { 
    color: "white", 
    fontWeight: "bold" 
  }
});
