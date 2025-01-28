import React, { useState, useCallback, useEffect } from "react";
import { createWebSocketClient } from "../websockets/createWebSocketClient";
import CommentWindow from "../components/CommentWindow";
import fetchPlanDetails from "../api/plans/fetchPlanDetails";
import postComments from "../api/comments/postComments";
import deleteComments from "../api/comments/deleteComments";
import getSecureData from "../utils/SecureStorageService";
import { useFocusEffect } from "@react-navigation/native";
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
  console.log("PLAN: ", plan.data);
  //useFocusEffect fetches initial plan info from the DB.
  useFocusEffect(
    useCallback(() => {
      const loadPlanDetails = async () => {
        try {
          const planData = await fetchPlanDetails(planId);
          setPlan(planData);
          setComments(planData.data.comments);
        } catch (error) {
          console.error("Error fetching plan details:", error);
        }
      };

      loadPlanDetails();
    }, [planId])
  );

  useEffect(() => {
    let client;
    (async () => {
      client = await createWebSocketClient({
        brokerURL: "http://192.168.0.100:8080/ws",
        topic: `/topic/comments/${planId}`,
        onMessage: (message) => {
          const { action, data } = message;

          switch (action) {
            case "add":
              console.log("Message data", data);
              setComments((prevComments) => [...prevComments, data]);
              break;

            case "delete":
              setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== data.id)
              );
              break;

            default:
              console.warn(`Unknown action type: ${action}`);
          }
        },
      });
    })();

    return () => {
      if (client) {
        client.deactivate();
        console.log("WebSocket connection deactivated");
      }
    };
  }, [planId]);

  async function addComment(comments) {
    try {
      await postComments(comments, planId);
    } catch (err) {
      console.error("Error posting comments:", err);
    }
  }

  async function removeComment(commentId) {
    try {
      await deleteComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  }

  if (!plan || !plan.data) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  console.log(plan);
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
          <Text style={styles.title}>{plan.data.title}</Text>
          <Text style={styles.date}>Date: {plan.data.startTime}</Text>
          <Text style={styles.description}>{plan.data.description}</Text>

          {plan.location && (
            <Text style={styles.details}>Location: {plan.data.location}</Text>
          )}
          {plan.owner && (
            <Text style={styles.details}>
              Owner: {plan.data.owner.username}
            </Text>
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
            postCommentsFunction={addComment}
            deleteCommentFunction={removeComment}
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
