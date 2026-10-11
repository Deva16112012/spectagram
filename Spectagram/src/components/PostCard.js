import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export default class PostCard extends Component {
  render() {
    const { post, onPress } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => onPress(post)}>
        <View style={styles.card}>
          <View style={styles.authorRow}>
            <Image source={{ uri: "https://i.pravatar.cc/100?img=12" }} style={styles.profileImage} />
            <Text style={styles.author}>{post.author}</Text>
          </View>

          <Image source={{ uri: post.image }} style={styles.postImage} />
          <Text style={styles.caption}>{post.caption}</Text>

          <View style={styles.actionRow}>
            <View style={styles.likeButton}>
              <Ionicons name="heart" size={RFValue(22)} color="white" />
              <Text style={styles.likes}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
  backgroundColor: "#171717",
  borderRadius: 15, padding: 12,
  marginBottom: 18
  },

  authorRow: { 
  flexDirection: "row", 
  alignItems: "center", 
  marginBottom: 10 
  },

  profileImage: { 
    width: 42, 
    height: 42, 
    borderRadius: 21, 
    marginRight: 10 
  },

  author: { 
    color: "white", 
    fontSize: RFValue(15), 
    fontWeight: "bold" 
  },

  postImage: { 
    width: "100%", 
    height: 230, 
    borderRadius: 12 
  },

  caption: { 
    color: "white", 
    fontSize: RFValue(14), 
    lineHeight: RFValue(20), 
    marginTop: 12 
  },

  actionRow: { 
    marginTop: 12, 
    alignItems: "flex-start" 
  },

  likeButton: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#d63b3b", 
    borderRadius: 20, 
    paddingVertical: 8, 
    paddingHorizontal: 13 
  },

  likes: { 
    color: "white", 
    marginLeft: 6, 
    fontWeight: "bold"
  }
});
