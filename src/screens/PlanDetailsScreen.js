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
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";

export default function PlanDetailsScreen({ route, navigation }) {
  const { planId } = route.params;
  const [plan, setPlan] = useState({});
  const [showComments, setShowComments] = useState(false); // Manage visibility of CommentWindow
  const [comments, setComments] = useState([]);

  //useFocusEffect fetches initial plan info from the DB.
  useFocusEffect(
    useCallback(() => {
      const fetchPlanDetails = async () => {
        try {
          const response = await planifyApi.get(`/api/plans/${planId}/details`);
          setComments(response.data.comments);
          setPlan(response.data);
        } catch (err) {
          console.error("Error fetching plan:", err);
        }
      };

      fetchPlanDetails();
    }, [])
  );

  async function postComments(comment) {
    try {
      const response = await planifyApi.post(`/api/comments`, {
        planId,
        content: comment,
      });
      setComments((prevComments) => [...prevComments, response.data]);
    } catch (err) {
      console.error("Error fetching plan:", err);
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await planifyApi.delete(`/api/comments/${commentId}`);
      if (response.status === 200) {
        // Remove the deleted comment from the state if backend delete successful
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== commentId)
        );
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        accessible={false} // Ensure accessibility is not interrupted
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
        </ScrollView>
      </TouchableWithoutFeedback>
      {/* Show CommentWindow if toggled */}
      {showComments && (
        <View style={styles.commentWindowContainer}>
          <CommentWindow
            comments={comments}
            postCommentsFunction={postComments}
            deleteCommentFunction={deleteComment}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
  },
  scrollViewContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginTop: 20,
    marginBottom: 0,
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
  commentWindowContainer: {
    flex: 1.5,
    backgroundColor: "#f5f5f5",
    borderTopColor: "#ddd",
    marginBottom: 20,
  },
});
