import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import deleteAttendee from "../api/attendees/deleteAttendee";

const InviteesList = ({ invitees }) => {
  const [localInvitees, setInvitees] = useState(invitees);

  const handleRemoveInvitee = async (approvalId, userName) => {
    try {
      await deleteAttendee(approvalId);

      setInvitees(
        localInvitees.filter((invitee) => invitee.userName !== userName)
      );
    } catch (error) {
      console.log("Error deleting and attendee", error);
    }
  };

  return (
    <>
      <Text>Confirmed</Text>

      {localInvitees
        .filter((localInvitee) => localInvitee.status === "APPROVED")
        .map((localInvitee) => (
          <View key={localInvitee.id} style={styles.inviteeContainer}>
            <Text>{localInvitee.name}</Text>
            <TouchableOpacity
              onPress={() =>
                handleRemoveInvitee(localInvitee.id, localInvitee.userName)
              }
            >
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

      <Text>Pending</Text>

      {localInvitees
        .filter((localInvitee) => localInvitee.status === "PENDING")
        .map((localInvitee) => (
          <View key={localInvitee.id} style={styles.inviteeContainer}>
            <Text>{localInvitee.userName}</Text>
            <TouchableOpacity
              onPress={() =>
                handleRemoveInvitee(localInvitee.id, localInvitee.userName)
              }
            >
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

      <Text>Not Attending</Text>

      {localInvitees
        .filter((localInvitee) => localInvitee.status === "REJECTED")
        .map((localInvitee) => (
          <View key={localInvitee.id} style={styles.inviteeContainer}>
            <Text>{localInvitee.name}</Text>
            <TouchableOpacity
              onPress={() =>
                handleRemoveInvitee(localInvitee.id, localInvitee.userName)
              }
            >
              <Text style={styles.removeButton}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  inviteeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeButton: {
    color: "red",
    fontWeight: "bold",
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: "#ffdddd",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "red",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },
});

export default InviteesList;
