// Import necessary components from the 'react', 'react-native', and './web/shared/components/movie' libraries
import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import MovieList from "./web/shared/components/movie";

// Define styles using the 'StyleSheet.create' method
const styles = StyleSheet.create({
  // Style for the overall screen container
  screenContainer: {
    flex: 1,
  },
  // Style for the main content container
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// Define the main functional component named 'App'
const App = () => {
  // Return JSX code for the 'App' component
  return (
    // Wrap the content in a 'SafeAreaView' to ensure it doesn't overlap system elements
    <SafeAreaView>
      {/* Use 'ScrollView' for scrollable content */}
      <ScrollView>
        {/* Overall screen container */}
        <View style={styles.screenContainer}>
          {/* Main content container */}
          <View style={styles.container}>
            {/* Render the 'MovieList' component */}
            <MovieList  iscallingfromMob={true}/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Export the 'App' component as the default export
export default App;
