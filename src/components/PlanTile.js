import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function PlanTile({ plan, onPress }) {
  return (
    <TouchableOpacity style={styles.square} onPress={() => onPress(plan)}>
      <Text style={styles.title}>{plan.title}</Text>
      <Text style={styles.date}>{plan.startTime}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 100,
    height: 100,
    margin: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  date: {
    fontSize: 12,
    color: "#666",
  },
});
