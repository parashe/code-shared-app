import React from "react";
import {
  View,
  Text,
  Button,
} from "react-native";

const MovieList = ({ iscallingfromMob }) => {
  return (
    <>
      <View style={{ display: "flex", flexDirection: "row", backgroundColor: "#e5e7eb" , padding:20}}>
        {/* First View */}
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
          <View style={{justifyContent:"center"}}>
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
            <Text
              style={{
                fontSize: 16,
                color: "#f43f5e",
                marginBottom: 3,
              }}
            >
              Horror
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#f43f5e",
              }}
            >
              2023
            </Text>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#f43f5e",
                borderColor: "#f43f5e",
                color: "#f43f5e",
                borderRadius: 5,
                justifyContent: "center",

                padding: 5,
                cursor: "pointer",
                width: "100%",
                border: "none",
              }}
            >
              <Button
                title="View Details"
                color="#fff"
                onPress={() => console.log("View Details")}
              />
            </View>
          </View>
        </View>

        {/* Second View */}
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
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 5,
                color: "#f43f5e",
              }}
            >
             The  Inception
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: "#f43f5e",
                marginBottom: 3,
              }}
            >
              Sci-Fi
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#f43f5e",
              }}
            >
              2019
            </Text>
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#f43f5e",
                borderColor: "#f43f5e",
                color: "#f43f5e",
                borderRadius: 5,
                padding: 5,
                cursor: "pointer",
                width: "100%",
                border: "none",
                justifyContent: "center",
              }}
            >
              <Button
                title="View Details"
                color="#fff"
                onPress={() => console.log("View Details")}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default MovieList;
