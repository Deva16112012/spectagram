import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostScreen extends Component {
  render() {
    const params = this.props.route?.params;
    if (!params) {
      return (
        <View style={styles.center}>
          <Text style={styles.error}>Post not found.</Text>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text style={styles.back}>Go Back</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>Spectagram</Text>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.authorRow}>
              <Image source={{ uri: "https://i.pravatar.cc/100?img=12" }} style={styles.profile} />
              <Text style={styles.author}>{params.author}</Text>
            </View>

            <Image source={{ uri: params.image }} style={styles.image} />
            <Text style={styles.caption}>{params.caption}</Text>

            <View style={styles.likeButton}>
              <Ionicons name="heart" size={RFValue(28)} color="white" />
              <Text style={styles.likes}>12k</Text>
            </View>
          </ScrollView>
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
  center: { 
    flex: 1, 
    backgroundColor: "#000", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  error: { 
    color: "white", 
    fontSize: 18 
  },
  back: { 
    color: "#ee8249", 
    marginTop: 15 
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 15, 
    gap: 15 
  },
  title: { 
    color: "white", 
    fontSize: RFValue(22), 
    fontWeight: "bold" 
  },
  content: { 
    padding: 15 
  },
  authorRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 15 
  },
  profile: { 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    marginRight: 12 
  },
  author: { 
    color: "white", 
    fontSize: RFValue(16), 
    fontWeight: "bold" 
  },
  image: { 
    width: "100%", 
    height: 350, 
    borderRadius: 15 
  },
  caption: { 
    color: "white", 
    fontSize: RFValue(16), 
    lineHeight: RFValue(23), 
    marginTop: 15 
  },
  likeButton: { 
    flexDirection: "row", 
    alignItems: "center", 
    alignSelf: "flex-start", 
    backgroundColor: "#d63b3b", 
    borderRadius: 22, 
    padding: 10, 
    paddingHorizontal: 15, 
    marginTop: 20 
  },
  likes: { 
    color: "white", 
    fontWeight: "bold", 
    marginLeft: 7 
  }
});
