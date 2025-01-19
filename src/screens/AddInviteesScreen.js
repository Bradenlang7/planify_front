import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { Context as FriendshipContext } from "../context/FriendshipsContext";
import { useNavigation } from "@react-navigation/native";

export default function AddInviteesScreen({ route }) {
  const navigation = useNavigation();
  const { state } = useContext(FriendshipContext);
  const { planId } = route.params;

  const [query, setQuery] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  console.log(state.approvedFriendships);
  // Filter approved friends based on query and exclude already selected ones
  const filteredFriends =
    query === ""
      ? []
      : state.approvedFriendships.filter(
          (friend) =>
            `${friend.firstname} ${friend.lastname}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            !selectedFriends.some((selected) => selected.id === friend.id)
        );

  const handleSelect = (friend) => {
    setSelectedFriends([...selectedFriends, friend]);
    setQuery("");
  };

  const handleRemove = (friendId) => {
    setSelectedFriends(
      selectedFriends.filter((friend) => friend.id !== friendId)
    );
  };

  const handleSubmit = async () => {
    try {
      // Send the selectedFriends array to the backend
      const friendIds = selectedFriends.map((friend) => friend.id); // Extract friend IDs
      console.log("Sending to backend:", { planId, invitees: friendIds });

      // Replace with actual API call
      await planifyApi.post(`/api/plans/${planId}/invitees`, {
        invitees: friendIds,
      });

      // Navigate back or show a success message
      navigation.goBack();
    } catch (err) {
      console.error("Error sending invitees:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Invitees</Text>
      <Text style={styles.subtitle}>Plan ID: {planId}</Text>

      {/* Autocomplete Dropdown */}
      <Autocomplete
        data={filteredFriends}
        defaultValue={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Search and select a friend"
        flatListProps={{
          keyExtractor: (item) => item.id.toString(),
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <Text
                style={styles.item}
              >{`${item.firstname} ${item.lastname}`}</Text>
            </TouchableOpacity>
          ),
        }}
      />

      {/* Selected Friends List */}
      <Text style={styles.subtitle}>Selected Friends:</Text>
      <FlatList
        data={selectedFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedItem}>
            <Text
              style={styles.selectedText}
            >{`${item.firstname} ${item.lastname}`}</Text>
            <TouchableOpacity onPress={() => handleRemove(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Send Invites</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 8,
  },
  item: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  selectedItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  selectedText: {
    fontSize: 16,
  },
  removeText: {
    color: "red",
    fontSize: 14,
  },
  submitButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
