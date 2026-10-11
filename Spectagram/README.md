# Spectagram – Mission Space

A Stage 1–8 React Native/Expo implementation using modern React Navigation and Firebase Authentication + Realtime Database.

## Navigation
App.js → NavigationContainer → StackNavigator → Loading/Login/Register/Dashboard → Drawer → Bottom Tabs → Feed/CreatePost. PostScreen is a Stack screen opened from Feed.

## Setup
1. Create an Expo React Native project or copy these files into your existing project.
2. Install dependencies:
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/drawer @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated firebase react-native-responsive-fontsize
   npx expo install @expo/vector-icons
3. Put your Firebase web configuration in `src/config/firebaseConfig.js`.
4. Enable Email/Password Authentication and Realtime Database in Firebase.
5. Replace the placeholder remote images with local assets if your school project requires them.
6. Run: `npx expo start`

## Firebase data shape
/users/{uid}
  email
  first_name
  last_name
  current_theme
  profile_picture

## Important
This implementation uses Firebase `compat` imports so it remains close to the API used in the Stage 5–8 teaching material (`firebase.auth()` and `firebase.database()`).
