import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { name as appName } from "./app.json";
import { SafeAreaView } from "react-native";
import MovieList from "./web/shared/components/movie";
import Header from "./web/shared/components/Header";


const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: "black",
    marginTop: 50,
    alignSelf: "center",
  },

  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.screenContainer}>
          <Header/>

          <View style={styles.container}>
            {/* <CustomHomeImage  iscallingfromMob={true}/> */}
            <Text
              style={{
                color: "#f43f5e",
                textAlign: "center",
                padding: 10,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              List of Movies
            </Text>
           <MovieList/>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
