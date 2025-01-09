import React, { useState, useCallback } from "react";
import planifyApi from "../api/planify";
import CommentWindow from "../components/CommentWindow";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function PlanDetailsScreen({ route, navigation }) {
  const { planId } = route.params;
  const [plan, setPlan] = useState({});
  const [showComments, setShowComments] = useState(false); // Manage visibility of CommentWindow

  console.log(plan);
  useFocusEffect(
    useCallback(() => {
      const fetchPlanDetails = async () => {
        try {
          const response = await planifyApi.get(`/api/plans/${planId}/details`);

          setPlan(response.data);
        } catch (err) {
          console.error("Error fetching plan:", err);
        }
      };

      fetchPlanDetails();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{plan.title}</Text>
      <Text style={styles.date}>Date: {plan.startTime}</Text>
      <Text style={styles.description}>{plan.description}</Text>

      {plan.location && (
        <Text style={styles.details}>Location: {plan.location}</Text>
      )}
      {plan.owner && (
        <Text style={styles.details}>Owner: {plan.owner.username}</Text>
      )}

      {/* Comment Button */}
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => setShowComments((prev) => !prev)}
      >
        <Text style={styles.buttonText}>
          {showComments ? "Hide Comments" : "Show Comments"}
        </Text>
      </TouchableOpacity>

      {/* Show CommentWindow if toggled */}
      {showComments && <CommentWindow comments={plan.comments} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    marginBottom: 16,
    color: "#333",
  },
  details: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  commentButton: {
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
