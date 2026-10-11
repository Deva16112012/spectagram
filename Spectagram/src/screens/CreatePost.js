import React, { Component } from "react";
import {
  View, Text, StyleSheet, SafeAreaView, ScrollView,
  Image, TextInput, TouchableOpacity, Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const previewImages = {
  image_1: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200",
  image_2: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200",
  image_3: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=1200"
};

export default class CreatePost extends Component {
  state = { previewImage: "image_1", caption: "" };

  render() {
    const { previewImage, caption } = this.state;
    return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌌</Text>
            <Text style={styles.title}>New Post</Text>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            <Image source={{ uri: previewImages[previewImage] }} style={styles.preview} />

            <Text style={styles.label}>Choose an image</Text>
            <View style={styles.imageChoices}>
              {Object.keys(previewImages).map((key) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.choice, previewImage === key && styles.selectedChoice]}
                  onPress={() => this.setState({ previewImage: key })}
                >
                  <Image source={{ uri: previewImages[key] }} style={styles.thumbnail} />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Caption"
              placeholderTextColor="#999"
              multiline
              value={caption}
              onChangeText={(value) => this.setState({ caption: value })}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => Alert.alert("Post", caption.trim() ? "Your post is ready to share!" : "Please enter a caption.")}
            >
              <Text style={styles.buttonText}>SHARE DISCOVERY 🚀</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1, backgroundColor: "#000" },

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

  content: { 
    padding: 15, 
    paddingBottom: 40 
  },

  preview: { 
    width: "100%", 
    height: 270, 
    borderRadius: 15 
  },

  label: { 
    color: "white", 
    fontSize: RFValue(15), 
    marginTop: 18, 
    marginBottom: 10
  },

  imageChoices: { 
    flexDirection: "row", 
    gap: 10 
  },

  choice: { 
    borderWidth: 2, 
    borderColor: "transparent", 
    borderRadius: 10 
  },

  selectedChoice: { 
    borderColor: "#ee8249" 
  },

  thumbnail: { 
    width: 85, 
    height: 70, 
    borderRadius: 8 
  },

  input: { 
    minHeight: 110, 
    borderWidth: 1, 
    borderColor: "#777",
    borderRadius: 12, color: "white", 
    padding: 14, 
    marginTop: 20, 
    textAlignVertical: "top" 
  },

  button: { 
    backgroundColor: "#ee8249", 
    borderRadius: 12, 
    padding: 15, 
    alignItems: "center", 
    marginTop: 18 
  },

  buttonText: { 
    color: "white", 
    fontWeight: "bold" 
  }
});
