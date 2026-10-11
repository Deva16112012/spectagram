import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "../components/PostCard";
import posts from "../data/temp_posts.json";

export default class Feed extends Component {
  renderItem = ({ item }) => (
    <PostCard post={item} onPress={this.openPost} />
  );

  openPost = (post) => {
    this.props.navigation.navigate("PostScreen", {
      author: post.author,
      caption: post.caption,
      image: post.image
    });
  };

  keyExtractor = (item, index) => String(item.id || index);

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.logo}>🌌</Text>
            <Text style={styles.title}>Spectagram</Text>
          </View>
          <FlatList
            data={posts}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
          />
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
  safeArea: { 
    flex: 1 
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
  list: { 
    padding: 12, 
    paddingBottom: 30 
  }
});
