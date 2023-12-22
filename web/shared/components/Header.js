import React from "react";
import { View, Text } from "react-native";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 1,
        display: "flex",
      }}
    >
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
  );
};

export default Header;
