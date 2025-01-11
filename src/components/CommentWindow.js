import React, { useState, useContext } from "react";
import { Context as UserContext } from "../context/UserContext";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function CommentWindow({
  comments,
  postCommentsFunction,
  deleteCommentFunction,
}) {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { state } = useContext(UserContext);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const userName = state.userName;

  //toggles comment box
  const handleAddCommentPress = () => {
    setIsAddingComment((prev) => !prev);
  };

  const handleCommentPress = (commentId) => {
    // Toggle the delete button for the selected comment
    setSelectedCommentId((prev) => (prev === commentId ? null : commentId));
  };

  const handleDeleteComment = (commentId) => {
    deleteCommentFunction(commentId);
    setSelectedCommentId(null);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== "") {
      postCommentsFunction(newComment);
      setNewComment("");
      setIsAddingComment(false);
    }
  };

  return (
    <View style={styles.commentContainer}>
      <Text style={styles.commentHeader}>Comments</Text>
      <ScrollView>
        {comments && comments.length > 0 ? (
          comments.map((comment) =>
            comment.commenterUserName === userName ? (
              //render touchable comment if the comment is user owned
              <TouchableOpacity
                key={comment.id}
                style={styles.comment}
                onPress={() => handleCommentPress(comment.id)}
              >
                <Text style={styles.commentText}>
                  {comment.commenterUserName}
                </Text>
                <Text style={styles.commentText}>{comment.content}</Text>
                {/* Show Delete Button if this comment is selected */}
                {selectedCommentId === comment.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteComment(comment.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ) : (
              // Other users' comments are not touchable
              <View key={comment.id} style={styles.comment}>
                <Text style={styles.commentText}>
                  {comment.commenterUserName}
                </Text>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            )
          )
        ) : (
          <Text style={styles.noCommentsText}>No comments yet.</Text>
        )}
      </ScrollView>

      {/* Add Comment Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCommentPress}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Comment Input */}
      {isAddingComment && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your comment here..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitComment}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    marginTop: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  comment: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  commentText: {
    fontSize: 16,
    color: "#333",
  },
  noCommentsText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#007BFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 5,
    backgroundColor: "#ff4d4d",
    padding: 8,
    borderRadius: 5,
    alignItems: "center",
  },
});
