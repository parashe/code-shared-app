// Import necessary components from the 'react' and 'react-native' libraries
import React from "react";
import { View, Text, Button, TextInput, Image, Dimensions } from "react-native";
export const SLIDER_WIDTH = Dimensions.get("window").width + 80;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
// Define a functional component named 'MovieList'
const MovieList = ({ iscallingfromMob }) => {
  const imageHeight = iscallingfromMob ? 100 : 300;
  const widthofImage = iscallingfromMob ? ITEM_WIDTH : "100%";

  return (
    <>
      {/* Header section */}
      <View
        style={{
          flexDirection: "row",
          padding: 1,
          display: "flex",
        }}
      >
        {/* Home Text */}
        <Text
          style={{
            flex: 1,
            backgroundColor: "#f43f5e",
            color: "white",
            padding: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Home
        </Text>

        {/* Services  Text */}
        <Text
          style={{
            flex: 1,
            backgroundColor: "#6ee7b7",
            padding: 10,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Services
        </Text>

        {/* About Us  Text */}
        <Text
          style={{
            flex: 1,
            backgroundColor: "#38bdf8",
            padding: 10,
            textAlign: "center",
            color: "white",
          }}
        >
          About Us
        </Text>

        {/* Contact  Text */}
        <Text
          style={{
            flex: 1,
            backgroundColor: "#a855f7",
            padding: 10,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Contact
        </Text>
      </View>

      {/* Section header for the list of movies */}
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

      {/* Search input field */}
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <TextInput
          placeholder="Search Movies"
          style={{
            width: 200,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
          }}
        />
      </View>

      {/* Movie list container */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#e5e7eb",
          padding: 20,
        }}
      >
        {/* First Movie View */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            margin: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            borderRadius: 10,
          }}
        >
          <View style={{ justifyContent: "center" }}>
            {/* Movie Title */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#f43f5e",
              }}
            >
              The Conjuring
            </Text>

            {/* Movie Genre */}
            <Text
              style={{
                fontSize: 16,
                color: "#f43f5e",
                marginBottom: 3,
              }}
            >
              Horror
            </Text>

            {/* Release Year */}
            <Text
              style={{
                fontSize: 14,
                color: "#f43f5e",
              }}
            >
              2023
            </Text>

            {/* View Details Button */}
            <View
              style={{
                backgroundColor: "#f43f5e",
                borderColor: "#f43f5e",
                borderRadius: 5,
                padding: 3,
                width: "100%",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
                marginTop: 10,
                color: "#fff",
              }}
            >
              <Button
                title="View Details"
                color={Platform.OS === "android" ? "#f43f5e" : "#fff"}
                onPress={() => console.log("View Details")}
              />
            </View>
          </View>
        </View>

        {/* Second Movie View */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
            margin: 5,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
            borderRadius: 10,
          }}
        >
          <View>
            {/* Movie Title */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#f43f5e",
              }}
            >
              The Inception
            </Text>

            {/* Movie Genre */}
            <Text
              style={{
                fontSize: 16,
                color: "#f43f5e",
                marginBottom: 3,
              }}
            >
              Sci-Fi
            </Text>

            {/* Release Year */}
            <Text
              style={{
                fontSize: 14,
                color: "#f43f5e",
              }}
            >
              2019
            </Text>

            {/* View Details Button */}
            <View
              style={{
                backgroundColor: "#f43f5e",
                borderColor: "#f43f5e",
                borderRadius: 5,
                padding: 3,
                width: "100%",
                justifyContent: "center",
                cursor: "pointer",
                border: "none",
                marginTop: 10,
                color: "#fff",
              }}
            >
              <Button
                title="View Details"
                color={Platform.OS === "android" ? "#f43f5e" : "#fff"}
                onPress={() => console.log("View Details")}
              />
            </View>
          </View>
        </View>
      </View>
         {/* Section header for the list of movies */}
         <Text
        style={{
          color: "#f43f5e",
          textAlign: "center",
          padding: 10,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Car Image
      </Text>
      <View
        style={{
          backgroundColor: "#e5e7eb", // Use a subtle white background
          padding: 20, // Add more padding for a cleaner look
          borderRadius: 8, // Round the corners for a modern feel
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,
          elevation: 7,
          display: "flex",
          justifyContent: "center",
          marginTop:20,
          alignItems: "center", // Center the content vertically
        }}
      >
        <Image
          source={require("./car.jpg")}
          style={{
            height: imageHeight,
            width: widthofImage,
            borderRadius: 8, // Match the container's border radius
            resizeMode: "cover", // Maintain aspect ratio and cover the container
          }}
        />
      </View>
    </>
  );
};

// Export the 'MovieList' component as the default export
export default MovieList;
